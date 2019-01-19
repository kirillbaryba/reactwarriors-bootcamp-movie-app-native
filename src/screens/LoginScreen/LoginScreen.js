import React from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { Input, Button } from "react-native-elements";
import { inject, observer } from "mobx-react";
import Icon from "react-native-vector-icons/FontAwesome";

@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class LoginScreen extends React.Component {
  handlePress = () => {
    const {
      loginFormStore: { validateFields, updateErrors, onSubmit }
    } = this.props;
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      updateErrors(errors);
    } else {
      onSubmit();
    }
  };

  render() {
    const {
      loginFormStore: {
        username,
        handleBlur,
        onChangeValue,
        errors,
        password,
        repeatPassword,
        submitButton
      }
    } = this.props;
    return (
      <React.Fragment>
        <StatusBar translucent={false} barStyle="default" />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <KeyboardAvoidingView behavior="position">
              <Input
                label="Enter username"
                placeholder="Username"
                errorStyle={{ color: "salmon" }}
                errorMessage={errors.username}
                value={username}
                onChangeText={inputValue => {
                  onChangeValue({ name: "username", value: inputValue });
                }}
                onBlur={() => handleBlur("username")}
                shake={true}
                leftIcon={<Icon name="user" size={24} color="black" />}
              />
              <Input
                label="Enter password"
                placeholder="Password"
                errorStyle={{ color: "salmon" }}
                errorMessage={errors.password}
                value={password}
                onChangeText={inputValue => {
                  onChangeValue({ name: "password", value: inputValue });
                }}
                secureTextEntry
                onBlur={handleBlur}
                shake={true}
                leftIcon={<Icon name="lock" size={24} color="black" />}
              />
              <Input
                label="Repeat password"
                placeholder="Repeat password"
                errorStyle={{ color: "salmon" }}
                errorMessage={errors.repeatPassword}
                value={repeatPassword}
                onChangeText={inputValue => {
                  onChangeValue({ name: "repeatPassword", value: inputValue });
                }}
                secureTextEntry
                onBlur={handleBlur}
                shake={true}
                leftIcon={<Icon name="repeat" size={24} color="black" />}
              />
              <Button
                icon={<Icon name="film" size={24} color="black" />}
                title="LOGIN"
                onPress={this.handlePress}
                buttonStyle={{
                  backgroundColor: "salmon",
                  width: 300,
                  height: 45,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
                  marginTop: 20
                }}
              />
            </KeyboardAvoidingView>
            {errors.base && (
              <Text style={{ color: "salmon" }}>{errors.base}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </React.Fragment>
    );
  }
}

export default LoginScreen;
