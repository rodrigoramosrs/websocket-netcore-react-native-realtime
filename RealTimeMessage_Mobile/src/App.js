// @flow
import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  StackNavigator,
  DrawerNavigator
} from "react-navigation";
import { Animated, Easing } from "react-native";
import { Root } from "native-base";
//import LoginContainer from "./container/LoginContainer";

import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import QrCodeReaderPage from "./stories/screens/QrCodeReaderPage";
import VoiceRecognitionPage from "./stories/screens/VoiceRecognitionPage";
import Splash from "./stories/screens/Splash";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      // Since we want the card to take the same amount of time
      // to animate downwards no matter if it's 3rd on the stack
      // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };
      const slideFromBottom = { transform: [{ translateY }] };

      const lastSceneIndex = scenes[scenes.length - 1].index;

      // Test whether we're skipping back more than one screen
      if (lastSceneIndex - toIndex > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === toIndex) return;
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) return { opacity: 0 };
        // Slide top screen down
        return slideFromBottom;
      }

      return slideFromRight;
    }
  };
};

const DrawerNavigatorRouter = createAppContainer(
  createStackNavigator(
    {
      //Login: { screen: LoginContainer },
      Splash: { screen: Splash },
      Home: { screen: Home },
      BlankPage: { screen: BlankPage },
      QrCodeReaderPage: { screen: QrCodeReaderPage },
      VoiceRecognitionPage: { screen: VoiceRecognitionPage }
    },
    {
      headerMode: "none"
    },
    {
      initialRouteName: "Splash",
      transitionConfig

      //drawerType: "back", //back , front
      //mode: "modal",
      //contentComponent: props => <Sidebar {...props} />
    }
  )
);

export default () => {
  return (
    <Root>
      <DrawerNavigatorRouter />
    </Root>
  );
};

// const MainApp = createAppContainer(DrawerNavigatorRouter);

// export default () => (
//   <Root>
//     <MainApp />
//   </Root>
// );

// const Drawer = createDrawerNavigator(
//   {
//     Home: { screen: Home }
//   },
//   {
//     initialRouteName: "Home",
//     contentComponent: props => <Sidebar {...props} />
//   }
// );

// const CurrentApp = StackNavigator(
//   {
//     Login: { screen: LoginContainer },
//     BlankPage: { screen: BlankPage },
//     Drawer: { screen: Drawer }
//   },
//   {
//     initialRouteName: "Login",
//     headerMode: "none"
//   }
// );

// const stackNavigatorRoute = createAppContainer(
//   createStackNavigator(
//     {
//       //Login: { screen: LoginContainer },
//       BlankPage: { screen: BlankPage },
//       Drawer: { screen: Drawer }
//     },
//     {
//       headerMode: "none",
//       //mode: "modal",
//       navigationOptions: {
//         gesturesEnabled: false
//       }
//     }
//   )
// );

// const AppStack = StackNavigator({
//   RootStack: { screen: DrawerNavigatorRouter }
// });

//export default App;
