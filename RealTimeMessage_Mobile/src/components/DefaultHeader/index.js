import * as React from "react";
import BackButton from "../Navigation/BackButton";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Subtitle
} from "native-base";
import { withNavigation } from "react-navigation";

class DefaultHeader extends React.Component {
  render() {
    return (
      <Header>
        <Left>
          {this.props.LeftButton}
          {!this.props.LeftButton && (
            <BackButton navigation={this.props.navigation} />
          )}
        </Left>
        <Body
          style={{
            flex: 3
          }}
        >
          <Title>{this.props.Title ? this.props.Title : "Page Title"}</Title>
          {this.props.Subtitle && <Subtitle>{this.props.Subtitle}</Subtitle>}
        </Body>
        {this.props.RightButtom && <Right>{this.props.RightButtom}</Right>}
      </Header>
    );
  }
}

export default withNavigation(DefaultHeader);
