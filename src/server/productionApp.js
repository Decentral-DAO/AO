'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dctrlDb = require('./dctrlDb');

var _dctrlDb2 = _interopRequireDefault(_dctrlDb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _currentAccounts = require('./onChain/currentAccounts');

var _socketioAuth = require('socketio-auth');

var _socketioAuth2 = _interopRequireDefault(_socketioAuth);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _reactions = require('./reactions');

var _reactions2 = _interopRequireDefault(_reactions);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _auth = require('./auth');

var _exchangeRate = require('./exchangeRate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 8003;

require('./onChain');
require('./reactions');

var app = (0, _express2.default)();

(0, _router2.default)(app);

startDctrlAo();

function startDctrlAo() {

  _dctrlDb2.default.startDb(function (err, conn) {

    _state2.default.initialize(function (err) {
      if (err) return console.log('state initialize failed:', err);

      console.log('state initialized', _state2.default.pubState);

      (0, _exchangeRate.watchSpot)();
      (0, _currentAccounts.initializeWatchedMembersAddresses)();

      // now we listen on the changefeed and keep the state up to date
      var evStream = _dctrlDb2.default.changeFeed.onValue(function (ev) {
        _state2.default.applyEvent(_state2.default.serverState, ev);
      }).onValue(_reactions2.default);

      var server = app.listen(PORT, function (err) {
        console.log("Listening on port", PORT);

        var io = (0, _socket2.default)(server);

        (0, _socketioAuth2.default)(io, {
          authenticate: _auth.socketAuth
          // TODO:
          // postAuthenticate:
          // disconnect:
          // timeout:
        });

        var filteredStream = evStream.map(_state2.default.removeSensitive).onValue(function (ev) {
          _state2.default.applyEvent(_state2.default.pubState, ev);
          console.log('emitting event');
          io.emit('eventstream', ev);
        });
      });
    });
  });
}
