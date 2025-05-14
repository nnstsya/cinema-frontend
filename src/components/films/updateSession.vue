<template>
  <div class="session-update-page">
    <div class="session-update-container">
      <h1 class="title">Update Session</h1>

      <div class="form-grid">
        <div class="form-group">
          <label for="movie-select">Movie</label>
          <div class="select-wrapper">
            <select v-model="session.movieId" id="movie-select" required>
              <option value="" disabled>Select a movie</option>
              <option v-for="movie in movies" :key="movie._id" :value="movie._id">
                {{ movie.title }}
              </option>
            </select>
            <span class="select-icon">▼</span>
          </div>
        </div>

        <div class="form-group">
          <label for="cinema-select">Cinema</label>
          <div class="select-wrapper">
            <select v-model="session.cinemaId" id="cinema-select" required>
              <option value="" disabled>Select a cinema</option>
              <option v-for="cinema in cinemas" :key="cinema._id" :value="cinema._id">
                {{ cinema.name }}
              </option>
            </select>
            <span class="select-icon">▼</span>
          </div>
        </div>

        <div class="form-group">
          <label for="date-session">Date</label>
          <input
              type="date"
              v-model="session.date"
              id="date-session"
              @input="validateDate"
              required
          >
          <div v-if="invalidDate" class="error-message">
            Date must be between May 21, 2000, and May 21, 2030
          </div>
        </div>

        <div class="form-group">
          <label for="price-session">Price ($)</label>
          <input
              type="number"
              v-model="session.price"
              id="price-session"
              @input="validatePrice"
              required
          >
          <div v-if="invalidPrice" class="error-message">
            Valid price is required
          </div>
        </div>

        <div class="form-group">
          <label for="discount-session">Discount (%)</label>
          <input
              type="number"
              v-model="session.discount"
              id="discount-session"
              @input="validateDiscount"
              required
          >
          <div v-if="invalidDiscount" class="error-message">
            Valid discount is required
          </div>
        </div>

        <div class="form-group full-width">
          <label for="places-session">Available Seats</label>
          <input
              type="number"
              v-model="session.quantityAvailablePlaces"
              id="places-session"
              @input="validateQuantityAvailablePlaces"
              required
          >
          <div v-if="invalidQuantityAvailablePlaces" class="error-message">
            Valid quantity of available places is required
          </div>
        </div>
      </div>

      <div class="action-container">
        <button
            type="submit"
            class="update-button"
            @click="updateSession()"
            :disabled="isAnyFieldEmpty() || invalidDate || invalidPrice || invalidDiscount || invalidQuantityAvailablePlaces"
        >
          <span>Update Session</span>
          <i class="icon">→</i>
        </button>
        <div v-if="isAnyFieldEmpty()" class="error-message global-error">
          Please complete all required fields
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
        validateDate() {
            const inputDate = new Date(this.session.date);

            const minDate = new Date('2000-05-21');
            const maxDate = new Date('2030-05-21');

            this.invalidDate = inputDate < minDate || inputDate > maxDate;
        },
        isAnyFieldEmpty() {
            return !this.session.movieId || !this.session.cinemaId || !this.session.time || !this.session.date
        },
        async updateSession() {
            sessionAPI.updateSession(this.session,this.$route.params.id);
            this.$router.push("/session/"+this.$route.params.id);
        },
        async getSession() {
            this.session = await sessionAPI.getSession(this.$route.params.id);
        }
    },
    mounted() {
         this.getMovies();
         this.getCinemas();
         this.getSession();
    },
};
</script>

<style scoped>
.session-update-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
  font-family: 'Inter', sans-serif;
}

.session-update-container {
  width: 100%;
  max-width: 800px;
  background: rgba(30, 30, 46, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: white;
  text-align: center;
  background: linear-gradient(90deg, #ff6b6b, #ff8e53);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 30px;
}

.form-group {
  position: relative;
}

.full-width {
  grid-column: 1 / -1;
}

label {
  display: block;
  color: #e3e3e3;
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 500;
}

input, select {
  width: 100%;
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(15, 15, 25, 0.5);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #ff6b6b;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
}

input[type="date"], input[type="time"] {
  color-scheme: dark;
}

.select-wrapper {
  position: relative;
}

.select-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff6b6b;
  pointer-events: none;
  font-size: 12px;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 5px;
}

.global-error {
  text-align: center;
  margin-top: 10px;
}

.action-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.update-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(90deg, #ff6b6b, #ff8e53);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 14px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.update-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.update-button:active:not(:disabled) {
  transform: translateY(0);
}

.update-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: linear-gradient(90deg, #888, #999);
}

.icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .session-update-container {
    padding: 30px 20px;
  }

  .title {
    font-size: 2rem;
  }
}
</style>