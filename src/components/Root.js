import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { moviesPageStore } from '../store/moviesPageStore';
import { loginFormStore } from '../store/loginFormStore';
import { userStore } from '../store/userStore';
import MoviesScreen from './screens/MoviesScreen/MoviesScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import Filters from './screens/Filters/Filters';

class Root extends React.Component {
  render() {
    return (
      <Provider
        moviesPageStore={moviesPageStore}
        loginFormStore={loginFormStore}
        userStore={userStore}
      >
        <Router>
          <Stack key="root">
            <Scene key="login" component={LoginScreen} title="Login" />
            <Scene key="movies" component={MoviesScreen} title="Movies" hideNavBar />
            <Scene key="filters" component={Filters} title="Filters" />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

export default Root;
