import { observable, action, configure } from 'mobx';
import { Actions } from 'react-native-router-flux';
import CallApi from '../api/api';
import { userStore } from './userStore';

configure({ enforceActions: 'always' });

class LoginFormStore {
  @observable username = 'dima.machulsky@gmail.com';

  @observable password = 'password666';

  @observable repeatPassword = 'password666';

  @observable errors = {};

  @observable submitButton = false;

  @observable showLoginModal = false;

  @action
  onChangeValue = ({ name, value }) => {
    this[name] = value;
    this.updateErrors({
      base: null,
      [name]: null,
    });
  };

  @action
  toggleLoginModal = () => {
    this.showLoginModal = !this.showLoginModal;
  };

  @action
  updateErrors = (errors = {}) => {
    for (const key in errors) {
      this.errors[key] = errors[key];
    }
  };

  @action
  updateSubmitting = (value) => {
    this.submitButton = value;
  };

  @action
  handleBlur = ({ name }) => {
    const errors = this.validateFields();
    if (errors[name]) this.errors[name] = errors[name];
  };

  validateFields = () => {
    const errors = {};

    if (this.username === '') {
      errors.username = 'Username can`t be empty';
    }

    if (this.password === '') {
      errors.password = 'Password can`t be empty';
    }

    if (this.repeatPassword !== this.password) {
      errors.repeatPassword = 'Passords must be equal';
    }

    return errors;
  };

  @action
  onSubmit = () => {
    let session_id = null;
    this.updateSubmitting(true);
    CallApi.get('/authentication/token/new')
      .then(data => CallApi.post('/authentication/token/validate_with_login', {
        body: {
          username: this.username,
          password: this.password,
          request_token: data.request_token,
        },
      }))
      .then(data => CallApi.post('/authentication/session/new', {
        body: {
          request_token: data.request_token,
        },
      }))
      .then((data) => {
        session_id = data.session_id;
        return CallApi.get('/account', {
          params: {
            session_id: data.session_id,
          },
        });
      })
      .then((user) => {
        this.updateSubmitting(false);
        userStore.updateAuth({ session_id, user });
        Actions.movies();
      })
      .catch((error) => {
        this.updateSubmitting(false);
        this.updateErrors({
          base: error.status_message,
        });
      });
  };
}

export const loginFormStore = new LoginFormStore();
