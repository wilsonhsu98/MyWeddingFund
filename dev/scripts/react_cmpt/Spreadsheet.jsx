define([

	'react',
	'jBarcode',
	'RoundProgress',
	'underscore',
	'../stores/AppStore',
	'../actions/AppAction'

], function(

	React,
	jBarcode,
	RoundProgress,
	_,
	AppStore,
	AppAction

) {

	'use strict';

	var ReactPropTypes = React.PropTypes,
		ENTER_KEY_CODE = 13,
		TAB_KEY_CODE = 9;

	/**
	 * <Spreadsheet pollInterval={2000} />
	 */
	var Spreadsheet = React.createClass({
		getInitialState: function() {
			return {
				data: [],
				openCloud: false,
				openUpload: false,
				openPwd: sessionStorage.getItem("password") === null ? true : false,
				readOnly: true
			};
		},
		componentDidMount: function() {
			AppStore.on('change:data', function(value) {
				this.setState({
					data: _.sortBy(value, function(obj) { return parseInt(obj.key, 10); })
				});
			}.bind(this));
			AppStore.on('change:uploadVal', function(value) {
				this.setState({
					openUpload: true
				});
				this.progress.setValue(value * 100);
			}.bind(this));
			AppAction.loadFromServer();

			this.progress = new RoundProgress(this.refs.progress.getDOMNode(), {
				"displayGearwheel": false,
				"radius": 200,						// any integer
				"lineWidth": 30,					// any integer
				"lineCap": "round",					// each end style of the line. "round", "butt", or "square", default "butt"
				"max": 100,
				"value": 0,
				"interval": 500,
				"bgStyle": "gradient",				// "gradient" or "image", defualt: "gradient"
				"bgGradientTop": "#28cfbb",			// if bgStyle is "gradient" then necessary
				"bgGradientDown": "#45BBE6",		// if bgStyle is "gradient" then necessary
				"animateStyle": "easeInOutQuad"		// specifies the speed curve of the animation. "liner" or "easeInOutQuad", defualt: "liner"
			}).on("change", function (value) {
				$(this.refs.progressLabel.getDOMNode()).text(Math.min(parseInt(value, 10), 100) + '%');
			}.bind(this)).on("complete", function () {
				this.setState({
					openUpload: false
				});
				this.progress.setValue(0);
			}.bind(this));

			if (this.state.openPwd) {
				setTimeout(function() {
					this.refs.pwd.getDOMNode().focus();
				}.bind(this), 0);
			}
			// setInterval(this.loadFromServer, this.props.pollInterval);
		},
		render: function() {
			var money_barcode_smaller = [],
				money_barcode_bigger = [],
				moneyList = [
					1000, 1200, 1600, 1800,
					2000, 2200, 2600, 2800,
					3000, 3200, 3600, 3800,
					5000, 6000, 6600, 8000,
					10000, 12000
				],
				sum = 0;
			for (var i = 0, len = moneyList.length; i < len; i += 1) {
				var jsx = (
					<div>
						<Barcode code={moneyList[i]}/>
						<span>&nbsp;{moneyList[i]}</span>
					</div>
				);
				if (i < len / 2) {
					money_barcode_smaller.push(jsx);
				} else {
					money_barcode_bigger.push(jsx);
				}
			}
			for (var i = 0, len = this.state.data.length; i < len; i += 1) {
				sum += parseInt(this.state.data[i].money, 10) || 0;
			}

			return (
				<div className='spread-sheet'>
					<h1 className='title no-print'>Wilson & Effie 婚禮賓客名單{sum === 0 ? '' : ' (' + sum + ')'}</h1>
					<table className='money-list sheet-table'>
						<tr><td>{money_barcode_smaller}</td><td>{money_barcode_bigger}</td></tr>
					</table>
					<Sheetlist data={this.state.data} readOnly={this.state.readOnly}/>
					<div onClick={this._openCloud} title='點一下離開' className={'block-page no-print' + (this.state.openCloud ? ' open' : '')}>
						<iframe className='cloud-iframe' ref='cloudFrame'/>
						<button onClick={this._openCloud} className='no-print btn-open-block' disabled={this.state.readOnly ? true : false}>雲端</button>
					</div>
					<div className={'block-page no-print' + (this.state.openUpload ? ' open' : '')}>
						<div ref="progress">
							<span ref="progressLabel"></span>
						</div>
					</div>
					<div className={'block-page no-print' + (this.state.openPwd ? ' open' : '')}>
						<div className='pwd-block'>
							密碼：<input type="text" onKeyDown={this._enter} ref="pwd"/>
						</div>
					</div>
				</div>
			);
		},
		_openCloud: function() {
			if (!this.refs.cloudFrame.getDOMNode().src) {
				this.refs.cloudFrame.getDOMNode().src = 'https://docs.google.com/spreadsheets/d/1QCmCLZRLQVAreONM6tWjI4P1YEYoW5sqvxEdiCL-inE/edit#gid=1460813619';
			}
			this.setState({
				openCloud: !this.state.openCloud
			});
		},
		_enter: function(event) {
			if (event.keyCode === ENTER_KEY_CODE) {
				sessionStorage.setItem("password", event.target.value);
				this.setState({
					openPwd: false,
					readOnly: sessionStorage.getItem("password") === "9527" ? false : true
				});
			}
		}
	});

	/**
	 * <Sheetlist data={data} />
	 */
	var Sheetlist = React.createClass({
		getInitialState: function() {
			return {
				find: '',
				showAll: false,
				focus: ''
			};
		},
		componentDidMount: function() {
			this._onFocusSearch();
		},
		shouldComponentUpdate: function(nextProps, nextState) {
			return nextState.find !== this.state.find ||
				nextState.showAll !== this.state.showAll ||
				nextState.focus !== this.state.focus ||
				nextProps.data !== this.props.data ||
				nextProps.readOnly !== this.props.readOnly;
		},
		componentDidUpdate: function() {
			this._focusSearch();
		},
		render: function() {
			var rows = this.props.data.map(function(row) {
					var find = this.state.find && (this.state.find === row.key || row.name.toLowerCase().search(this.state.find.toLowerCase()) > -1 || row.name.toUpperCase().search(this.state.find.toUpperCase()) > -1 );
					// <td><Barcode code={row.key}/></td>
					return (
						<tr key={row.key} className={'sheet-row' + (this.state.showAll || find ? '' : ' hide') + (find ? ' find' : '')} ref={row.key} data-money_key={'money_' + row.key} onKeyDown={this._onFocusMoney}>
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
								<RowInput type='money' datakey={row.key} value={row.money ? row.money : ''} ref={'money_' + row.key} focusToSearch={this._onFocusSearch} clearFocus={this._onClearFocus} upload={row.upload ? true : false} placeholder="禮金" disabled={this.props.readOnly ? true : false}/>
							</td>
							<td className='no-print center no-mobile'>
								<RowInput type='order' datakey={row.key} value={row.order ? row.order : ''} ref={'order_' + row.key} focusToSearch={this._onFocusSearch} clearFocus={this._onClearFocus} upload={row.upload ? true : false} placeholder="順序" disabled={this.props.readOnly ? true : false}/>
							</td>
						</tr>
					);
				}.bind(this));
			return (
				<div className='sheet-list'>
					<div className='no-print search-bar'>
						編號/姓名搜尋：&nbsp;<input type='text' onKeyDown={this._enter} ref='txtSearch'/>&nbsp;
						<div className='chk-block'>
							<input type='checkbox' id='chkShowAll' onClick={this._showAll}/><label htmlFor='chkShowAll'>顯示全部</label>
						</div>
					</div>
					<div className='no-print button-bar'>
						<button className='btn-refresh' onClick={this._clear}>重整</button>
						<button className='no-mobile' onClick={this._clear} disabled={this.props.readOnly ? true : false}>清除本機暫存</button>
						<button className='no-mobile' onClick={this._upload} disabled={this.props.readOnly ? true : false} ref='upload'>上傳到雲端</button>
						<button className='no-mobile' onClick={this._print} disabled={this.props.readOnly ? true : false}>列印條碼</button>
					</div>
					<table className='sheet-table'>
						<tbody>
							<tr className='sheet-row no-print'>
								<th style={{width:'100px'}}>編號</th>
								<th>名字</th>
								<th>分類</th>
								<th style={{width:'50px'}}>桌次</th>
								<th className='no-mobile' style={{width:'50px'}}>喜餅</th>
								<th className='no-mobile' style={{width:'110px'}}>禮金</th>
								<th className='no-mobile' style={{width:'110px'}}>順序</th>
							</tr>
							<NewRow ref='newRow' readOnly={this.props.readOnly ? true : false}/>
							{rows}
						</tbody>
					</table>
				</div>
			);
		},
		_enter: function(event) {
			if (event.keyCode === ENTER_KEY_CODE) {
				// this.refs.txtSearch.getDOMNode().blur();
				this._search(event.target.value);
			}
		},
		_search: function(value) {
			var val = $.trim(value),
				find = _.find(this.props.data, function(obj){
					return obj.key == val || (val && obj.name.toLowerCase().search(val.toLowerCase()) > -1) || (val && obj.name.toUpperCase().search(val.toUpperCase()) > -1);
				});
			if (find) {
				this.setState({
					find: val,
					focus: 'money_' + find.key
				});
			} else {
				this.setState({
					find: '',
					focus: 'txtSearch'
				});
				this.refs.txtSearch.getDOMNode().focus();
				this.refs.txtSearch.getDOMNode().select();
			}
		},
		_showAll: function(event) {
			this.setState({
				showAll: event.target.checked
			});
		},
		_focusSearch: function() {
			if (this.refs[this.state.focus]) {
				if (this.refs[this.state.focus].getDOMNode().disabled) {
					var find = _.find(this.props.data, function(row) {
						return this.state.find &&
							(this.state.find === row.key || row.name.search(this.state.find) > -1 ) &&
							this.refs['money_' + row.key].getDOMNode().disabled === false;
					}.bind(this));
					if (find) {
						this.refs['money_' + find.key].getDOMNode().focus();
						this.refs['money_' + find.key].getDOMNode().select();
					} else {
						this.refs.txtSearch.getDOMNode().focus();
						this.refs.txtSearch.getDOMNode().select();
					}
				} else {
					this.refs[this.state.focus].getDOMNode().focus();
					this.refs[this.state.focus].getDOMNode().select();
				}
			}
		},
		_onFocusSearch: function() {
			this.setState({focus: 'txtSearch'});
		},
		_onClearFocus: function() {
			this.setState({focus: ''});
		},
		_clear: function() {
			AppAction.clearLocalStorage();
		},
		_upload: function() {
			var disabledBtn = function() {
					this.refs.upload.getDOMNode().disabled = true;
				}.bind(this),
				enableBtn = function() {
					this.refs.upload.getDOMNode().disabled = false;
				}.bind(this);
			AppAction.pushToCloud(disabledBtn, enableBtn);
		},
		_print: function() {
			window.print();
		}
	});

	var NewRow = React.createClass({
		getInitialState: function() {
			return {
				cat: []
			};
		},
		componentDidMount: function() {
			AppStore.on('change:cat', function(value){
				this.setState({cat: value});
			}.bind(this));
		},
		render: function() {
			var options = this.state.cat.map(function(name, i){
					return (
						<option key={'ddlCat_' + i} value={name}>{name}</option>
					);
				});
			return (
				<tr className={this.props.readOnly ? 'sheet-row no-print no-mobile hidden' : 'sheet-row no-print no-mobile'}>
					<td className='center'><button onClick={this._save}>新增</button></td>
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
			);
		},
		_save: function() {
			if (this.refs.txtName.getDOMNode().value && this.refs.ddlCat.getDOMNode().value && this.refs.txtMoney.getDOMNode().value) {
				AppAction.insert(this.refs.txtName.getDOMNode().value, this.refs.ddlCat.getDOMNode().value, this.refs.txtMoney.getDOMNode().value);
				this.refs.txtName.getDOMNode().value = '';
				this.refs.ddlCat.getDOMNode().value = '';
				this.refs.txtMoney.getDOMNode().value = '';
			} else {
				alert('請填妥所有欄位');
			}
		}
	});

	/**
	 * <Barcode code={barcode} />
	 * http://jquery-barcode.googlecode.com/svn/trunk/jquery-barcode/demo/demo.html
	 */
	var Barcode = React.createClass({
		componentDidMount: function() {
			$(this.refs.barcode.getDOMNode()).barcode({code: 'code39'});
		},
		shouldComponentUpdate: function(nextProps, nextState) {
			return nextProps.code !== this.props.code;
		},
		componentDidUpdate: function() {
			$(this.refs.barcode.getDOMNode()).barcode({code: 'code39'});
		},
		render: function() {
			return (
				<span ref='barcode' className='bar-code'>{this.props.code}</span>
			);
		}
	});

	var RowInput = React.createClass({
		propTypes: {
			datakey: ReactPropTypes.string,
			className: ReactPropTypes.string,
			id: ReactPropTypes.string,
			placeholder: ReactPropTypes.string,
			value: ReactPropTypes.string,
			upload: ReactPropTypes.bool
		},
		getInitialState: function() {
			return {
				value: this.props.value || ''
			};
		},
		componentWillReceiveProps: function(nextProps) {
			if (nextProps.value != this.props.value){
				this.setState({
					value: nextProps.value
				});
			}
		},
		render: function() {
			return (
				<input
					type='text'
					className={this.props.className}
					id={this.props.id}
					placeholder={this.props.placeholder}
					disabled={this.props.upload || this.props.disabled ? true : false}
					onBlur={this._save}
					onChange={this._onChange}
					onKeyDown={this._onKeyDown}
					value={this.state.value}
				/>
			);
		},
		_save: function() {
			this.props.clearFocus();
			AppAction.save(this.props.type, this.props.datakey, this.state.value);
		},
		_onChange: function(event) {
			this.setState({
				value: event.target.value
			});
		},
		_onKeyDown: function(event) {
			if (event.target.value) {
				switch (event.keyCode){
					case ENTER_KEY_CODE:
						this.props.focusToSearch();
						break;
					case TAB_KEY_CODE:
						this.props.clearFocus();
						break;
				}
			}
		}
	});

	return Spreadsheet;
});