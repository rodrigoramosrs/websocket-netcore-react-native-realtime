// @flow
import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import { Row, Column as Col, Grid } from "react-native-responsive-grid";
import WS from "../../../services/ws";
import MessageBuilder from "../../../services/MessageBuilder";
import Voice from "react-native-voice";
import {
  Container,
  Header,
  Content,
  Textarea,
  Form,
  Icon,
  Card,
  CardItem,
  Body,
  Text,
  Button,
  Toast
} from "native-base";
import Base64 from "../../../util/Base64";
import DefaultHeader from "../../../components/DefaultHeader";

class VoiceRecognitionPage extends Component {
  state = {
    textoAtual: ""
  };

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (!WS.isConnected()) this.props.navigation.navigate("QrCodeReaderPage");
  }

  componentWillUnmount() {}

  render() {
    return (
      <Container>
        <DefaultHeader
          Title="Voz para texto"
          Subtitle="Transcreve o texto ditado"
        />
        <View style={styles.container}>
          <Content padder>
            <View style={styles.topContainer}>
              <Card>
                <CardItem header bordered>
                  <Text style={{ textAlign: "center" }}>
                    <Icon style={{ fontSize: 18 }} name="mic" /> Voz para texto
                    (STT)
                  </Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text
                      style={{
                        fontSize: 13,
                        textAlign: "center",
                        fontStyle: "italic"
                      }}
                    >
                      Clique no campo abaixo, e selecione o reconhecimento de
                      voz nas opções de teclado do seu sistema. ao finalizar
                      clique no botão "Enviar conteúdo do texto"
                    </Text>
                    <View
                      stule={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {/* <Icon
                        style={{
                          fontSize: 256,
                          color: "red",
                          textShadowColor: "#585858",
                          textShadowOffset: { width: 1, height: 1 },
                          textShadowRadius: 10
                        }}
                        name="mic"
                      /> */}
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </View>
            <View style={styles.footerContainer}>
              <View
                style={{
                  paddingBottom: 8
                  // justifyContent: "center",
                  // alignItems: "center",
                  // flexDirection: "row"
                }}
              >
                <Textarea
                  style={{ backgroundColor: "white" }}
                  onChange={value => {
                    //alert(JSON.stringify(value));
                  }}
                  onChangeText={value => {
                    this.setState({ textoAtual: value });
                  }}
                  value={this.state.TextareaContent}
                  rowSpan={15}
                  bordered
                  placeholder="Digite o seu texto aqui"
                />
              </View>
              <Form>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Button
                    iconLeft
                    rounded
                    primary
                    onPress={() => {
                      let mensagem = MessageBuilder.ReconhecimentoSTT(
                        this.state.textoAtual
                      );
                      WS.send(Base64.btoa(JSON.stringify(mensagem)));

                      Toast.show({
                        text: "Conteúdo enviado...",
                        buttonText: "Ok",
                        duration: 3000,
                        type: "success"
                      });
                    }}
                  >
                    <Icon name="send" />
                    <Text>Enviar conteúdo do texto</Text>
                  </Button>
                </View>
              </Form>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5F5F5"
  },
  topContainer: {
    flex: 4
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "row"
    // backgroundColor: "#fff"
  },
  footerContainer: {
    flex: 1
    // justifyContent: "center",
    // alignItems: "center"
    //backgroundColor: "#aaa"
  },
  button: {
    width: 50,
    height: 50
  }
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#F5FCFF"
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: "center",
  //   margin: 10
  // },
  // action: {
  //   textAlign: "center",
  //   color: "#0000FF",
  //   marginVertical: 5,
  //   fontWeight: "bold"
  // },
  // instructions: {
  //   textAlign: "center",
  //   color: "#333333",
  //   marginBottom: 5
  // },
  // stat: {
  //   textAlign: "center",
  //   color: "#B0171F",
  //   marginBottom: 1
  // }
});

export default VoiceRecognitionPage;

{
  /* <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
          <Text style={styles.instructions}>
            Press the button and start speaking.
          </Text>
          <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
          <Text style={styles.stat}>{`Recognized: ${
            this.state.recognized
          }`}</Text>
          <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
          <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
          <Text style={styles.stat}>Results</Text>
          {this.state.results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.stat}>
                {result}
              </Text>
            );
          })}
          <Text style={styles.stat}>Partial Results</Text>
          {this.state.partialResults.map((result, index) => {
            return (
              <Text key={`partial-result-${index}`} style={styles.stat}>
                {result}
              </Text>
            );
          })}
          <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
          <TouchableHighlight
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={this._startRecognizing}
          >
            <Image style={styles.button} source={require("./button.png")} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this._stopRecognizing}>
            <Text style={styles.action}>Stop Recognizing</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._cancelRecognizing}>
            <Text style={styles.action}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._destroyRecognizer}>
            <Text style={styles.action}>Destroy</Text>
          </TouchableHighlight> */
}

{
  /* <View style={styles.container}>
          <View>
            <Row
              style={{
                paddingTop: "6%",
                paddingBottom: "6%",
                backgroundColor: "white",
                borderBottomColor: "lightgray",
                borderBottomWidth: 1
              }}
            >
              <Col size={80} offset={6}>
                <Row>
                  <Col size={50} smSize={100}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#BD1206",
                        fontWeight: "bold"
                      }}
                    >
                      March 9, 2017
                    </Text>
                    <Row>
                      <Col size={5}>
                        <Text>oi</Text>
                      </Col>
                      <Col size={60} offset={2.5}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "gray",
                            lineHeight: 20
                          }}
                        >
                          TAKEOUT ORDER
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col size={50} smSize={100}>
                    <Text style={{ fontSize: 16, color: "#0a0a0a" }}>
                      Double Cheese Burger
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col size={14} offset={-6} hAlign="right">
                <Text>oi</Text>
              </Col>
            </Row>
          </View> 
           </View>*/
}
