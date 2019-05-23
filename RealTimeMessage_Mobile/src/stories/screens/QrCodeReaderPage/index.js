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
import WS from "../../../services/ws";
import Base64 from "../../../util/Base64";
import { withNavigation } from "react-navigation";

class QrCodeReaderPage extends Component {
  state = {
    qrcode: "",
    status:
      "Aponte o leitor de Codigos para a tela para se conectar ao sistema."
  };
  onSuccess = e => {
    this.setState({ qrcode: e.data });
    this.setState({ status: "Tentando conectar..." });
    WS.connect(
      Base64.atob(e.data),
      () => {
        //Conectado
        this.setState({ status: "conectado, redirecionando..." });
        this.props.navigation.goBack();
        // setTimeout(() => {

        // }, 2000);
      },
      () => {
        this.setState({
          status:
            "Erro ao conectar. Tente novamente. Aponte o leitor de Codigos para a tela para se conectar ao sistema."
        });
      }
    );
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>{this.state.status}</Text>
          </Text>
        }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
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

export default withNavigation(QrCodeReaderPage);