/* Version: Ti-1200_4 */
(function(w, d, ua, $, token, STRINGS, CATEGORY_STRINGS, template) {
"use strict";

var CONFIG = {
		plid: token.TiPLID,
		lang: token.TiLang,
		url_continue: "http://localhost:37848/continue?TiCredToken=" + token.TiCredToken,
		param_url: "URL=" + encodeURIComponent(token.URL),
		param_category: "Source=Category",
		param_webaccess: "Source=WebAccess",
		param_blacklist: "Source=BlackList",
		param_permanent: "Permanent=1",
		ikb_url: token.IKBURLPC
	},
	proxyMode = token.ProxyMode,
	categoryTableID = token.CategoryGroup,
	wtpScore = parseInt(token.WRSScore, 10),
	hashTable = {
		website_block: 1,		// category
		blacklist_block: 2,	// black list (user-defined)
		access_block: 3
	},
	elemID = "website_block";

if (typeof $ === "undefined") {
	$ = function(selector) {
		switch (selector[0]) {
			case "#":
				return d.getElementById(selector.substr(1));
			case ".":
				if (d.getElementsByClassName) {
					return d.getElementsByClassName(selector.substr(1));
				} else {
					return d.querySelectorAll(selector);
				}
				break;
			default:
				return d.getElementsByTagName(selector);
		}
	};
}

// This initial code need to perform before other script.
(function() {
    var div = d.createElement("div");
    div.innerHTML = template;
    $("body").appendChild(div.firstChild);

	// Only firefox need to load this javascript to replace the token
	if (ua.indexOf("firefox") > -1 && /^tmpx:\/\//.test(w.location.href)) {
		w.fillInBlockingContent = function() {
			var queryString = w.location.search,
				params = {},
				insertBlockingString = function(id, strValue) {
					var divNode = d.createElement("div"),
						textNode = d.createTextNode(strValue),
						el = $("#" + id);
					divNode.appendChild(textNode);
					if (el) { el.innerHTML = divNode.innerHTML; }
				};

			queryString.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) { params[$1] = decodeURIComponent($3); });

			if (token.URL.indexOf("%") === 0) {
				var url = params.url || "";
				insertBlockingString("address", url);
				insertBlockingString("address_url", url);
				insertBlockingString("address_blacklist_url", url);
				CONFIG.url = url;
				CONFIG.param_url = "URL=" + encodeURIComponent(url);
			}

			if (token.WRSScore.indexOf("%") === 0) {
				wtpScore = parseInt(params.CategoryCredScore, 10);
			}

			if (token.CategoryGroup.indexOf("%") === 0) {
				categoryTableID = params.CategoryGroupName || "";
			}
		};
	}
}());

function HideTrendBlockLogo() {
	var block_logo = $("#icon_block_logo");
	block_logo.className = "hidden";
}

function HideFooter() {
	var footer = $(".footer")[0];
	footer.className = footer.className + " hidden";
}

function ChangeRedBtn2GrayColor() {
	var btn_close_window_list = $(".red-btn"),
		i, className;
	for (i = 0; i < btn_close_window_list.length; i++) {
		className = btn_close_window_list[i].className;
		if (className.indexOf("red-btn")) {
			className = className.replace("red-btn", "gray-btn");
		} else {
			className = className + " gray-btn";
		}
		btn_close_window_list[i].className = className;
	}
}

function IsTMToolbarEnabled() {
	var obj = null;
	try {
		obj = new ActiveXObject("ProToolbarIMRatingActiveX.ToolbarCB");
	} catch(e) {
		return false;
	}

	return typeof obj.ToolbarInvoke !== "undefined" && obj.ToolbarInvoke({test_key: "test_value"}) !== false;
}

function localizePageContent(strObj) {
	for (var idx in strObj) {
		if (idx === "title_bar") {
			d.title = strObj.title_bar;
		} else if (idx === elemID) {
			var subStrObj = strObj[idx];
			for (var key in subStrObj) {
				if (key === "page_title") {
					setWording(key, subStrObj[key]);
					continue;
				}
				setWording(key + "_" + idx, subStrObj[key]);
			}
		} else if (idx === "EPM_handler_desc") {
			var valEPM = strObj[idx].replace(/href=\'\'/ig, "href='" + token.IKBURL + "'");
			setWording(idx + "1", valEPM);
			setWording(idx + "2", valEPM);
			setWording(idx + "3", valEPM);
		} else {
			setWording(idx, strObj[idx]);
		}
	}
}

function setWording(id, strValue, attrName) {
	var el = $("#" + id);
	if (el) {
		if (attrName === undefined) {
			el.innerHTML = strValue;
		} else {
			el.setAttribute(attrName, strValue);
		}
	}
}

function takeAction(param) {
	var actionUrl = CONFIG.url_continue;

	actionUrl += "&" + CONFIG.param_url;
	for (var i in param) {
		actionUrl += "&" + CONFIG[param[i]];
	}

	d.location = actionUrl;
	return false;
}

function bringMainConsole() {
	var actionUrl = CONFIG.url_continue;

	actionUrl += "&" + CONFIG.param_url;
	actionUrl += "&" + CONFIG.param_blacklist;
	d.location = actionUrl;
	return false;
}

function toggleExtraOptions(block_id, handler_id) {
	var moreAction = $(block_id);
	var handler = $(handler_id);

	if (moreAction.className.indexOf("hidden") > -1) {
		moreAction.className = moreAction.className.replace(/hidden/ig, "");
		handler.className = handler.className.replace(/ico_collapse/ig, "ico_expand");
	} else {
		moreAction.className = moreAction.className + " hidden";
		handler.className = handler.className.replace(/ico_expand/ig, "ico_collapse");
	}

	return false;
}

function toggleExtraOptionsWebsiteBlock() { return toggleExtraOptions("#more_actions_website_block", "#handler_website_block"); }
function toggleExtraOptionsAccessBlock() { return toggleExtraOptions("#more_actions_access_block", "#handler_access_block"); }
function toggleExtraOptionsBlacklistBlock() { return toggleExtraOptions("#more_actions_blacklist_block", "#handler_blacklist_block"); }

function init() {
	// set language for localized font setting
	$("body")[0].className = CONFIG.lang;

	if (w.fillInBlockingContent) {
		w.fillInBlockingContent();
	}

	var pageID = (function() {
		if (proxyMode === "BLOCK") {
			// Web Access Time
			return hashTable.access_block;
		} else if (categoryTableID === "UD" || categoryTableID == "User&nbsp;Define" || categoryTableID == "User Define") {
			// WORKAROUND: waiting for AMSP fixing
			// Black List
			return hashTable.blacklist_block;
		} else {
			// Category
			return hashTable.website_block;
		}
	}());

	elemID = (function(value, hashObj) {
		for (var idx in hashObj) {
			if (value === hashObj[idx]) return idx;
		}
	}(pageID, hashTable));

	for (var identifier in hashTable) {
		if (identifier === elemID) {
			$("#" + identifier).className = $("#" + identifier).className.replace(/hidden/ig, "");
		} else {
			$("#" + identifier).className = $("#" + identifier).className + " hidden";
		}
	}

	// Firefox detecting
	if (ua.indexOf("firefox") !== -1 || ua.indexOf("chrome") !== -1 || ua.indexOf("safari") !== -1) {
		$("#btn_close_window_" + elemID).className = $("#btn_close_window_" + elemID).className + " hidden";
	} else {
		$("#close_window_desc_" + elemID).className = $("#close_window_desc_" + elemID).className + " hidden";
	}

	localizePageContent(STRINGS);

	// Load Category resource
	if (CATEGORY_STRINGS[categoryTableID] !== undefined) {
		setWording("category_virus", CATEGORY_STRINGS[categoryTableID]);
	} else {
		setWording("category_virus", categoryTableID);
	}

	var bindClick = function(id, fn) {
			if ($(id)) {
				$(id).onclick = fn;
			}
		},
		close = function() {
			w.close();
			return false;
		},
		bindActive = function(id) {
			var el = $(id);
			if (el) {
				el.onmousedown = function() {
					el.className = el.className + " active";
				};
				el.onmouseup = function() {
					el.className = el.className.replace(/active/ig, "");
				};
			}
		};

	// ask for permission (once)
	bindClick("#lnk_ask_perm_once", function() {
		takeAction(["param_category"]);
		return false;
	});

	// ask for permission (always)
	bindClick("#lnk_ask_perm_always", function() {
		takeAction(["param_category", "param_permanent"]);
		return false;
	});

	// surf for one hour
	bindClick("#lnk_surf_one_hour", function() {
		takeAction(["param_webaccess"]);
		return false;
	});

	// remove from blacklist
	bindClick("#btn_remove_from_blacklist", function() {
		bringMainConsole();
		return false;
	});

	bindClick("#btn_close_window_website_block", close);
	bindClick("#btn_close_window_access_block", close);
	bindClick("#btn_close_window_blacklist_block", close);

	bindActive("#btn_close_window_website_block");
	bindActive("#btn_close_window_access_block");
	bindActive("#btn_close_window_blacklist_block");
	bindActive("#btn_remove_from_blacklist");

	bindClick("#handler_desc_website_block", toggleExtraOptionsWebsiteBlock);
	bindClick("#handler_desc_access_block", toggleExtraOptionsAccessBlock);
	bindClick("#handler_desc_blacklist_block", toggleExtraOptionsBlacklistBlock);

	// block select
	d.onselectstart = function() { return false; };

	// do customization for NTT according to PLID
	var plidPrefix = CONFIG.plid.substring(0, 11);
	switch (plidPrefix) {
		case "TIT-NEF-HE-":
		case "TIT-NEN-HE-":
			HideFooter();
			ChangeRedBtn2GrayColor();
			HideTrendBlockLogo();
			break;
		case "TIT-NWF-HE-":
		case "TIT-NWN-HE-":
			if (pageID === hashTable.access_block) HideFooter();
			ChangeRedBtn2GrayColor();
			HideTrendBlockLogo();
			break;
	}

	// This mean the page that are blocked is not the topmost window (ex.iframe).
	if (w.self !== w.top) {
		var blockingHTML = $("html")[0];
		blockingHTML.className = "icon-only";
		// When the frame size is big enough, display blocking page still
		if (blockingHTML.clientWidth >= 872 && blockingHTML.clientHeight >= 478) {
			// Do not do anything.
		} else {	// When the frame size is not big enough to display the complete blocking page
			var blockingBody = $("body")[0];
			var normal_wrapper = $("#normal_block");
			var icons_wrapper = $("#icon_block");
			var block_image = $("#icon_block_image");
			var image_max_width = 110;
			var image_max_height = 140;
			var nodes = icons_wrapper.childNodes;

			blockingBody.className = "icon-only";
			normal_wrapper.style.display = "none";
			// To display a icon
			icons_wrapper.style.display = "block";
			// Show tip when user hovers the icon
			block_image.title = STRINGS.block_tip;
			// Auto resize the image based on frame size, but max size is image? size
			if (icons_wrapper.clientWidth >= image_max_width) {
				icons_wrapper.style.width = image_max_width + "px";
			}
			if (icons_wrapper.clientHeight >= image_max_height) {
				icons_wrapper.style.height = image_max_height + "px";
			}
			if (blockingBody.clientWidth >= image_max_width && blockingBody.clientHeight >= image_max_height) {
				for (i = 0; i < nodes.length; i++) {
					if (nodes[i].nodeName === "DIV") {
						nodes[i].backgroundSize = "initial";
					}
				}
			}

			// IE7 and IE8 do not support background-size attribute,
			// so need to fix element's size to fit the dimensions of the image.
			if (icons_wrapper.style.backgroundSize === undefined) {
				if (icons_wrapper.clientWidth > icons_wrapper.clientHeight) {
					icons_wrapper.style.width = (icons_wrapper.clientHeight * image_max_width / image_max_height) + "px";
				}
				if ((icons_wrapper.clientHeight - icons_wrapper.clientWidth) > (image_max_height-image_max_width)) {
					icons_wrapper.style.height = (icons_wrapper.clientWidth * image_max_height / image_max_width) + "px";
				}
			} else {
				// IE9 has filter and background-size attribute.
				// To avoid abnormal UI, remove filter setting.
				for (i = 0; i < nodes.length; i++) {
					if (nodes[i].nodeName === "DIV") {
						nodes[i].style.filter = "none";
					}
				}
			}

			// Click icon will open a new Window to an iKB page
			block_image.onclick = function() {
				w.open(CONFIG.ikb_url, "_blank");
				return false;
			};
		}
	}

	var img = new Image(),
		EPMContents = $(".js_EPM_content"),
		normalContents = $(".js_normal_content"),
		i;
	img.onload = function() {
		if ($("#loading")) $("body")[0].removeChild($("#loading"));
		for (i = 0; i < normalContents.length; i++) {
			normalContents[i].style.display = "list-item";
		}
		for (i = 0; i < EPMContents.length; i++) {
			EPMContents[i].style.display = "none";
		}
	};
	img.src = "http://localhost:37848/WTP/images/bg.png";
	setTimeout(function() {
		// Assume loading time is more than 1 sec, that means loading error.
		if ($("#loading")) {
			$("body")[0].removeChild($("#loading"));
			// if Toolbar is existed, show normal content
			if (IsTMToolbarEnabled()) {
				for (i = 0; i < normalContents.length; i++) {
					normalContents[i].style.display = "list-item";
				}
				for (i = 0; i < EPMContents.length; i++) {
					EPMContents[i].style.display = "none";
				}
			}
		}
	}, 1000);
}

w.onload = init;

}(window, document, navigator.userAgent.toLowerCase(), window.$, token, STRINGS, CATEGORY_STRINGS, template));