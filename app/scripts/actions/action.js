import fetch from 'isomorphic-fetch'
import {
    SOURCE_JSON,
    TARGET_JSON,
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    INSERT_DATA,
    SAVE_MONEY,
    SAVE_ORDER,
    TOGGLE_SHOW_ALL,
    PROXY_URL,
    UPLOAD_URL,
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
        return receiveSource(JSON.parse(localData));
    }
    else {
        return (dispatch) => {
            dispatch(requestSource())
            return Promise.all([
                fetch(SOURCE_JSON)
                .then(response => {
                    if (response.status >= 400) throw new Error("Bad response from server")
                    return response.json()
                })
                .then(json => json.feed.entry || [])
                .then(data => data.map(member => ({
                    key: member.gsx$sn.$t,
                    order: '',
                    name: member.gsx$姓名.$t,
                    cat: member.gsx$男方女方親友.$t,
                    cake: member.gsx$餅 ? member.gsx$餅.$t : '',
                    table: member.gsx$桌次 ? member.gsx$桌次.$t : '',
                }))),
                fetch(TARGET_JSON)
                .then(response => {
                    if (response.status >= 400) throw new Error("Bad response from server")
                    return response.json()
                })
                .then(json => json.feed.entry || [])
                .then(data => data.map(member => ({
                    key: member.gsx$sn.$t,
                    order: member.gsx$順序.$t,
                    name: member.gsx$姓名.$t,
                    cat: member.gsx$男方女方親友.$t,
                    money: member.gsx$禮金.$t,
                    upload: true,
                }))),
            ]).then(pObj => {
                const data = [
                    ...pObj[0].map(item0 => Object.assign({}, item0, pObj[1].find(item1 => item1.key === item0.key))),
                    ...pObj[1]
                        .map(item => item.key)
                        .filter(key => !new Set(pObj[0].map(item => item.key)).has(key))    // Get missing parts(keys) from target source
                        .map(key => pObj[1].find(item => item.key === key))                 // Get missing parts(entire obj)
                ].sort((a, b) => parseInt(a.key, 10) - parseInt(b.key,10))
                dispatch(receiveSource(data))
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
    const requests = data.filter((obj) => obj.money && !obj.upload)
                        .map((obj) => ({
                            'entry.1602692569': obj.key,
                            'entry.913501581': obj.order,
                            'entry.551273632': obj.name,
                            'entry.1691809764': obj.cat,
                            'entry.596466268': obj.money,
                            'hl': 'zh-TW',
                        }))
                        .map((obj) => {
                            const params = Object.keys(obj)
                                .filter(key => obj[key] !== '' && obj[key] !== null)
                                .map((key => key + '=' + obj[key]))
                                .join('&')
                            return encodeURI(PROXY_URL).replace('@URL@', encodeURIComponent(UPLOAD_URL + params))
                        })
    // console.log(requests)
    return receiveSource(data)
    return (dispatch) => {
        // dispatch(requestSource())
        return Promise.all([
            fetch(SOURCE_JSON)
            .then(response => {
                if (response.status >= 400) throw new Error("Bad response from server")
                return response.json()
            })
            .then(json => json.feed.entry || [])
            .then(data => data.map(member => ({
                key: member.gsx$sn.$t,
                order: '',
                name: member.gsx$姓名.$t,
                cat: member.gsx$男方女方親友.$t,
                cake: member.gsx$餅 ? member.gsx$餅.$t : '',
                table: member.gsx$桌次 ? member.gsx$桌次.$t : '',
            }))),
            fetch(TARGET_JSON)
            .then(response => {
                if (response.status >= 400) throw new Error("Bad response from server")
                return response.json()
            })
            .then(json => json.feed.entry || [])
            .then(data => data.map(member => ({
                key: member.gsx$sn.$t,
                order: member.gsx$順序.$t,
                name: member.gsx$姓名.$t,
                cat: member.gsx$男方女方親友.$t,
                money: member.gsx$禮金.$t,
                upload: true,
            }))),
        ]).then(pObj => {
            const data = [
                ...pObj[0].map(item0 => Object.assign({}, item0, pObj[1].find(item1 => item1.key === item0.key))),
                ...pObj[1]
                    .map(item => item.key)
                    .filter(key => !new Set(pObj[0].map(item => item.key)).has(key))    // Get missing parts(keys) from target source
                    .map(key => pObj[1].find(item => item.key === key))                 // Get missing parts(entire obj)
            ].sort((a, b) => parseInt(a.key, 10) - parseInt(b.key,10))
            dispatch(receiveSource(data))
        }).catch(reason => {
            dispatch(receiveFail(reason))
        })
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