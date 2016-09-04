import { combineReducers } from 'redux'
import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    INSERT_DATA,
    SAVE_MONEY,
    SAVE_ORDER,
    TOGGLE_SHOW_ALL,
} from '../constants/actionTypes'

const overallState = {
    data: [],
    cat: [],
    isLoading: false,
    error: '',
}
const dataState = {
    key: '',
    order: 0,
    name: '',
    cat: '',
    cake: '',
    table: '',
    money: '',
    upload: false,
}

function overallReducer(state = overallState, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case GET_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data,
                cat: action.cat,
                error: '',
            }
        case GET_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        case INSERT_DATA:
            return {
                ...state,
                data: [
                    ...state.data,
                    dataAction(void 0, {
                        ...action,
                        key: Math.max(...state.data.map(item => parseInt(item.key || 0, 10))),
                        maxOrder: Math.max(...state.data.map(item => parseInt(item.order || 0, 10))),
                    })
                ],
            }
        case SAVE_MONEY:
        case SAVE_ORDER:
            const index = state.data.findIndex(item => item.key === action.key)
            return {
                ...state,
                data: [
                    ...state.data.slice(0, index),
                    dataAction(state.data[index], {
                        ...action,
                        maxOrder: Math.max(...state.data.map(item => parseInt(item.order || 0, 10))),
                    }),
                    ...state.data.slice(index + 1)
                ],
            }
        default:
            return state
    }
}
function dataAction(state = dataState, action) {
    switch (action.type) {
        case INSERT_DATA:
            return {
                ...state,
                key: action.key + 1 + '',
                order: action.maxOrder + 1,
                name: action.name,
                cat: action.cat,
                money: action.money,
            }
        case SAVE_MONEY:
            return action.money ? {
                ...state,
                money: action.money,
                order: state.order ? state.order : (action.maxOrder + 1),
            } : state;
        case SAVE_ORDER:
            return {
                ...state,
                order: action.order,
            }
        default:
            return state
    }
}

const uiState = {
    showAll: true,
}
function uiReducer(state = uiState, action) {
    switch (action.type) {
        case TOGGLE_SHOW_ALL:
            return {
                ...state,
                showAll: !state.showAll,
            }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    overallReducer,
    uiReducer,
})
export default rootReducer