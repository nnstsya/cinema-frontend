<template>
  <div class="session-creation-page">
    <div class="backdrop-overlay"></div>

    <div class="content-container">
      <div class="page-header">
        <h1 class="page-title">Create Movie Session</h1>
        <p class="page-subtitle">Schedule a screening for your audience</p>
      </div>

      <div class="form-card">
        <div class="form-grid">
          <div class="form-group span-half">
            <label for="movie-select" class="form-label">Movie</label>
            <select v-model="session.movieId" class="form-select" required>
              <option value="" disabled>Select a movie</option>
              <option v-for="movie in movies" :key="movie._id" :value="movie._id">
                {{ movie.title }}
              </option>
            </select>
          </div>

          <div class="form-group span-half">
            <label for="cinema-select" class="form-label">Cinema</label>
            <select v-model="session.cinemaId" class="form-select" required>
              <option value="" disabled>Select a cinema</option>
              <option v-for="cinema in cinemas" :key="cinema._id" :value="cinema._id">
                {{ cinema.name }}
              </option>
            </select>
          </div>

          <div class="form-group span-half">
            <label for="date-session" class="form-label">Date</label>
            <div class="input-with-icon">
              <input type="date" v-model="session.date" id="date-session" class="form-input" @input="validateDate" required>
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div v-if="invalidDate" class="error-message">Date must be between May 21, 2000, and May 21, 2030</div>
          </div>

          <div class="form-group span-half">
            <label for="time-session" class="form-label">Time</label>
            <div class="input-with-icon">
              <input type="time" v-model="session.time" id="time-session" class="form-input" @input="validateTime" required>
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <div class="form-group span-half">
            <label for="price-session" class="form-label">Ticket Price ($)</label>
            <div class="input-with-icon">
              <input type="number" v-model="session.price" id="price-session" class="form-input" @input="validatePrice" required>
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div v-if="invalidPrice" class="error-message">Price must be greater than 0</div>
          </div>

          <div class="form-group span-half">
            <label for="discount-session" class="form-label">Discount (%)</label>
            <div class="input-with-icon">
              <input type="number" v-model="session.discount" id="discount-session" class="form-input" @input="validateDiscount" required>
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9l14 6M9 5l6 14M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div v-if="invalidDiscount" class="error-message">Discount must be greater than 0</div>
          </div>

          <div class="form-group span-full">
            <label for="places-session" class="form-label">Available Seats</label>
            <div class="input-with-icon">
              <input type="number" v-model="session.quantityAvailablePlaces" id="places-session" class="form-input" @input="validateQuantityAvailablePlaces" required>
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div v-if="invalidQuantityAvailablePlaces" class="error-message">Number of seats must be greater than 0</div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="create-button" @click="createSession" :disabled="isAnyFieldEmpty() || invalidDate || invalidPrice || invalidDiscount || invalidQuantityAvailablePlaces">
            <span>Create Session</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div v-if="isAnyFieldEmpty()" class="error-message text-center">Please fill in all required fields</div>
        </div>
      </div>

      <div class="preview-card" v-if="!isAnyFieldEmpty()">
        <h3 class="preview-title">Session Preview</h3>
        <div class="preview-info-item">
          <span class="preview-label">Ticket Price</span>
          <span class="preview-value">${{ session.price }} <span class="discount-badge" v-if="session.discount > 0">-{{ session.discount }}%</span></span>
        </div>

        <div class="preview-info-item">
          <span class="preview-label">Available Seats</span>
          <span class="preview-value">{{ session.quantityAvailablePlaces }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as movieAPI from '@/services/movieAPI';
import * as cinemaAPI from '@/services/cinemaAPI';
import * as sessionAPI from '@/services/sessionAPI';

export default {
  data() {
    return {
      session: {
        movieId: '',
        cinemaId: '',
        date: '',
        time: '',
        price: '',
        discount: '',
        quantityAvailablePlaces: '',
      },
      cinemas: [],
      movies: [],
      invalidDate: false,
      invalidPrice: false,
      invalidDiscount: false,
      invalidQuantityAvailablePlaces: false,
    };
  },
  methods: {
    async getMovies() {
      this.movies = await movieAPI.getAllMovies();
    },
    async getCinemas() {
      this.cinemas = await cinemaAPI.getAllCinemas();
    },
    validatePrice() {
      this.invalidPrice = this.session.price <= 0;
    },
    validateDiscount() {
      this.invalidDiscount = this.session.discount <= 0;
    },
    validateQuantityAvailablePlaces() {
      this.invalidQuantityAvailablePlaces = this.session.quantityAvailablePlaces <= 0;
    },
    disabledDate(date) {
      const minDate = new Date('2000-05-21');
      const maxDate = new Date('2030-05-21');
      return date < minDate || date > maxDate;
    },
    isAnyFieldEmpty() {
      return !this.session.movieId || !this.session.cinemaId || !this.session.time || !this.session.date;
    },
    async createSession() {
      sessionAPI.createSession(this.session);
      this.$router.push("/");
    },
  },
  mounted() {
    this.getMovies();
    this.getCinemas();
  },
};
</script>

<style scoped>
.session-creation-page {
  min-height: 100vh;
  color: white;
  position: relative;
  font-family: 'Poppins', sans-serif;
  padding-bottom: 60px;
}

.backdrop-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.15) saturate(1.2);
  z-index: -1;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 0.5rem;
  background: linear-gradient(90deg, #ff6b6b, #ffb347);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin: 0;
}

.form-card {
  background: rgba(30, 30, 40, 0.8);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.span-half {
  grid-column: span 1;
}

.span-full {
  grid-column: span 2;
}

.form-group {
  position: relative;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ddd;
}

.form-input, .form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #ff6b6b;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.3);
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
}

.form-select option {
  background-color: #1e1e28;
  color: white;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.text-center {
  text-align: center;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(90deg, #ff6b6b, #ffb347);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  min-width: 250px;
}

.create-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.create-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.create-button svg {
  transition: transform 0.3s ease;
}

.create-button:hover:not(:disabled) svg {
  transform: translateX(4px);
}

.preview-card {
  background: rgba(30, 30, 40, 0.7);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.preview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.preview-title {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #ffb347;
  position: relative;
}

.preview-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #ffb347);
}

.preview-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preview-movie {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.preview-poster {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.preview-movie-details h4 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: white;
}

.preview-duration {
  margin: 0;
  color: #ccc;
  font-size: 0.9rem;
}

.preview-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.preview-info-item {
  display: flex;
  flex-direction: column;
}

.preview-label {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 0.3rem;
}

.preview-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
}

.discount-badge {
  display: inline-block;
  font-size: 0.75rem;
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .content-container {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .span-half, .span-full {
    grid-column: span 1;
  }

  .preview-info-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .create-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .preview-movie {
    flex-direction: column;
    align-items: flex-start;
  }

  .preview-poster {
    width: 120px;
    height: 180px;
  }
}
</style>