<template>
  <div class="profile-page">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h1 class="title">Update Profile</h1>
          <div class="avatar">
            <div class="avatar-placeholder">
              {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                  type="text"
                  id="firstName"
                  v-model="user.firstName"
                  @input="validateName()"
                  autocomplete="given-name"
              >
              <div v-if="invalidNameReg" class="error-message">
                Name can consist only of letters, spaces, '-' or '
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                  type="text"
                  id="lastName"
                  v-model="user.lastName"
                  @input="validateLastName()"
                  autocomplete="family-name"
              >
              <div v-if="invalidLastNameReg" class="error-message">
                Last name can consist only of letters, spaces, '-' or '
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                  type="email"
                  id="email"
                  v-model="user.email"
                  disabled
                  class="disabled"
              >
            </div>

            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input
                  type="text"
                  id="phoneNumber"
                  v-model="user.phoneNumber"
                  v-mask="'+##-####-####'"
                  @input="validatePhoneNumber()"
                  autocomplete="tel"
              >
              <div v-if="invalidPhoneReg" class="error-message">
                Please enter a valid phone number +12-3456-7890
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button
                class="update-button"
                type="submit"
                @click="updateUser()"
                :disabled="!changes || invalidNameReg || invalidLastNameReg || invalidPhoneReg"
                :class="{ 'button-disabled': !changes || invalidNameReg || invalidLastNameReg || invalidPhoneReg }"
            >
              <span class="button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </span>
              Update Profile
            </button>
            <router-link :to="'/profile/dashboard'" class="admin-button">
              <button class="update-button">Dashboard</button>
            </router-link>
          </div>
        </div>

        <div class="decoration">
          <div class="decoration-circle decoration-circle-1"></div>
          <div class="decoration-circle decoration-circle-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import * as userAPI from '@/services/userAPI'

export default {
    directives: {
        mask
    },
    data () {
        return{
            user: {
                email: '',
                phoneNumber: '',
                firstName: '',
                lastName: '',
            },
                email: '',
                password: '',
                phoneNumber: '',
                firstName: '',
                lastName: '',
            changes: false,
            invalidNameReg: false,
            invalidLastNameReg: false,
            invalidPhoneReg: false,
        };
    },
    methods: {
        async updateUser(){
            await userAPI.updateUser(localStorage.getItem("token"),this.user);
        },
        isChanges() {
                if (this.user.phoneNumber !== this.phoneNumber || this.firstName !== this.user.firstName || this.user.lastName !== this.lastName) {
                    this.changes = true;
                    return;
            }
            this.changes = false;
        },
        validateName() {
            const namePattern = /^[a-zA-Z'\s]*$/;
            this.invalidNameReg = !namePattern.test(this.user.firstName);
            this.isChanges();
        },
        validateLastName() {
            const lastNamePattern = /^[a-zA-Z'\s]*$/;
            this.invalidLastNameReg = !lastNamePattern.test(this.user.lastName);
            this.isChanges();
        },
        validatePhoneNumber() {
            const phonePattern = /^\+\d{2}-\d{4}-\d{4}$/;
            this.invalidPhoneReg = !phonePattern.test(this.user.phoneNumber);
            this.isChanges();
        },
    },
    async mounted() {
        const token = localStorage.getItem("token")
        if (token){
            const response = await userAPI.getUserByToken(token);
            if (response != null) {
                this.user = response.user;
                this.firstName = response.user.firstName;
                this.lastName = response.user.lastName;
                this.phoneNumber = response.user.phoneNumber;
                this.password = response.user.password;
            }
        } else {
            this.$router.push("/authentication");
        }
    }
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
}

.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.card {
  background: #1e1e1e;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.card-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
}

.title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.card-body {
  padding: 40px 30px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.form-group {
  flex: 1;
  position: relative;
}

label {
  display: block;
  color: #f5f5f5;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
}

input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 14px 16px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #ff6b6b;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
}

input.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 8px;
  position: absolute;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 40px;
}

.update-button {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.update-button:hover:not(.button-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.4);
}

.update-button:active:not(.button-disabled) {
  transform: translateY(0);
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #777;
  box-shadow: none;
}

.button-icon {
  display: flex;
  align-items: center;
}

.decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
}

.decoration-circle-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
  bottom: -150px;
  right: -100px;
}

.decoration-circle-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 142, 83, 0.08) 0%, transparent 70%);
  top: -100px;
  left: -50px;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 25px;
  }

  .card-header {
    padding: 25px;
  }

  .card-body {
    padding: 30px 20px;
  }

  .title {
    font-size: 24px;
  }

  .form-actions {
    justify-content: center;
  }
}
</style>