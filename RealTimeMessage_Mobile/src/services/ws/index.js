/* global WebSocket */
/* eslint no-unused-vars: "off" */
import React, { Component } from "react";
import PropTypes from "prop-types";

var _websocket;
const WS = {
  send: data => {
    if (!_websocket) return;

    _websocket.send(data);
  },
  close: () => {
    if (!_websocket) return;

    _websocket.close();
    _websocket = undefined;
  },
  isConnected: () => {
    if (!_websocket) return false;

    return _websocket.readyState === 1;
  },
  getState: () => {
    if (!_websocket) return 3;

    return _websocket.readyState;
  },
  connect: (
    url,
    openCallback,
    onErrorCallback,
    onMessageCallback,
    onCloseCallback
  ) => {
    _websocket = new WebSocket(url);
    _websocket.onopen = () => {
      if (openCallback) openCallback();
    };
    _websocket.onmessage = () => {
      if (onMessageCallback) onMessageCallback();
    };
    _websocket.onerror = () => {
      if (onErrorCallback) onErrorCallback();
    };
    _websocket.onclose = () => {
      if (onCloseCallback) onCloseCallback();
    };
  }
};

export default WS;
//export default WebSocketClient;
