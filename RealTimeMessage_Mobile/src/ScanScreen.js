import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

export default class ScanScreen extends Component {
  state = {
    qrcode: ""
  };
  onSuccess = e => {
    this.setState({ qrcode: e.data });

    // Linking.openURL(e.data).catch(err =>
    //   console.error("An error occured", err)
    // );
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>
              Aponter o leitor de Codigos para a tela.{" "}
            </Text>
            Codigo reconhecido: {this.state.qrcode}
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});
