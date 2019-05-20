/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import VoiceTest from "./src/VoiceTest";
import ScanScreen from "./src/ScanScreen";

import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => VoiceTest);
