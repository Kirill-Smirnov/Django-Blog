"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Created by Kirill Smirnov
*/

var AJAX = function () {
	function AJAX() {
		_classCallCheck(this, AJAX);
	}

	_createClass(AJAX, null, [{
		key: "send",
		value: function send(settings) {
			var xhr = new XMLHttpRequest();

			xhr.open(settings.method, settings.url, true);

			if (settings.method === "POST") {
				for (var header in settings.headers) {
					xhr.setRequestHeader(header, settings.headers[header]);
				}

				xhr.send(settings.body);
			} else xhr.send();

			var response = this.isValid(xhr);

			// if (!response.status) {
			// 	throw new Error(`server responsed ${response.code}`)
			// }
		}
	}, {
		key: "isValid",
		value: function isValid(xhr) {
			return {
				status: xhr.status === 200,
				code: xhr.status
			};
		}
	}]);

	return AJAX;
}();

var Post = function () {
	function Post() {
		_classCallCheck(this, Post);
	}

	_createClass(Post, null, [{
		key: "delete",
		value: function _delete(id, token) {
			// $.ajax({
			// 	url: `/delete/${id}/`,
			// 	csrfmiddlewaretoken: `${token}`,
			// 	method: 'POST',
			// 	headers: {
			// 		"X-CSRFToken": $.cookie("csrftoken"),
			// 	},
			// });

			AJAX.send({
				method: 'POST',
				url: "/delete/" + id + "/",
				body: "csrfmiddlewaretoken=" + token,
				headers: {
					"X-CSRFToken": Cookies.get("csrftoken")
				}
			});

			window.location.redirectTo('/');
		}
	}]);

	return Post;
}();

window.Location.prototype.setHref = function (href) {
	return window.location.href = href;
};
window.Location.prototype.redirectTo = function (pathname) {
	return window.location.pathname = pathname;
};

var NodeListToArray = function NodeListToArray(list) {
	return [].slice.call(list);
};

;(function () {
	var posts = document.getElementsByClassName('post');
	var postList = NodeListToArray(posts);

	postList.forEach(function (item, i, arr) {
		var deleteBtn = item.getElementsByClassName('post__delete')[0];
		var id = item.getElementsByClassName('post__id')[0];

		if (deleteBtn) deleteBtn.onclick = function () {
			return Post.delete(id.innerHTML, '');
		};
	});
})();
/*!
 * JavaScript Cookie v2.0.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory(window.jQuery);
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				value = encodeURIComponent(String(value));
				value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return document.cookie = [key, '=', value, attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
				attributes.path && '; path=' + attributes.path, attributes.domain && '; domain=' + attributes.domain, attributes.secure ? '; secure' : ''].join('');
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init();
});