import * as React from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";

import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";

class Splash extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 256, height: 256, resizeMode: "contain" }}
            source={require("../../../assets/img/vivace-logo-branco.png")}
          />
          {/* <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                //color: "#00496F",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 56,

                textShadowColor: "#fff",
                textShadowOffset: { width: 0.5, height: 0.5 },
                textShadowRadius: 2
              }}
            >
              Vivace
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 56,

                textShadowColor: "#fff",
                textShadowOffset: { width: 0.5, height: 0.5 },
                textShadowRadius: 2
              }}
            >
              MV
            </Text>
          </View> */}
        </View>
        <View style={styles.footerContainer}>
          <Image
            style={{ width: 128, height: 128, resizeMode: "contain" }}
            source={require("../../../assets/img/logo-mv-branca.png")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#4375A2"
  },
  logoContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
    // backgroundColor: "#fff"
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#aaa"
  }
});

export default withNavigation(Splash);
