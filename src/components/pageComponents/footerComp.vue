<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-column">
        <div class="brand-section">
          <h2 class="brand-title">StarCinema</h2>
          <h3 class="section-title">Your guide to the movie universe</h3>
          <div class="action-button">
            <a href="/authentication" class="join-button">Become a member</a>
          </div>
        </div>

        <div class="contact-section">
          <h3 class="section-title">Opening Hours</h3>
          <div class="hours-grid">
            <div class="day">Mon - Fri:</div>
            <div class="time">10:00 AM - 11:00 PM</div>
            <div class="day">Sat - Sun:</div>
            <div class="time">10:00 AM - 12:00 AM</div>
          </div>
        </div>
      </div>

      <div class="footer-column">
        <div class="menu-section">
          <h3 class="section-title">Navigate</h3>
          <nav class="footer-nav">
            <a href="/" class="nav-link">Home</a>
            <a href="/profile" class="nav-link">My Account</a>
            <a href="/posters" class="nav-link">Movies</a>
          </nav>
        </div>

        <div class="social-section">
          <h3 class="section-title">Connect With Us</h3>
          <div class="social-links">
            <a href="https://x.com/" class="social-link">
              <img src="@/assets/twitter.png" alt="Twitter" class="social-icon">
            </a>
            <a href="https://www.instagram.com" class="social-link">
              <img src="@/assets/instagram.png" alt="Instagram" class="social-icon">
            </a>
            <a href="https://www.facebook.com" class="social-link">
              <img src="@/assets/facebook.png" alt="Facebook" class="social-icon">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copyright">© 2025 StarCinema. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #141414;
  color: #f8f8f8;
  padding: 3rem 0 1rem;
  position: relative;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 4rem;
}

.footer-column {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.brand-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.brand-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #ff6b6b, #ffb347);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.join-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: white;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.join-button:hover {
  background-color: #ff8585;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #ffb347);
}

.hours-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1.5rem;
}

.day {
  font-weight: 500;
  color: #c8c8c8;
}

.time {
  color: #a0a0a0;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-link {
  color: #c8c8c8;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 1rem;
  position: relative;
  width: fit-content;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -3px;
  left: 0;
  background-color: #ff6b6b;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link:hover::after {
  width: 100%;
}

.social-links {
  display: flex;
  gap: 1.25rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.social-icon {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.copyright {
  color: #777;
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 3rem;
  }

  .footer-column {
    gap: 2rem;
  }
}
</style>
<script setup lang="ts">
</script>