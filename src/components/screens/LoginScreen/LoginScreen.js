import React from 'react';
import { View, StatusBar } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

@inject(({ loginFormStore }) => ({
  loginFormStore,
}))
@observer
class LoginScreen extends React.Component {
  handlePress = () => {
    const {
      loginFormStore: { validateFields, updateErrors, onSubmit },
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
        submitButton,
      },
    } = this.props;
    return (
      <React.Fragment>
        <StatusBar translucent={false} barStyle="default" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Input
            label="Enter username"
            placeholder="Username"
            errorStyle={{ color: 'red' }}
            errorMessage={errors.username}
            value={username}
            onChangeText={(inputValue) => {
              onChangeValue({ name: 'username', value: inputValue });
            }}
            onBlur={handleBlur}
          />
          <Input
            label="Enter password"
            placeholder="Password"
            errorStyle={{ color: 'red' }}
            errorMessage={errors.password}
            value={password}
            onChangeText={(inputValue) => {
              onChangeValue({ name: 'password', value: inputValue });
            }}
            secureTextEntry
            onBlur={handleBlur}
          />
          <Input
            label="Repeat password"
            placeholder="Repeat password"
            errorStyle={{ color: 'red' }}
            errorMessage={errors.repeatPassword}
            value={repeatPassword}
            onChangeText={(inputValue) => {
              onChangeValue({ name: 'repeatPassword', value: inputValue });
            }}
            secureTextEntry
            onBlur={handleBlur}
          />
          <Button title="Login" onPress={this.handlePress} style={{ marginTop: 10 }} />
        </View>
      </React.Fragment>
    );
  }
}

export default LoginScreen;
