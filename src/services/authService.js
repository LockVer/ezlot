import ApiService from '../utils/apiService';
import i18n from '../locales/i18n'; // 假设你的i18n实例在这个路径下
import JSEncrypt from 'jsencrypt';
class AuthService {
  constructor() {
    this.apiService = new ApiService();
  }

  validateCredentials(credentials) {
    if (!credentials.username || !credentials.password) {
      throw new Error(i18n.t('error.mailAndPasswordRequired'));
    }
    // 这里可以添加更多的验证逻辑，例如检查用户名和密码的格式等
  }

  login(credentials) {
    this.validateCredentials(credentials);
    return new Promise((resolve, reject) => {
      this.apiService.post('/auth/login', credentials, false)
        .then(response => {
          console.log(response);
          if (response.data) {
            localStorage.setItem('username', credentials.username);
            localStorage.setItem('token', response.data);
            resolve(response);
          } else {
            reject(response.data.msg)
          }

        })
        .catch((err) => {
          reject(err);
        });
    })
  }
  encryptPassword(credentials) {
    return this.apiService.get('/auth/pubKey').then(res => {
      let encrypt = new JSEncrypt();
      console.log(res);
      encrypt.setPublicKey(res.data.pubKey);
      credentials.password = encrypt.encrypt(credentials.password);
      console.log(credentials);
    })
  }
  validateUser(user) {
    if (!user.password || !user.mail) {
      throw new Error(i18n.t('error.PasswordAndEmailRequired'));
    }
    // 这里可以添加更多的验证逻辑，例如检查用户名、密码和邮箱的格式等
  }

  register(user) {
    this.validateUser(user);
    return this.apiService.post('/register', user, false)
      .catch(error => {
        console.error(i18n.t('error.failedToRegister'), error);
        throw error;
      });
  }

  validateEmail(email) {
    if (!email) {
      throw new Error(i18n.t('error.emailRequired'));
    }
    // 这里可以添加更多的验证逻辑，例如检查邮箱的格式等
  }

  forgotPassword(email) {
    this.validateEmail(email);
    return this.apiService.post('/forgot-password', { email }, false)
      .catch(error => {
        console.error(i18n.t('error.failedToSendForgotPasswordEmail'), error);
        throw error;
      });
  }

  logout() {
    localStorage.removeItem('token');
    // 这里可以添加更多的逻辑，例如向服务器发送注销请求等
  }
}

export default AuthService;
