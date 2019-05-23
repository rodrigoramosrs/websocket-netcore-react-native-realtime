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
import { Root } from "native-base";
//import LoginContainer from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import QrCodeReaderPage from "./stories/screens/QrCodeReaderPage";
import VoiceRecognitionPage from "./stories/screens/VoiceRecognitionPage";

const DrawerNavigatorRouter = createAppContainer(
  createDrawerNavigator(
    {
      //Login: { screen: LoginContainer },
      Home: { screen: Home },
      BlankPage: { screen: BlankPage },
      QrCodeReaderPage: { screen: QrCodeReaderPage },
      VoiceRecognitionPage: { screen: VoiceRecognitionPage }
    },
    {
      initialRouteName: "Home",
      //drawerType: "back", //back , front
      //mode: "modal",
      contentComponent: props => <Sidebar {...props} />,
      transitionConfig: () => ({
        transitionSpec: {
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;

          const height = layout.initHeight;
          const translateY = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [height, 0, 0]
          });

          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1]
          });

          return { opacity, transform: [{ translateY }] };
        }
      })
    }
  )
);

export default DrawerNavigatorRouter;

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
