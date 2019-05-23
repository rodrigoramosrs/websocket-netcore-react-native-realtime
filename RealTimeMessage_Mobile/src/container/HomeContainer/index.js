// @flow
import * as React from "react";
import { connect } from "react-redux";
import Home from "../../stories/screens/Home";
export interface Props {
  navigation: any;
  data: Object;
}
export interface State {}
class HomeContainer extends React.Component<Props, State> {
  render() {
    return <Home navigation={this.props.navigation} />;
  }
}

export default HomeContainer;
