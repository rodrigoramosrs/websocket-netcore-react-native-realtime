import * as React from "react";
import {
  Container,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Header,
  Card,
  CardItem
} from "native-base";
import { View, StyleSheet, ScrollView } from "react-native";
import WS from "../../../services/ws";
import DefaultHeader from "../../../components/DefaultHeader";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";

import styles from "./styles";
export interface Props {
  navigation: any;
  list: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  componentWillMount() {
    if (!WS.isConnected()) this.props.navigation.navigate("QrCodeReaderPage");
  }

  createButton = (text, icon, routeName) => {
    return (
      <View
        style={{
          paddingBottom: 12
        }}
      >
        <Button
          iconLeft
          rounded
          primary
          onPress={() => this.props.navigation.navigate(routeName)}
        >
          <Icon name={icon} />
          <Text>{text}</Text>
        </Button>
      </View>
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body
            style={{
              flex: 3
            }}
          >
            <Title>Vivace MV</Title>
          </Body>
          <Right>
            <Button
              iconLeft
              rounded
              primary
              onPress={() => {
                WS.close();

                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: "QrCodeReaderPage"
                    })
                  ]
                });
                this.props.navigation.dispatch(resetAction);
              }}
            >
              <Icon name="exit" />
            </Button>
          </Right>
        </Header>

        <View style={currentStyles.container}>
          <Content padder>
            <View style={currentStyles.topContainer}>
              <Card>
                <CardItem header bordered>
                  <Text>Registro Selecionado</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>Paciente: Fulano de tal</Text>
                    <Text>Acnumber: teste</Text>
                    <Text>Status: Laudado / Revisado </Text>
                  </Body>
                </CardItem>
                {/* <CardItem footer bordered>
                  <Text>Status: Ludado</Text>
                </CardItem> */}
              </Card>
            </View>
            <View style={currentStyles.footerContainer}>
              <Card>
                <CardItem header bordered>
                  <Text>Ações disponíveis</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontStyle: "italic",
                          fontSize: 12,
                          marginBottom: 4
                        }}
                      >
                        Voz
                      </Text>
                      {this.createButton(
                        "Voz para texto (STT)",
                        "mic",
                        "VoiceRecognitionPage"
                      )}
                      {this.createButton("Gravador de voz", "mic", "")}

                      <Text
                        style={{
                          fontStyle: "italic",
                          fontSize: 12,
                          marginBottom: 4
                        }}
                      >
                        Anexo
                      </Text>
                      {this.createButton(
                        "Scan. Doc. (Pedido Médico)",
                        "attach",
                        ""
                      )}
                      {this.createButton(
                        "Anexar Doc. (Pedido Médico)",
                        "attach",
                        ""
                      )}

                      <Text
                        style={{
                          fontStyle: "italic",
                          fontSize: 12,
                          marginBottom: 4
                        }}
                      >
                        Compartilhamento
                      </Text>
                      {this.createButton("Compartilhar laudo", "share", "")}
                    </View>
                  </Body>
                </CardItem>
                {/* <CardItem footer bordered>
                  <Text>Status: Ludado</Text>
                </CardItem> */}
              </Card>

              <View />
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

const currentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  topContainer: {
    justifyContent: "center"
  },
  footerContainer: {
    flex: 1
    // justifyContent: "center",
    // alignItems: "center"
  }
});
export default Home;

{
  /* <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingBottom: 12
            }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("VoiceRecognitionPage");
              }}
              rounded
            >
              <Icon name="home" />
              <Text>Voz para texto (STT)</Text>
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingBottom: 12
            }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("");
              }}
              rounded
            >
              <Icon name="home" />
              <Text>Scan. Doc. (Pedido Médico)</Text>
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingBottom: 12
            }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("");
              }}
              rounded
            >
              <Icon name="home" />
              <Text>Anexar Doc. (Pedido Médico)</Text>
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingBottom: 12
            }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("");
              }}
              rounded
            >
              <Icon name="home" />
              <Text>Gravador de voz</Text>
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingBottom: 12
            }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("");
              }}
              rounded
            >
              <Icon name="home" />
              <Text>Compartilhar laudo</Text>
            </Button>
          </View> */
}
