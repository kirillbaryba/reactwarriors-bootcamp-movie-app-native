import React from 'react';
import { Avatar } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

@inject(({ userStore }) => ({
  userStore,
}))
@observer
class User extends React.Component {
  render() {
    const {
      userStore: { user },
    } = this.props;
    return (
      <Avatar
        size="small"
        rounded
        source={{
          uri: `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=40`,
        }}
        onPress={() => console.log('Works!')}
        activeOpacity={0.7}
      />
    );
  }
}

export default User;
