// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { Row, Column as Col, Grid } from "react-native-responsive-grid";
import WS from "../../../services/ws";
import MessageBuilder from "../../../services/MessageBuilder";
import Voice from "react-native-voice";
import { Container, Header, Content, Textarea, Form } from "native-base";
import Base64 from "../../../util/Base64";

class VoiceRecognitionPage extends Component {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: []
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }
  componentWillMount() {
    if (!WS.isConnected()) this.props.navigation.navigate("QrCodeReaderPage");
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    // eslint-disable-next-line
    console.log("onSpeechStart: ", e);
    this.setState({
      started: "√"
    });
  };

  onSpeechRecognized = e => {
    // eslint-disable-next-line
    console.log("onSpeechRecognized: ", e);
    this.setState({
      recognized: "√"
    });
  };

  onSpeechEnd = e => {
    // eslint-disable-next-line
    console.log("onSpeechEnd: ", e);
    this.setState({
      end: "√"
    });
    var message = this.state.partialResults.join("");
    if (message) this.enviarTexto();
    this._startRecognizing();
  };

  enviarTexto = () => {
    let message = MessageBuilder.ReconhecimentoSTT(
      this.state.partialResults.join("")
    );
    WS.send(Base64.btoa(JSON.stringify(message)));
  };

  onSpeechError = e => {
    // eslint-disable-next-line
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error)
    });
  };

  onSpeechResults = e => {
    // eslint-disable-next-line
    console.log("onSpeechResults: ", e);
    this.setState({
      results: e.value
    });
  };

  onSpeechPartialResults = e => {
    // eslint-disable-next-line
    console.log("onSpeechPartialResults: ", e);
    this.setState({
      partialResults: e.value
    });
  };

  onSpeechVolumeChanged = e => {
    // eslint-disable-next-line
    console.log("onSpeechVolumeChanged: ", e);
    this.setState({
      pitch: e.value
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: ""
    });

    try {
      await Voice.start("pt-BR");
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      TextareaContent: ""
    });
  };

  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Form>
            <Textarea
              onChange={value => {
                //alert(JSON.stringify(value));
              }}
              onChangeText={value => {
                WS.send(Base64.btoa(value));
              }}
              value={this.state.TextareaContent}
              rowSpan={5}
              bordered
              placeholder="Textarea"
            />
          </Form>
          <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
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
          </TouchableHighlight>
        </Content>

        {/* <View style={styles.container}>
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
           </View>*/}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1
  }
});

export default VoiceRecognitionPage;
