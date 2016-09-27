import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { SHEET_URL } from '../constants/actionTypes'
import {
    clearLocalStorage,
    fetchData,
    insertData,
    saveMoney,
    saveOrder,
    pushToCloud,
    toggleShowAll,
    setProgress,
} from '../actions/action'

import jBarcode from 'jBarcode'
import RoundProgress from 'RoundProgress'

const ENTER_KEY_CODE = 13
const TAB_KEY_CODE = 9

/**
 * <Spreadsheet />
 */
class Spreadsheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openCloud: false,
            openUpload: false,
            openPwd: sessionStorage.getItem("password") === null ? true : false,
            readOnly: false,
        }
    }
    componentDidMount() {
        // AppStore.on('change:uploadVal', function(value) {
        //     this.setState({
        //         openUpload: true
        //     });
        //     this.progress.setValue(value * 100);
        // }.bind(this));
        const { dispatch } = this.props
        dispatch(fetchData())

        this.progress = new RoundProgress(this.refs.progress, {
            "displayGearwheel": false,
            "radius": 200, // any integer
            "lineWidth": 30, // any integer
            "lineCap": "round", // each end style of the line. "round", "butt", or "square", default "butt"
            "max": 100,
            "value": 0,
            "interval": 500,
            "bgStyle": "gradient", // "gradient" or "image", defualt: "gradient"
            "bgGradientTop": "#28cfbb", // if bgStyle is "gradient" then necessary
            "bgGradientDown": "#45BBE6", // if bgStyle is "gradient" then necessary
            "animateStyle": "easeInOutQuad", // specifies the speed curve of the animation. "liner" or "easeInOutQuad", defualt: "liner"
        }).on("change", (value) => {
            $(this.refs.progressLabel).text(Math.min(parseInt(value, 10), 100) + '%')
        }).on("complete", () => {
            dispatch(setProgress(0))
        })

        if (this.state.openPwd) {
            setTimeout(() => {
                this.refs.pwd.focus()
            }, 0)
        }
    }
    componentDidUpdate() {
        if (this.props.uploadVal) {
            // this.setState({
            //     openUpload: true
            // });
            this.progress.setValue(this.props.uploadVal * 100)
        }
    }
    render() {
        let money_barcode_smaller = []
        let money_barcode_bigger = []
        const moneyList = [
            1000, 1200, 1600, 1800,
            2000, 2200, 2600, 2800,
            3000, 3200, 3600, 3800,
            5000, 6000, 6600, 8000,
            10000, 12000
        ]
        let sum = 0
        for (let i = 0, len = moneyList.length; i < len; i += 1) {
            const jsx = (
                <div key={i}>
                    <Barcode code={moneyList[i]}/>
                    <span>&nbsp;{moneyList[i]}</span>
                </div>
            )
            if (i < len / 2) {
                money_barcode_smaller.push(jsx)
            } else {
                money_barcode_bigger.push(jsx)
            }
        }
        for (let i = 0, len = this.props.data.length; i < len; i += 1) {
            sum += parseInt(this.props.data[i].money, 10) || 0
        }

        return (
            <div className='spread-sheet'>
                <h1 className='title no-print'>Wilson & Effie 婚禮賓客名單{sum === 0 ? '' : ' (' + sum + ')'}</h1>
                <table className='money-list sheet-table'>
                    <tbody>
                        <tr><td>{money_barcode_smaller}</td><td>{money_barcode_bigger}</td></tr>
                    </tbody>
                </table>
                <Sheetlist {...this.props} readOnly={this.state.readOnly}/>
                <div onClick={(e) => this._openCloud(e)} title='點一下離開' className={'block-page no-print' + (this.state.openCloud ? ' open' : '')}>
                    <iframe className='cloud-iframe' ref='cloudFrame'/>
                    <button onClick={(e) => this._openCloud(e)} className='no-print btn-open-block' disabled={this.state.readOnly ? true : false}>雲端</button>
                </div>
                <div className={'block-page no-print' + (this.props.onUpload ? ' open' : '')}>
                    <div ref="progress">
                        <span ref="progressLabel"></span>
                    </div>
                </div>
                <div className={'block-page no-print' + (this.state.openPwd ? ' open' : '')}>
                    <div className='pwd-block'>
                        密碼：<input type="password" onKeyDown={(e) => this._enter(e)} ref="pwd"/>
                    </div>
                </div>
            </div>
        )
    }
    _openCloud() {
        if (!this.refs.cloudFrame.src) {
            this.refs.cloudFrame.src = SHEET_URL
        }
        this.setState({
            openCloud: !this.state.openCloud
        })
    }
    _enter(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            sessionStorage.setItem("password", event.target.value)
            this.setState({
                openPwd: false,
                readOnly: sessionStorage.getItem("password") === "9527" ? false : true,
            })
        }
    }
}

/**
 * <Sheetlist data={data} />
 */
class Sheetlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            find: '',
            focus: '',
        }
    }
    componentDidMount() {
        this._onFocusSearch()
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.find !== this.state.find ||
    //         nextState.showAll !== this.state.showAll ||
    //         nextState.focus !== this.state.focus ||
    //         nextProps.data !== this.props.data ||
    //         nextProps.readOnly !== this.props.readOnly
    // }
    componentDidUpdate() {
        this._focusSearch()
    }
    render() {
        const rows = this.props.data.map((row) => {
            const find = this.state.find && (this.state.find === row.key || row.name.toLowerCase().search(this.state.find.toLowerCase()) > -1 || row.name.toUpperCase().search(this.state.find.toUpperCase()) > -1)
            // <td><Barcode code={row.key}/></td>
            return (
                <tr key={row.key} className={'sheet-row' + (this.props.showAll || find ? '' : ' hide') + (find ? ' find' : '')} ref={row.key} data-money_key={'money_' + row.key}>
                    <td className='td-for-barcode'>
                        <Barcode code={row.key}/>
                        <div className='note'>此條碼為賓客代號<br/>建議貼於紅包背面</div>
                    </td>
                    <td data-th='編號' className='center'>{row.key}</td>
                    <td data-th='名字'>{row.name}</td>
                    <td data-th='分類'className='no-print'>{row.cat}</td>
                    <td data-th='桌次'className={'no-print center' + (row.table !== parseInt(row.key / 100, 10).toString() ? ' heightlight' : '')}>{row.table}</td>
                    <td className='no-print center no-mobile'>{row.cake ? '餅' :　''}</td>
                    <td className='no-print center no-mobile'>
                        <RowInput type='money' datakey={row.key} value={row.money ? row.money : ''} ref={'money_' + row.key} focusToSearch={() => this._onFocusSearch()} clearFocus={() => this._onClearFocus()} upload={row.upload ? true : false} placeholder="禮金" disabled={this.props.readOnly ? true : false} dispatch={this.props.dispatch}/>
                    </td>
                    <td className='no-print center no-mobile'>
                        <RowInput type='order' datakey={row.key} value={row.order ? row.order : ''} ref={'order_' + row.key} focusToSearch={() => this._onFocusSearch()} clearFocus={() => this._onClearFocus()} upload={row.upload ? true : false} placeholder="順序" disabled={this.props.readOnly ? true : false} dispatch={this.props.dispatch}/>
                    </td>
                </tr>
            )
        })
        return (
            <div className='sheet-list'>
                <div className='no-print search-bar'>
                    編號/姓名搜尋：&nbsp;<input type='text' onKeyDown={(e) => this._enter(e)} ref='txtSearch'/>&nbsp;
                    <div className='chk-block'>
                        <input type='checkbox' id='chkShowAll' onChange={(e) => this._showAll(e)} checked={this.props.showAll}/><label htmlFor='chkShowAll'>顯示全部</label>
                    </div>
                </div>
                <div className='no-print button-bar'>
                    <button className='btn-refresh' onClick={(e) => this._clear(e)}>重整</button>
                    <button className='no-mobile' onClick={(e) => this._clear(e)} disabled={this.props.readOnly ? true : false}>清除本機暫存</button>
                    <button className='no-mobile' onClick={(e) => this._upload(e)} disabled={this.props.readOnly ? true : false} ref='upload'>上傳到雲端</button>
                    <button className='no-mobile' onClick={(e) => this._print(e)} disabled={this.props.readOnly ? true : false}>列印條碼</button>
                </div>
                <table className='sheet-table'>
                    <tbody>
                        <tr className='sheet-row no-print'>
                            <th style={{width: '100px'}}>編號</th>
                            <th>名字</th>
                            <th>分類</th>
                            <th style={{width: '50px'}}>桌次</th>
                            <th className='no-mobile' style={{width: '50px'}}>喜餅</th>
                            <th className='no-mobile' style={{width: '110px'}}>禮金</th>
                            <th className='no-mobile' style={{width: '110px'}}>順序</th>
                        </tr>
                        <NewRow ref='newRow' cat={this.props.cat} readOnly={this.props.readOnly} dispatch={this.props.dispatch}/>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
    _enter(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._search(event.target.value)
        }
    }
    _search(value) {
        const val = value.trim()
        const find = this.props.data.find((obj) => {
            return obj.key == val || (val && obj.name.toLowerCase().search(val.toLowerCase()) > -1) || (val && obj.name.toUpperCase().search(val.toUpperCase()) > -1)
        })
        if (find) {
            this.setState({
                find: val,
                focus: 'money_' + find.key,
            })
        } else {
            this.setState({
                find: '',
                focus: 'txtSearch',
            })
            this.refs.txtSearch.focus()
            this.refs.txtSearch.select()
        }
    }
    _showAll(event) {
        const { dispatch } = this.props
        dispatch(toggleShowAll())
    }
    _focusSearch() {
        const node = ReactDOM.findDOMNode(this.refs[this.state.focus]) || this.refs[this.state.focus]
        if (node) {
            if (node.disabled) {
                const find = this.props.data.find((row) => {
                    return this.state.find &&
                        (this.state.find === row.key || row.name.search(this.state.find) > -1) &&
                        this.refs['money_' + row.key].disabled === false
                })
                if (find) {
                    ReactDOM.findDOMNode(this.refs['money_' + find.key]).focus()
                    ReactDOM.findDOMNode(this.refs['money_' + find.key]).select()
                } else {
                    this.setState({
                        focus: 'txtSearch',
                    })
                }
            } else {
                node.focus()
                node.select()
            }
        }
    }
    _onFocusSearch() {
        this.setState({
            focus: 'txtSearch',
        })
    }
    _onClearFocus() {
        this.setState({
            focus: '',
        })
    }
    _clear() {
        const { dispatch } = this.props
        dispatch(clearLocalStorage())
    }
    _upload() {
        const disabledBtn = () => {
            this.refs.upload.disabled = true
        }
        const enableBtn = () => {
            this.refs.upload.disabled = false
        }
        const { dispatch, data } = this.props
        dispatch(pushToCloud(data, disabledBtn, enableBtn));
    }
    _print() {
        window.print()
    }
}

class NewRow extends Component {
    render() {
        const options = this.props.cat.map((name, i) => <option key={'ddlCat_' + i} value={name}>{name}</option>)
        return (
            <tr className={this.props.readOnly ? 'sheet-row no-print no-mobile hidden' : 'sheet-row no-print no-mobile'}>
                <td className='center'><button onClick={(e) => this._save(e)}>新增</button></td>
                <td><input type='text' ref='txtName' placeholder='姓名'/></td>
                <td>
                    <select ref='ddlCat'>
                        <option value=''>請選擇類別</option>
                        {options}
                    </select>
                </td>
                <td></td>
                <td></td>
                <td className='center'><input type='text' ref='txtMoney' placeholder='禮金'/></td>
                <td></td>
            </tr>
        )
    }
    _save() {
        if (this.refs.txtName.value && this.refs.ddlCat.value && this.refs.txtMoney.value) {
            const { dispatch } = this.props
            dispatch(insertData(this.refs.txtName.value, this.refs.ddlCat.value, this.refs.txtMoney.value))
            this.refs.txtName.value = ''
            this.refs.ddlCat.value = ''
            this.refs.txtMoney.value = ''
        } else {
            alert('請填妥所有欄位')
        }
    }
}

/**
 * <Barcode code={barcode} />
 * http://jquery-barcode.googlecode.com/svn/trunk/jquery-barcode/demo/demo.html
 */
class Barcode extends Component {
    componentDidMount() {
        $(this.refs.barcode).barcode({
            code: 'code39',
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.code !== this.props.code
    }
    componentDidUpdate() {
        $(this.refs.barcode).barcode({
            code: 'code39',
        })
    }
    render() {
        return (
            <span ref='barcode' className='bar-code'>{this.props.code}</span>
        )
    }
}

class RowInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            this.setState({
                value: nextProps.value,
            })
        }
    }
    render() {
        return (
            <input
                type='text'
                className={this.props.className}
                placeholder={this.props.placeholder}
                disabled={this.props.upload || this.props.disabled ? true : false}
                onBlur={(e) => this._save(e)}
                onChange={(e) => this._onChange(e)}
                onKeyDown={(e) => this._onKeyDown(e)}
                value={this.state.value}
            />
        )
    }
    _save() {
        if (this.state.value) {
            this.props.clearFocus()
            const { dispatch } = this.props
            switch (this.props.type) {
                case 'money':
                    dispatch(saveMoney(this.props.datakey, this.state.value))
                    return
                case 'order':
                    dispatch(saveOrder(this.props.datakey, this.state.value))
                    return
            }
        }
    }
    _onChange(event) {
        this.setState({
            value: event.target.value,
        })
    }
    _onKeyDown(event) {
        if (event.target.value) {
            switch (event.keyCode) {
                case ENTER_KEY_CODE:
                    this.props.focusToSearch()
                    break
                case TAB_KEY_CODE:
                    this.props.clearFocus()
                    break
            }
        }
    }
}
RowInput.propTypes = {
    datakey: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    // value: PropTypes.string,
    upload: PropTypes.bool,
}

function mapStateToProps(state) {
    return {
        data: state.overallReducer.data,
        cat: state.overallReducer.cat,
        showAll: state.uiReducer.showAll,
        onUpload: state.uiReducer.onUpload,
        uploadVal: state.uiReducer.uploadVal,
    }
}
export default connect(mapStateToProps)(Spreadsheet)