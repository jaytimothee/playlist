(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _MediaPlayerComponent = _interopRequireDefault(require("./components/media/mediaComponents/MediaPlayerComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super.apply(this, arguments);
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_MediaPlayerComponent["default"], null);
    }
  }]);

  return App;
}(_react["default"].Component);

exports["default"] = App;
});

;require.register("api/endpoints.js", function(exports, require, module) {
"use strict";

console.log("endpoint");
});

;require.register("components/media/context/MusicPlayListContext.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicProvider = exports.MusicPlayListContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _playlist = _interopRequireDefault(require("../../../playlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MusicPlayListContext = /*#__PURE__*/(0, _react.createContext)();
exports.MusicPlayListContext = MusicPlayListContext;

var MusicProvider = function MusicProvider(props) {
  var _useState = (0, _react.useState)(_playlist["default"]),
      _useState2 = _slicedToArray(_useState, 2),
      music = _useState2[0],
      setMusic = _useState2[1];

  var _useState3 = (0, _react.useState)(music[0]),
      _useState4 = _slicedToArray(_useState3, 2),
      nowPlaying = _useState4[0],
      setNowPlaying = _useState4[1];

  var handlePlayMusic = function handlePlayMusic(song) {
    setNowPlaying(song);
  };

  var nextSong = function nextSong(currentSong) {
    var index = music.findIndex(function (music) {
      return music.id === currentSong.id;
    });
    setNowPlaying(music[nextTrackIndex(index)]);
  };

  var prevSong = function prevSong(currentSong) {
    var index = music.findIndex(function (music) {
      return music.id === currentSong.id;
    });
    setNowPlaying(music[prevTrackIndex(index)]);
  };

  var prevTrackIndex = function prevTrackIndex(index) {
    console.log(music.length, "idx=>", index);
    if (index === 0) return music.length - 1;
    return index - 1;
  };

  var nextTrackIndex = function nextTrackIndex(index) {
    if (index === music.length - 1) return 0;
    return index + 1;
  };

  return /*#__PURE__*/_react["default"].createElement(MusicPlayListContext.Provider, {
    value: {
      music: music,
      nowPlaying: nowPlaying,
      handlePlayMusic: handlePlayMusic,
      nextSong: nextSong,
      prevSong: prevSong
    }
  }, props.children);
};

exports.MusicProvider = MusicProvider;
});

;require.register("components/media/mediaComponents/MediaPlayerComponent.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _NowPlaying = _interopRequireDefault(require("./NowPlaying"));

var _PlayListComponent = _interopRequireDefault(require("./PlayListComponent"));

var _MusicPlayListContext = require("../context/MusicPlayListContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MediaPlayer = function MediaPlayer() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "media-container"
  }, /*#__PURE__*/_react["default"].createElement(_MusicPlayListContext.MusicProvider, null, /*#__PURE__*/_react["default"].createElement(_NowPlaying["default"], null), /*#__PURE__*/_react["default"].createElement(_PlayListComponent["default"], null)));
};

var _default = MediaPlayer;
exports["default"] = _default;
});

;require.register("components/media/mediaComponents/NavigationComponent.jsx", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MusicPlayListContext = require("../context/MusicPlayListContext");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Navigation = function Navigation(_ref) {
  var currentTrack = _ref.currentTrack;

  var _useContext = (0, _react.useContext)(_MusicPlayListContext.MusicPlayListContext),
      nextSong = _useContext.nextSong,
      prevSong = _useContext.prevSong;

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "navigation"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return prevSong(currentTrack);
    },
    id: "prev",
    className: "action-btn"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faBackward
  })), /*#__PURE__*/_react["default"].createElement("button", {
    id: "play",
    className: "action-btn action-btn-big"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faPlay
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return nextSong(currentTrack);
    },
    id: "next",
    className: "action-btn"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faForward
  })));
};

var _default = Navigation;
exports["default"] = _default;
});

;require.register("components/media/mediaComponents/NowPlaying.jsx", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _NavigationComponent = _interopRequireDefault(require("./NavigationComponent"));

var _MusicPlayListContext = require("../context/MusicPlayListContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var NowPlaying = function NowPlaying() {
  var _useContext = (0, _react.useContext)(_MusicPlayListContext.MusicPlayListContext),
      nowPlaying = _useContext.nowPlaying;

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "music-container play"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "music-info"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    id: "title"
  }, nowPlaying.track), /*#__PURE__*/_react["default"].createElement("div", {
    className: "progress-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "progress"
  }))), /*#__PURE__*/_react["default"].createElement("audio", {
    src: "https://s3.us-east-2.amazonaws.com/react-challenge/tracks/frank_ocean_sweet_life.mp3",
    id: "audio"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "img-container"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "data:image/jpeg;base64,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",
    alt: "music-cover",
    id: "cove"
  })), /*#__PURE__*/_react["default"].createElement(_NavigationComponent["default"], {
    currentTrack: nowPlaying
  }));
};

var _default = NowPlaying;
exports["default"] = _default;
});

;require.register("components/media/mediaComponents/PlayListComponent.jsx", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Song = _interopRequireDefault(require("./Song"));

var _MusicPlayListContext = require("../context/MusicPlayListContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PlayList = function PlayList() {
  var _useContext = (0, _react.useContext)(_MusicPlayListContext.MusicPlayListContext),
      music = _useContext.music;

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlist"
  }, /*#__PURE__*/_react["default"].createElement("button", null, "shuffle"), music && music.map(function (music) {
    return /*#__PURE__*/_react["default"].createElement(_Song["default"], {
      music: music,
      key: music.id
    });
  }));
};

var _default = PlayList;
exports["default"] = _default;
});

;require.register("components/media/mediaComponents/Song.jsx", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MusicPlayListContext = require("../context/MusicPlayListContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Song = function Song(_ref) {
  var music = _ref.music;

  var _useContext = (0, _react.useContext)(_MusicPlayListContext.MusicPlayListContext),
      handlePlayMusic = _useContext.handlePlayMusic;

  return /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      return handlePlayMusic(music);
    },
    className: "music"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, music.artist), /*#__PURE__*/_react["default"].createElement("p", null, music.track, " - ", music.album));
};

var _default = Song;
exports["default"] = _default;
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_App["default"], null), document.querySelector('#app'));
});
});

;require.register("playlist.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  artist: 'Frank Ocean',
  album: 'channel ORANGE',
  track: 'Sweet Life',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/frank_ocean_sweet_life.mp3',
  id: '7a187a2c-e6fe-46a6-a8d4-5b5984da3de3'
}, {
  artist: 'Grace Jones',
  album: 'Bulletproof Heart',
  track: 'On My Way',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/grace_jones_on_my_way.mp3',
  id: '9f6b44a3-0d57-4ae1-bfab-2447adf6eaf0'
}, {
  artist: 'Junior Boys',
  album: 'Big Black Coat',
  track: 'You Say That',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/junior_boys_you_say_that.mp3',
  id: '1c8d7409-59fb-4bf8-9ee6-8a328559754a'
}, {
  artist: 'Kate Bush',
  album: 'Hounds of Love',
  track: 'Running Up That Hill',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/kate_bush_running_up_that_hill.mp3',
  id: 'a27f140e-082d-4004-9368-1c7bfd84e9d0'
}, {
  artist: 'King',
  album: 'We Are King',
  track: 'Supernatural',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/king_supernatural.mp3',
  id: '0a78d3b2-7dc6-462b-8d8c-a5310ccb6451'
}, {
  artist: 'Terry Riley',
  album: 'Persian Surgery Dervishes',
  track: 'Performance 1, part 1',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/terry_riley_persian_surgery_dervises_performance_1_part_1.mp3',
  id: 'd7e10f3c-e967-43f8-babc-14ce537a2578'
}];
exports["default"] = _default;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map