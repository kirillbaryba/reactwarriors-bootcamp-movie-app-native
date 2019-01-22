import React from "react";
import { Image } from "react-native";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class User extends React.Component {
  render() {
    const {
      userStore: { user }
    } = this.props;
    return (
      <Image
        source={{
          uri: `https://www.gravatar.com/avatar/${
            user.avatar.gravatar.hash
          }.jpg?s=40`
        }}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    );
  }
}

export default User;
