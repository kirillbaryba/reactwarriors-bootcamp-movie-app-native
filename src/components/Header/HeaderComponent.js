import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import User from './User';

@inject(({ userStore }) => ({
  userStore,
}))
@observer
class HeaderComponent extends React.Component {
  handlePress = () => {
    Actions.filters();
  };

  render() {
    const {
      userStore: { isAuth },
    } = this.props;
    return (
      <Header
        leftComponent={
          <Icon type="feather" name="filter" color="#fff" onPress={this.handlePress} />
        }
        rightComponent={isAuth ? <User /> : { icon: 'home', color: '#fff' }}
      />
    );
  }
}

export default HeaderComponent;
