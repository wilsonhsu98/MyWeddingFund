import promise from 'es6-promise'
promise.polyfill()

import '../styles/scss/main'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { setLocalStorage } from './actions/action'
import Store from './stores/store'
import Spreadsheet from './react_cmpt/Spreadsheet'

const store = Store()
let currentData
store.subscribe(() => {
	const prevData = currentData
	currentData = store.getState().overallReducer.data
	if (prevData !== currentData) {
		setLocalStorage(currentData)
	}
	else {
		console.log('same')
	}
})
class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Spreadsheet />
            </Provider>
        )
    }
}

render(
    <Root />,
    document.getElementById('main')
)

document.title = '收禮平台'