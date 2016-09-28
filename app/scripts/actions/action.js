import fetch from 'isomorphic-fetch'
import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    INSERT_DATA,
    SAVE_MONEY,
    SAVE_ORDER,
    TOGGLE_SHOW_ALL,
    FILE_ID,
    SHEET_NAME,
    APPSCRIPT_URL,
} from '../constants/actionTypes'


const requestSource = () => {
    return {
        type: GET_DATA,
    }
}
const receiveSource = (data) => {
    return {
        type: GET_DATA_SUCCESS,
        data,
        cat: Array.from(new Set(data.map(obj => obj.cat))).sort((a, b) => a.localeCompare(b)),
    }
}
const receiveFail = (error) => {
    return {
        type: GET_DATA_FAIL,
        error,
    }
}
export function fetchData() {
    const localData = localStorage.getItem("guestData")
    if (localData) {
        return receiveSource(JSON.parse(localData))
    }
    else {
        return (dispatch) => {
            dispatch(requestSource())

            let url = new URL(APPSCRIPT_URL)
            const params = {fileid: FILE_ID, sheetname: SHEET_NAME}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            return fetch(url)
                .then(response => {
                    if (response.status >= 400) throw new Error("Bad response from server")
                    return response.json()
                })
                .then(data => data.map(member => ({
                    key: member.sn,
                    order: member.順序,
                    name: member.姓名,
                    cat: member['男方/女方親友'],
                    cake: member.餅,
                    table: member.桌次,
                    money: member.禮金,
                    upload: member.禮金 === '' || member.禮金 === undefined ? false : true,
                    timestamp: member.時間戳記,
                })))
                .then(data => {
                    dispatch(receiveSource(data.sort((a, b) => parseInt(a.key, 10) - parseInt(b.key,10))))
                }).catch(reason => {
                    dispatch(receiveFail(reason))
                })
        }
    }
}

export function insertData(name, cat, money) {
    return {
        type: INSERT_DATA,
        name,
        cat,
        money,
    }
}

export function saveMoney(key, money) {
    return {
        type: SAVE_MONEY,
        key,
        money,
    }
}

export function saveOrder(key, order) {
    return {
        type: SAVE_ORDER,
        key,
        order,
    }
}

export function pushToCloud(data) {
    const rows = data.filter((obj) => obj.money && !obj.upload)
                        .map((obj) => ({
                            timestamp: obj.timestamp,
                            sn: obj.key,
                            姓名: obj.name,
                            '男方/女方親友': obj.cat,
                            禮金: obj.money,
                            順序: obj.order,
                        }))

    let params = new FormData()
    params.append("fileid", FILE_ID)
    params.append("sheetname", SHEET_NAME)
    params.append("data", JSON.stringify(rows))

    return (dispatch) => {
        dispatch(requestSource())

        return fetch(APPSCRIPT_URL, {
            method: 'post',
            body: params,
        })
        .then(response => {
            if (response.status >= 400) throw new Error("Bad response from server")
            return response.json()
        })
        .then(json => {
            if (json.result === 'success') {
                dispatch(clearLocalStorage())
            } else {
                throw new Error("Bad response from server:" + JSON.parse(json.error))
            }
        })
        .catch(reason => dispatch(receiveFail(reason)))
    }
}

export function setLocalStorage(data) {
    localStorage.setItem("guestData", JSON.stringify(data));
}

export function clearLocalStorage() {
    localStorage.clear()
    return (dispatch) => {
        dispatch(fetchData())
    }
}

export function toggleShowAll() {
    return {
        type: TOGGLE_SHOW_ALL,
    }
}