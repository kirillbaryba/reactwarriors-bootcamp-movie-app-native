import { observable, action, computed, configure } from "mobx";
import { AsyncStorage } from "react-native";
import CallApi from "../api/api";

configure({ enforceActions: "always" });

class UserStore {
  @observable user = {};

  @observable session_id = null;

  @computed get isAuth() {
    return Boolean(Object.keys(this.user).length);
  }

  @action
  resetUserInfo = async () => {
    await AsyncStorage.removeItem("session_id");
    this.user = {};
    this.session_id = null;
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.session_id
      }
    });
  };

  @action
  updateSessionId = session_id => {
    this.session_id = session_id;
  };

  @action
  updateUser = user => {
    this.user = user;
  };

  @action
  updateAuth = async ({ session_id, user }) => {
    try {
      await AsyncStorage.setItem("session_id", session_id);
      this.updateSessionId(session_id);
      this.updateUser(user);
    } catch (error) {
      console.log("error saving data");
    }
  };

  @action
  getUser = async () => {
    try {
      const session_id = await AsyncStorage.getItem("session_id");
      if (session_id) {
        CallApi.get("/account", {
          params: {
            session_id
          }
        }).then(user => {
          this.updateAuth({ session_id, user });
        });
      }
    } catch (error) {
      console.log("fail!");
    }
  };
}

export const userStore = new UserStore();
