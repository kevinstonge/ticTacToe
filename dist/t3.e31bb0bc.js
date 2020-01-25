// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"stars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Star = function Star(obj) {
  _classCallCheck(this, Star);

  this.radius = obj.radius;
  this.color = obj.color;
  this.x = obj.x;
  this.y = obj.y;
  this.element = document.createElement("div");
  this.element.className = "star";
  document.querySelector("#bg3").appendChild(this.element);
  this.element.style.backgroundColor = this.color;
  this.element.style.width = this.element.style.height = "".concat(this.radius, "px");
  this.element.style.top = "".concat(this.y, "vh");
  this.element.style.left = "".concat(this.x, "vw");
  this.element.style.boxShadow = "0 0 ".concat(this.radius * 2, "px ").concat(this.radius / 2, "px ").concat(this.color);
};

exports.default = Star;
},{}],"drawStars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stars = _interopRequireDefault(require("./stars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function drawStars() {
  var container = document.querySelector("#bg3");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  var stars = [];

  for (var i = 0; i < 200; i++) {
    var x = rand(0, 100);
    var y = rand(0, 100);
    var h = rand(1, 359);
    var s = rand(50, 100);
    var l = rand(80, 100);
    var radius = rand(1, 4);
    stars.push(new _stars.default({
      x: x,
      y: y,
      color: "hsl(".concat(h, ",").concat(s, "%,").concat(l, "%)"),
      radius: radius
    }));
  }

  return stars;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var _default = drawStars;
exports.default = _default;
},{"./stars":"stars.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _stars = _interopRequireDefault(require("./stars"));

var _drawStars = _interopRequireDefault(require("./drawStars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globals = {
  stars: [],
  first: "human",
  difficulty: "easy",
  symbol: "X"
};
var t3Game = {
  difficulty: "easy",
  first: "human",
  symbol: "X",
  winningCells: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]],
  initialize: function initialize() {
    t3Game.win = null;
    t3Game.infoText = "good luck!";
    t3Game.playerCells = [];
    t3Game.computerCells = [];
    t3Game.gameOver = false;
    t3Game.initializeBoard();
    t3Game.updateBoard();
  },
  initializeBoard: function initializeBoard() {
    var html = "";

    for (var i = 1; i < 4; i++) {
      html += "<tr>\n                <td id=\"cell".concat(3 * i - 2, "\" class=\"cell\"></td>\n                <td id=\"cell").concat(3 * i - 1, "\" class=\"cell\"></td>\n                <td id=\"cell").concat(3 * i, "\" class=\"cell\"></td></tr>");
    }

    document.querySelector("#gameBoard").innerHTML = html;
  },
  findPairs: function findPairs(cells) {
    var foundPairs = [];
    t3Game.winningCells.forEach(function (winningSet) {
      var count = 0; //might be a problem here!

      cells.forEach(function (cell) {
        if (winningSet.includes(cell)) {
          count++;
        }

        if (count == 2) {
          foundPairs.push(winningSet);
        }
      });
    });
    return foundPairs;
  },
  move: function move() {
    var playerWin = t3Game.winCheck(t3Game.playerCells);

    if (playerWin.length > 0) {
      t3Game.win = true;
      t3Game.infoText = "you win!";
      t3Game.gameOver = true;
      t3Game.updateBoard();
      return;
    }

    var possibleMoves = [];
    var allPairs = [];
    allPairs = allPairs.concat(t3Game.findPairs(t3Game.computerCells), t3Game.findPairs(t3Game.playerCells));

    if (allPairs.length > 0) {
      allPairs.forEach(function (e) {
        e.forEach(function (i) {
          if (!t3Game.computerCells.includes(i) && !t3Game.playerCells.includes(i)) {
            possibleMoves.push(i);
          }
        });
      });
    }

    var bestMoves = [5, 1, 3, 7, 9, 2, 4, 6, 8];

    if (t3Game.difficulty == "easy") {
      bestMoves = bestMoves.reverse();
    }

    if (t3Game.playerCells.length == 0 && t3Game.computerCells.length == 0) {
      if (t3Game.difficulty == "easy") {
        t3Game.computerCells.push(bestMoves[Math.ceil(Math.random() * (bestMoves.length - 1))]);
      }

      if (t3Game.difficulty == "hard") {
        t3Game.computerCells.push(bestMoves[0]);
      }

      t3Game.updateBoard();
      return;
    }

    bestMoves.forEach(function (e) {
      if (!t3Game.computerCells.includes(e) && !t3Game.playerCells.includes(e) && !possibleMoves.includes(e)) {
        possibleMoves.push(e);
      }
    });

    if (possibleMoves[0]) {
      t3Game.computerCells.push(possibleMoves[0]);
    }

    if (t3Game.winCheck(t3Game.computerCells).length > 0) {
      t3Game.infoText = "you lost!";
      t3Game.win = false;
      t3Game.gameOver = true;
    }

    if (t3Game.computerCells.length + t3Game.playerCells.length == 9) {
      t3Game.infoText = "nobody won";
      t3Game.win = null;
    }

    t3Game.updateBoard();
  },
  pInput: function pInput(cell) {
    var cellNumber = parseInt(cell);

    if (t3Game.playerCells.includes(cellNumber) || t3Game.computerCells.includes(cellNumber) || t3Game.gameOver == true) {
      return;
    } else {
      t3Game.playerCells.push(cellNumber);
      t3Game.move();
    }
  },
  setFirstHuman: function setFirstHuman() {
    if (t3Game.first != "human") {
      t3Game.first = "human";
      document.querySelector("#firstHuman").className = "selected";
      document.querySelector("#firstComputer").className = "";
    }
  },
  setFirstComputer: function setFirstComputer() {
    if (t3Game.first != "computer") {
      t3Game.first = "computer";
      document.querySelector("#firstHuman").className = "";
      document.querySelector("#firstComputer").className = "selected";
    }
  },
  setDifficultyEasy: function setDifficultyEasy() {
    if (t3Game.difficulty != "easy") {
      t3Game.difficulty = "easy";
      document.querySelector("#difficultyEasy").className = "selected";
      document.querySelector("#difficultyHard").className = "";
    }
  },
  setDifficultyHard: function setDifficultyHard() {
    if (t3Game.difficulty != "hard") {
      t3Game.difficulty = "hard";
      document.querySelector("#difficultyEasy").className = "";
      document.querySelector("#difficultyHard").className = "selected";
    }
  },
  setSymbolX: function setSymbolX() {
    if (t3Game.symbol != "X") {
      t3Game.symbol = "X";
      document.querySelector("#symbolX").className = "selected";
      document.querySelector("#symbolO").className = "";
    }
  },
  setSymbolO: function setSymbolO() {
    if (t3Game.symbol != "O") {
      t3Game.symbol = "O";
      document.querySelector("#symbolX").className = "";
      document.querySelector("#symbolO").className = "selected";
    }
  },
  updateBoard: function updateBoard() {
    document.querySelector("#infoText").innerText = t3Game.infoText;

    for (var i = 1; i < 10; i++) {
      var symbol = " ";

      if (t3Game.playerCells.includes(i)) {
        symbol = t3Game.symbol;
      }

      if (t3Game.computerCells.includes(i)) {
        symbol = t3Game.symbol == "X" ? "O" : "X";
      }

      document.querySelector("#cell".concat(i)).innerText = symbol;
    }

    if (t3Game.win != null) {
      var winningCells = t3Game.win == true ? t3Game.winCheck(t3Game.playerCells) : t3Game.winCheck(t3Game.computerCells); //highlight winning cells

      var winningColor = t3Game.win == true ? "var(--c6)" : "var(--c7)";
      winningCells.forEach(function (i) {
        i.forEach(function (j) {
          document.querySelector("#cell".concat(j)).style.color = winningColor;
        });
      });
    }
  },
  winCheck: function winCheck(cells) {
    var foundWin = [];
    t3Game.winningCells.forEach(function (e) {
      if (cells.includes(e[0]) && cells.includes(e[1]) && cells.includes(e[2])) {
        foundWin.push(e);
      }
    });
    return foundWin;
  }
};
window.addEventListener('load', function () {
  globals.stars = (0, _drawStars.default)();
  t3Game.initialize();
});
window.addEventListener('click', function (e) {
  var tID = e.target.id;

  switch (tID) {
    case "firstHuman":
      t3Game.setFirstHuman();
      break;

    case "firstComputer":
      t3Game.setFirstComputer();
      break;

    case "difficultyEasy":
      t3Game.setDifficultyEasy();
      break;

    case "difficultyHard":
      t3Game.setDifficultyHard();
      break;

    case "symbolX":
      t3Game.setSymbolX();
      break;

    case "symbolO":
      t3Game.setSymbolO();
      break;
  }

  if (tID.slice(0, 4) == "cell") {
    t3Game.pInput(tID.slice(4, 5));
  }

  if (tID == "newGame") {
    t3Game.initialize();

    if (t3Game.first == "computer") {
      t3Game.move();
    }
  }
});
},{"./stars":"stars.js","./drawStars":"drawStars.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63091" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/t3.e31bb0bc.js.map