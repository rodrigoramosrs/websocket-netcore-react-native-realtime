import * as React from "react";
import { Button, Icon } from "native-base";

const BackButton = props => {
  return (
    <Button transparent onPress={() => props.navigation.navigate("Home")}>
      <Icon name="ios-arrow-back" />
    </Button>
  );
};

export default BackButton;
