import {api} from './api';
class LoginService {
  login(usuario) {
    return api().post(`/auth/login`, usuario);
  }
}

export default new LoginService();
