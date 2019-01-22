import React from "react";
import { Provider } from "mobx-react";
import { Router, Scene, Stack } from "react-native-router-flux";
import { moviesPageStore } from "./stores/moviesPageStore";
import { loginFormStore } from "./stores/loginFormStore";
import { userStore } from "./stores/userStore";
import MoviesScreen from "./screens/MoviesScreen/MoviesScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Filters from "./screens/Filters/Filters";
import { AsyncStorage } from "react-native";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class Root extends React.Component {
  async componentDidMount() {
    const session_id = await AsyncStorage.getItem("session_id");
    if (session_id) {
      userStore.getUser(session_id);
    }
  }
  render() {
    return (
      <Provider
        moviesPageStore={moviesPageStore}
        loginFormStore={loginFormStore}
        userStore={userStore}
      >
        <Router>
          <Stack key="root">
            {userStore.isAuth ? (
              <Scene
                key="movies"
                component={MoviesScreen}
                title="Movies"
                hideNavBar
                navigationOptions
                gesturesEnabled={false}
              />
            ) : (
              <Scene key="login" component={LoginScreen} title="Login" />
            )}
            <Scene key="filters" component={Filters} title="Filters" />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

export default Root;
