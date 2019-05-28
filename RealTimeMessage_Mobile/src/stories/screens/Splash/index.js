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
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";

class Splash extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
      //   this.props.navigation.dispatch({
      //     type: "Reset",
      //     actions: [{ type: "Navigate", routeName: "Home" }],
      //     index: 0
      //   });
      //   const resetAction = StackActions.reset({
      //     index: 1,
      //     actions: [NavigationActions.navigate({ routeName: "Home" })]
      //   });
      //   debugger;
      //   this.props.navigation.dispatch(resetAction);

      //this.props.navigation.navigate("Home");
      //   const resetAction = StackActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({ routeName: "Home" })]
      //   });
      //   this.props.navigation.dispatch(resetAction);
    }, 3000);
  }

  render() {
    return (
      <Container>
        <Text>Splash Screen</Text>
      </Container>
    );
  }
}

export default withNavigation(Splash);
