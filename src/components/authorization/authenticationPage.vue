<template>
  <div class="auth-wrapper">
    <div class="auth-container" :class="{'fluid-expanded': isFluidExpanded}">
      <div class="fluid-container">
        <img src="@/assets/fluid-1.png" class="fluid-1" alt="fluid">
      </div>

        <div class="form-section login" v-show="showLogin">
          <div class="form-title">
            <h1>WELCOME BACK</h1>
          </div>

          <div class="form-content">
            <div class="input-group">
              <input type="email"
                     id="email-login"
                     v-model="user.email"
                     @input="validateEmail"
                     placeholder="Please enter email">
              <label for="email-login">Email</label>
              <span v-if="invalidEmailReg" class="error">Please enter a valid email address</span>
            </div>

            <div class="input-group">
              <input type="password"
                     id="password-login"
                     v-model="user.password"
                     @input="validatePassword"
                     placeholder="Please enter password">
              <label for="password-login">Password</label>
              <span v-if="invalidPasswordReg" class="error">Password should be at least 8 characters</span>
            </div>

            <button class="submit-btn"
                    @click="login()"
                    :disabled="invalidEmailReg || invalidPasswordReg || isAnyFieldEmptyLog()">
              <span>Sign In</span>
            </button>

            <span v-if="loginError" class="error">Invalid credentials</span>
          </div>

          <div class="form-footer">
            <a href="#" @click="toggleForm">Sign Up</a>
            <a href="/recovery">Forgot Password?</a>
          </div>
        </div>

        <div class="form-section register" v-show="showRegister">
          <div class="form-title">
            <h1>CREATE ACCOUNT</h1>
          </div>

          <div class="form-content">
            <div class="name-group">
              <div class="input-group">
                <input type="text"
                       id="name-register"
                       v-model="user.firstName"
                       @input="validateName"
                       placeholder="First Name">
                <label for="name-register">First Name</label>
                <span v-if="invalidNameReg" class="error">Invalid name format</span>
              </div>

              <div class="input-group">
                <input type="text"
                       id="last-name-register"
                       v-model="user.lastName"
                       @input="validateLastName"
                       placeholder="Last Name">
                <label for="last-name-register">Last Name</label>
                <span v-if="invalidLastNameReg" class="error">Invalid last name format</span>
              </div>
            </div>

            <div class="input-group">
              <input type="email"
                     id="email-register"
                     v-model="user.email"
                     @input="validateEmail"
                     placeholder="Email">
              <label for="email-register">Email</label>
              <span v-if="invalidEmailReg" class="error">Invalid email format</span>
            </div>

            <div class="input-group">
              <input type="text"
                     id="phone-register"
                     v-model="user.phoneNumber"
                     v-mask="'+##-####-####'"
                     @input="validatePhoneNumber"
                     placeholder="+12-3456-7890">
              <label for="phone-register">Phone Number</label>
              <span v-if="invalidPhoneReg" class="error">Invalid phone format</span>
            </div>

            <div class="input-group">
              <input type="password"
                     id="password-register"
                     v-model="user.password"
                     @input="validatePassword"
                     placeholder="Password">
              <label for="password-register">Password</label>
              <span v-if="invalidPasswordReg" class="error">Password too short</span>
            </div>

            <button class="submit-btn"
                    @click="createUser()"
                    :disabled="invalidNameReg || invalidLastNameReg || invalidEmailReg || invalidPhoneReg || invalidPasswordReg || isAnyFieldEmptyReg()">
              <span>Sign Up</span>
            </button>

            <span v-if="registerError" class="error">Email already exists</span>
          </div>

          <div class="form-footer">
            <a href="#" @click="toggleForm">Sign In</a>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import 'boxicons/css/boxicons.min.css';
import * as userAPI from '@/services/userAPI';
import { mask } from 'vue-the-mask';

export default {
  directives: {
    mask,
  },
  created() {
    this.disableAutofill();
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
      },
      invalidNameReg: false,
      invalidLastNameReg: false,
      invalidEmailReg: false,
      invalidPhoneReg: false,
      invalidPasswordReg: false,
      responsePass: [],
      responseRecPass: [],
      invalidEmail: false,
      invalidPassword: false,
      loginError: false,
      registerError: false,
      showLogin: true,
      showRegister: false,
      isTransitioning: false,
      isFluidExpanded: false,
      isAnimating: false,
    };
  },
  methods: {
    disableAutofill() {
      const inputFields = document.querySelectorAll('input');

      inputFields.forEach(input => {
        input.setAttribute('autocomplete', 'off');
      });
    },
    async login() {
            if (!this.invalidEmailReg && !this.invalidPasswordReg) {
                this.response = await userAPI.login(this.user);
                const recoveryUser = {email: this.user.email, reservePassword: this.user.password}
                this.responseRecPass = await userAPI.loginViaRecovery(recoveryUser);
                if (this.response != null) {
                    localStorage.token = this.response.token;
                    this.$router.push('/');
                    localStorage.setItem('isAdmin', 'true');
                } else if (this.responseRecPass != null){
                    localStorage.token = this.responseRecPass.data.token;
                    this.$router.push('/');
                    localStorage.setItem('isAdmin', 'true');
                } else {
                    this.showLoginError();
                }
            }
    },
    async createUser() {
      if (!this.invalidNameReg && !this.invalidLastNameReg && !this.invalidEmailReg && !this.invalidPhoneReg && !this.invalidPasswordReg) {
        if (await userAPI.registration(this.user)) {
            this.$router.push('/');
      } else {
        this.showRegError();
      }
    }
    },
    validateName() {
      const namePattern = /^[a-zA-Z'\s]*$/;
      this.invalidNameReg = !namePattern.test(this.user.firstName);
    },
    validateLastName() {
      const lastNamePattern = /^[a-zA-Z'\s]*$/;
      this.invalidLastNameReg = !lastNamePattern.test(this.user.lastName);
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.invalidEmailReg = !emailPattern.test(this.user.email);
    },
    validatePhoneNumber() {
      const phonePattern = /^\+\d{2}-\d{4}-\d{4}$/;
      this.invalidPhoneReg = !phonePattern.test(this.user.phoneNumber);
    },
    validatePassword() {
      this.invalidPasswordReg = this.user.password.length < 8;
    },
    isAnyFieldEmptyReg() {
      return !this.user.email || !this.user.password || !this.user.phoneNumber || !this.user.firstName || !this.user.lastName;
    },
    isAnyFieldEmptyLog() {
            return !this.user.email || !this.user.password;
    },
    showLoginError() {
            this.loginError = true;
            setTimeout(() => {
                this.loginError = false;
            }, 10000);
    },
    showRegError() {
            this.registerError = true;
            setTimeout(() => {
                this.registerError = false;
            }, 10000);
    },
    toggleForm() {
      this.showLogin = !this.showLogin;
      this.showRegister = !this.showRegister;
    }
  },
};

</script>

<style>
:root {
  --primary-color: #ff4b2b;
  --secondary-color: #ff416c;
  --text-color: #fff;
  --error-color: #ff6b6b;
  --input-bg: rgba(255, 75, 43, 0.1);
  --button-bg: rgba(255, 65, 108, 0.2);
}

.auth-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 1000px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-section {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.form-title h1 {
  font-size: 3rem;
  color: var(--text-color);
  text-align: center;
  line-height: 1.2;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.name-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 1rem;
  background: var(--input-bg);
  border: none;
  border-radius: 10px;
  color: var(--text-color);
  font-size: 1rem;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

label {
  top: -0.5rem;
  left: 1rem;
  color: var(--text-color);
  font-size: 0.9rem;
}

.error {
  color: var(--error-color);
  font-size: 0.8rem;
}

.submit-btn {
  background: var(--button-bg);
  color: var(--text-color);
  border: none;
  padding: 1rem;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: var(--primary-color);
}

.form-footer {
  display: flex;
  justify-content: space-around;
  gap: 100px;
  margin-top: 20px;
}

.form-footer a {
  color: var(--text-color);
  text-decoration: underline;
}

.fluid-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.form-section {
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .name-group {
    grid-template-columns: 1fr;
  }

  .auth-container {
    margin: 1rem;
  }
}
</style>

