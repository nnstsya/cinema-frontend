<template>
  <div class="movie-session">
    <div class="backdrop-overlay"></div>
    <div class="session-card">
      <div class="card-header">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <div class="session-info">
          <div class="date-time">
            <span class="date">{{ formattedDate }}</span>
            <span class="time-separator">•</span>
            <span class="time">{{ session.time }}</span>
          </div>
        </div>
      </div>

      <div class="card-content">
        <div class="price-section">
          <div class="price" :class="{ 'has-discount': session.discount > 0 }">
            <span class="price-value">{{ session.price }}$</span>
            <span class="discount-badge" v-if="session.discount > 0">-{{ session.discount }}%</span>
          </div>
        </div>

        <div class="availability">
          <span class="availability-count">{{ session.quantityAvailablePlaces }}</span>
          <span class="availability-label">seats available</span>
        </div>

        <div class="action-buttons">
          <router-link :to="{name: 'BuyTicket', params: {id: session._id}}" class="btn-primary">
            Buy Tickets
            <i class="bx bx-right-arrow-alt"></i>
          </router-link>

          <router-link
              v-if="isAdmin()"
              :to="{name: 'UpdateSession', params: {id: session._id}}"
              class="btn-secondary">
            Update Session
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as sessionAPI from '@/services/sessionAPI';
import * as movieAPI from '@/services/movieAPI';

export default {
  data() {
    return {
      session: {},
      movie: {},
      response: [],
    };
  },
  computed: {
    formattedDate() {
      if (!this.session.date) return '';
      const date = new Date(this.session.date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(2);
      return `${day}.${month}.${year}`;
    },
  },
  methods: {
    async getSession() {
      this.response = await sessionAPI.getSession(this.$route.params.id);
      if (this.response != null) {
        this.session = this.response;
        this.movie = await movieAPI.getMovie(this.response.movieId);
      }
    },
    isAdmin() {
      return localStorage.getItem('isAdmin');
    },
  },
  mounted() {
    this.getSession();
  },
};
</script>

<style scoped>
.movie-session {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #2a0845 0%, #6441a5 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.backdrop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  filter: blur(8px);
  z-index: 1;
}

.session-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 600px;
  background: rgba(33, 17, 52, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.session-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card-header {
  margin-bottom: 2rem;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  background: linear-gradient(to right, #ffffff, #d4b9ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.session-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.date-time {
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-separator {
  color: rgba(255, 255, 255, 0.5);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.price {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.price-value {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.has-discount .price-value {
  text-decoration: none;
}

.discount-badge {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 1rem;
}

.availability {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.availability-count {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ebd2a8;
}

.availability-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  box-shadow: 0 4px 10px rgba(106, 17, 203, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #7a21db, #3585fc);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(106, 17, 203, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .session-card {
    padding: 1.5rem;
  }

  .movie-title {
    font-size: 2rem;
  }

  .date-time {
    font-size: 1rem;
  }

  .price-value {
    font-size: 1.5rem;
  }

  .discount-badge {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
  }
}
</style>
