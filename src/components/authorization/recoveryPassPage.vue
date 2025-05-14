<template>
  <div class="recovery-wrapper">
    <div class="recovery-container">
      <div class="recovery-content">
        <div class="recovery-header">
          <h1>RECOVER PASSWORD</h1>
        </div>
        <div class="recovery-form">
          <div class="input-wrapper">
            <input
              type="email"
              id="email-recovery"
              v-model="user.email"
              @input="validateEmail"
              placeholder="Please enter email"
              autocomplete="new-email">
            <label for="email-recovery">Email</label>
            <span v-if="invalidEmail" class="error">Please enter a valid email address</span>
          </div>
          <button
            class="recovery-button"
            @click="createPassword()"
            :disabled="invalidEmail || !user.email">
            <span>Recover Password</span>
            <i class="bx bx-arrow-back"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as userAPI from '@/services/userAPI'

export default {
    data() {
        return {
            user: { email: '' },
            invalidEmail: false,
        };
    },
    methods: {
        async createPassword() {
            await userAPI.createRecoveryPassword(this.user.email);
            this.$router.push("/authentication")
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.invalidEmail = !emailPattern.test(this.user.email);
        },
    },
};
</script>

<style>
.recovery-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #FF6B4A, #FF8264);
  padding: 2rem;
}

.recovery-container {
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  padding: 3rem;
  gap: 2rem;
}

.recovery-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.recovery-header h1 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.2;
  text-align: center;
}

.recovery-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-wrapper input {
  width: 100%;
  padding: 1.2rem;
  background: rgba(255, 107, 74, 0.15);
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  color: #fff;
}

.input-wrapper label {
  position: absolute;
  top: -0.8rem;
  left: 1rem;
  color: #fff;
  font-size: 1rem;
}

.error {
  color: #FFD700;
  font-size: 0.9rem;
}

.recovery-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(255, 130, 100, 0.2);
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.recovery-button:hover:not(:disabled) {
  background: rgba(255, 107, 74, 0.4);
  transform: translateY(-2px);
}

.recovery-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 968px) {
  .recovery-container {
    flex-direction: column;
  }

  .recovery-header h1 {
    font-size: 2.5rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .recovery-container {
    padding: 1.5rem;
  }

  .recovery-header h1 {
    font-size: 2rem;
  }

  .input-wrapper input {
    font-size: 1rem;
  }
}
</style>
