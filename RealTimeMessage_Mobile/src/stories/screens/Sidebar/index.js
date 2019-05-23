import * as React from "react";
import { ScrollView } from "react-native";
import { Text, Container, List, ListItem, Content } from "native-base";
import {
  DrawerItems,
  SafeAreaView,
  NavigationActions,
  DrawerActions
} from "react-navigation";

const routes = [
  {
    route: "Home",
    caption: "Home"
  },
  {
    route: "BlankPage",
    caption: "Blank Page"
  },
  {
    route: "QrCodeReaderPage",
    caption: "Leitor QRCode"
  },
  {
    route: "VoiceRecognitionPage",
    caption: "Transcrição de Voz par Texto (STT)"
  }

  // {
  // 	route: "Login",
  // 	caption: "Logout",
  // },
];

export interface Props {
  navigation: any;
}
export interface State {}
// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: "Login" })]
// });
export default class Sidebar extends React.Component<Props, State> {
  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <Container>
            <Content>
              <List
                style={{ marginTop: 40 }}
                dataArray={routes}
                renderRow={data => {
                  return (
                    <ListItem
                      button
                      onPress={() => {
                        this.props.navigation.navigate(data.route);
                        this.props.navigation.dispatch(
                          DrawerActions.closeDrawer()
                        );
                        // data.route === "Login"
                        //   ? this.props.navigation.dispatch(resetAction)
                        //   : this.props.navigation.navigate(data.route);
                      }}
                    >
                      <Text>{data.caption}</Text>
                    </ListItem>
                  );
                }}
              />
            </Content>
          </Container>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
