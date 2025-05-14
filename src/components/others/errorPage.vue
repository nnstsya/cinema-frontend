<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <div class="circle"></div>
        <div class="line-1"></div>
        <div class="line-2"></div>
      </div>
      <h1 class="error-title">Oops!</h1>
      <p class="error-message">Something went wrong</p>
      <button class="error-button" @click="goBack">Go Back</button>
    </div>
    <div class="particles">
      <div v-for="n in 20" :key="n" class="particle"
           :style="{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 5}s`,
             animationDuration: `${5 + Math.random() * 10}s`
           }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  methods: {
    goBack() {
      window.history.back();
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.error-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  overflow: hidden;
}

.error-content {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem 4rem;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 90%;
  width: 500px;
  animation: fadeIn 1s ease-out;
}

.error-icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
}

.circle {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #fff;
  left: 0;
  top: 0;
}

.line-1, .line-2 {
  position: absolute;
  width: 8px;
  height: 55px;
  background: #fff;
  border-radius: 4px;
  top: 22px;
  left: 46px;
  transform: rotate(45deg);
}

.line-2 {
  transform: rotate(-45deg);
}

.error-title {
  color: #fff;
  font-size: 3rem;
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: 1px;
}

.error-message {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-bottom: 30px;
  font-weight: 300;
}

.error-button {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.error-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .error-content {
    padding: 2rem;
    width: 85%;
  }

  .error-title {
    font-size: 2.5rem;
  }

  .error-icon {
    transform: scale(0.8);
  }
}
</style>