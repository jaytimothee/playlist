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

;require.register("components/media/context/MusicPlayListContext.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicProvider = exports.MusicPlayListContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _playlist = _interopRequireDefault(require("../../../playlist"));

var _helpers = require("../../../utils/helpers");

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
      _useState2 = _slicedToArray(_useState, 1),
      music = _useState2[0];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      shuffle = _useState4[0],
      setShuffle = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      playButton = _useState6[0],
      setPlayButton = _useState6[1];

  var _useState7 = (0, _react.useState)(music[0]),
      _useState8 = _slicedToArray(_useState7, 2),
      nowPlaying = _useState8[0],
      setNowPlaying = _useState8[1];
  /**
   * shuffle
   * @returns random song from playlist
   */


  var shufflePlaylist = function shufflePlaylist() {
    return music[Math.floor(Math.random() * music.length)];
  };
  /**
   * side effect- set shuffle boolean value
   * @param {boolean} isShuffle shuffle true or false value
   */


  var handleShuffle = function handleShuffle(isShuffle) {
    setShuffle(isShuffle);
  };
  /**
   * side effect - set now playing and play button to true
   * @param {object} song current song to be played
   */


  var handlePlayMusic = function handlePlayMusic(song) {
    setNowPlaying(song);
    setPlayButton(true);
  }; // navagaition controlls


  var previousSong = function previousSong(currentSong) {
    setNowPlaying(music[prevTrackIndex((0, _helpers.songIndexLookUp)(currentSong))]);
  };
  /**
   *
   * @param {number} index current track index
   * @returns {number} index of previous track
   */


  var prevTrackIndex = function prevTrackIndex(index) {
    if (index === 0) return music.length - 1; //loop playlist if track is at begining

    return index - 1;
  };
  /**
   * takes in the current song and looks up its index in the playlist
   * side effect - set now playing base on shuffle boolean
   *
   * @param {object} currentSong
   */


  var nextSong = function nextSong(currentSong) {
    if (shuffle) return setNowPlaying(shufflePlaylist()); // exit early if shuffle is true

    setNowPlaying(music[nextTrackIndex((0, _helpers.songIndexLookUp)(currentSong))]);
  };

  var nextTrackIndex = function nextTrackIndex(index) {
    if (index === music.length - 1) return 0; // start playlist over if last track

    return index + 1;
  }; //[END]


  return /*#__PURE__*/_react["default"].createElement(MusicPlayListContext.Provider, {
    value: {
      music: music,
      nowPlaying: nowPlaying,
      playButton: playButton,
      shuffle: shuffle,
      handlePlayMusic: handlePlayMusic,
      handleShuffle: handleShuffle,
      nextSong: nextSong,
      previousSong: previousSong,
      setPlayButton: setPlayButton
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

  //destructure dependencies from media playlist context
  var _useContext = (0, _react.useContext)(_MusicPlayListContext.MusicPlayListContext),
      nextSong = _useContext.nextSong,
      previousSong = _useContext.previousSong,
      playButton = _useContext.playButton,
      setPlayButton = _useContext.setPlayButton;
  /**
   * side effect - change play button boolean value
   * @param {boolean} playState boolean value for play or pause
   */


  var togglePlay = function togglePlay(playState) {
    setPlayButton(playState);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "navigation"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return previousSong(currentTrack);
    },
    id: "prev",
    className: "action-btn"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faBackward
  })), /*#__PURE__*/_react["default"].createElement("button", {
    id: "play",
    className: "action-btn action-btn-big"
  }, playButton ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    onClick: function onClick() {
      return togglePlay(false);
    },
    icon: _freeSolidSvgIcons.faPause
  }) : /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    onClick: function onClick() {
      return togglePlay(true);
    },
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
      nowPlaying = _useContext.nowPlaying,
      playButton = _useContext.playButton,
      nextSong = _useContext.nextSong; //dependencies from music player context


  var audioElement = (0, _react.useRef)(null); //audio element reference

  var progressBar = (0, _react.useRef)(null);
  var setProgress = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    playButton ? audioElement.current.play() : audioElement.current.pause();
  }, [playButton, nowPlaying]);

  function handleTimeChange() {
    var _audioElement$current = audioElement.current,
        currentTime = _audioElement$current.currentTime,
        duration = _audioElement$current.duration;
    var timeChange = currentTime / duration * 100;
    progressBar.current.style.width = "".concat(timeChange, "%");
  }

  function handleSetProgress(e) {
    var width = setProgress.current.offsetWidth;
    var setTime = e.nativeEvent.offsetX;
    var duration = audioElement.current.duration;
    audioElement.current.currentTime = setTime / width * duration;
  }

  function handleNextSong() {
    nextSong(nowPlaying);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "music-container ".concat(playButton ? 'play' : '')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "music-info"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    id: "title"
  }, nowPlaying.track), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: handleSetProgress,
    ref: setProgress,
    className: "progress-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: progressBar,
    className: "progress"
  }))), /*#__PURE__*/_react["default"].createElement("audio", {
    onTimeUpdate: handleTimeChange,
    onEnded: handleNextSong,
    ref: audioElement,
    src: nowPlaying.url,
    id: "audio"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "img-container"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: nowPlaying.cover,
    alt: "music-cover",
    id: "cover"
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

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PlayList = function PlayList() {
  var _useContext = (0, _react.useContext)(_MusicPlayListContext.MusicPlayListContext),
      music = _useContext.music,
      shuffle = _useContext.shuffle,
      handleShuffle = _useContext.handleShuffle; //dependencies from music player context


  var handleShuffleClick = function handleShuffleClick() {
    handleShuffle(!shuffle); // toggle shuffle state
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlist"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "shuffle-btn action-btn ".concat(shuffle ? 'active' : ''),
    onClick: function onClick() {
      return handleShuffleClick();
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faRandom
  })), music && music.map(function (music) {
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
  itemID: 'Music_NV_100',
  id: '7a187a2c-e6fe-46a6-a8d4-5b5984da3de3',
  artist: 'Frank Ocean',
  album: 'channel ORANGE',
  cover: 'https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg',
  track: 'Sweet Life',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/frank_ocean_sweet_life.mp3'
}, {
  itemID: 'Music_NV_101',
  id: '9f6b44a3-0d57-4ae1-bfab-2447adf6eaf0',
  artist: 'Grace Jones',
  album: 'Bulletproof Heart',
  cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Gracejonesbulletproof.jpg/220px-Gracejonesbulletproof.jpg',
  track: 'On My Way',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/grace_jones_on_my_way.mp3'
}, {
  itemID: 'Music_NV_102',
  id: '1c8d7409-59fb-4bf8-9ee6-8a328559754a',
  artist: 'Junior Boys',
  album: 'Big Black Coat',
  cover: 'https://cityslang.com/assets/images/releases/_mediumSquare/junior-boys-big-black-coat.jpg',
  track: 'You Say That',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/junior_boys_you_say_that.mp3'
}, {
  itemID: 'Music_NV_103',
  id: 'a27f140e-082d-4004-9368-1c7bfd84e9d0',
  artist: 'Kate Bush',
  album: 'Hounds of Love',
  cover: 'https://i.pinimg.com/originals/51/64/65/516465f9c4d3dcf1a927f24cf10290e6.jpg',
  track: 'Running Up That Hill',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/kate_bush_running_up_that_hill.mp3'
}, {
  itemID: 'Music_NV_104',
  id: '0a78d3b2-7dc6-462b-8d8c-a5310ccb6451',
  artist: 'King',
  album: 'We Are King',
  track: 'Supernatural',
  cover: 'https://f4.bcbits.com/img/a1634160324_16.jpg',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/king_supernatural.mp3'
}, {
  itemID: 'Music_NV_105',
  id: 'd7e10f3c-e967-43f8-babc-14ce537a2578',
  artist: 'Terry Riley',
  album: 'Persian Surgery Dervishes',
  track: 'Performance 1, part 1',
  cover: 'https://www.moma.org/media/W1siZiIsIjM3OTA0NCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=b8f34b8b9d790e4d',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/terry_riley_persian_surgery_dervises_performance_1_part_1.mp3'
}];
exports["default"] = _default;
});

;require.register("utils/helpers.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.songIndexLookUp = void 0;

var _playlist = _interopRequireDefault(require("../playlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * look up the index of current song in playlist
 * @param {object} currentSong current song that is playing
 * @returns {number} the index of the current song
 */
var songIndexLookUp = function songIndexLookUp(currentSong) {
  return _playlist["default"].findIndex(function (music) {
    return music.id === currentSong.id;
  });
};

exports.songIndexLookUp = songIndexLookUp;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map