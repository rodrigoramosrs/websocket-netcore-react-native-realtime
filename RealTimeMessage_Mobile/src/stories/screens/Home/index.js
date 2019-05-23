import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem
} from "native-base";
import WS from "../../../services/ws";

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

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="menu"
                //onPress={() => this.props.navigation.navigate("DrawerOpen")}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button
            onPress={() => {
              this.props.navigation.navigate("VoiceRecognitionPage");
            }}
            full
            danger
          >
            <Text>Gravador de Voz</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Home;
