'use strict';

module.exports = function (app, nconf) {
  var crypto = require('crypto');
  var Publico = require('meatspace-publico');
  var nativeClients = require('../clients.json');
  var whitelist = require('../whitelist.json');
  var level = require('level');

  app.get('/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  });

  app.get('/admin', function (req, res) {
    res.render('admin');
  });

  app.get('/info', function (req, res) {
    res.render('info');
  });

  app.get('/', function (req, res) {
    res.render('index');
  });

  // NOTE: This is now a deprecated API method -- All chats go out through web sockets
  app.get('/get/chats', function (req, res) {
    res.status(410);
    res.json({
      error: 'This method is now deprecated. All chat messages, including initial ones, are now emitted through web socket messages.'
    });
  });

  app.get('/ip', function (req, res) {
    res.json({
      ip: req.ip,
      admin: req.session.authenticated || false
    });
  });

  app.get('/terms', function (req, res) {
    res.render('terms');
  });

};
