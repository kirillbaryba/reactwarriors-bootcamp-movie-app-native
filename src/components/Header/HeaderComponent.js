import React from "react";
import { TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { inject, observer } from "mobx-react";
import { Actions } from "react-native-router-flux";
import User from "./User";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class HeaderComponent extends React.Component {
  handlePress = () => {
    Actions.filters();
  };

  render() {
    const {
      userStore: { isAuth }
    } = this.props;
    return (
      <Header
        leftComponent={
          <TouchableOpacity onPress={this.handlePress} style={{ padding: 10 }}>
            <Icon type="feather" name="filter" color="#fff" />
          </TouchableOpacity>
        }
        rightComponent={isAuth ? <User /> : { icon: "home", color: "#fff" }}
      />
    );
  }
}

export default HeaderComponent;
