<template>
  <div class="movie-details-page">
    <div class="backdrop-overlay" :style="{ backgroundImage: `url(${this.movie.photoUrl})` }"></div>

    <div class="content-container">
      <div class="movie-header">
        <div class="poster-container">
          <img :src="this.movie.photoUrl" class="movie-poster" alt="Movie Poster">
          <div class="rating-badge">
            <span class="rating-number">{{ this.movie.rating }}</span>
            <span class="rating-max">/10</span>
          </div>
        </div>

        <div class="movie-info">
          <h1 class="movie-title">{{ this.movie.title }}</h1>

          <div class="movie-meta">
            <div class="meta-item year">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ this.movie.year }}
            </div>

            <div class="meta-item duration">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ this.movie.duration }}
            </div>

            <div class="meta-item language">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5H15M9 3V5M10.0482 14.5C8.52083 12.9178 7.28073 11.0565 6.41187 9M12.5 18H19.5M11 21L16 11L21 21M12.7511 5C11.7831 10.7702 8.06969 15.6095 3 18.129" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ this.movie.language }}
            </div>
          </div>

          <div class="genre-tags">
            <span v-for="(genre, index) in movie.genres" :key="index" class="genre-tag">
              {{ genre }}
            </span>
          </div>

          <div class="director">
            <span class="label">Director:</span>
            <span class="value">{{ this.movie.director }}</span>
          </div>

          <div class="description">
            <h3 class="section-title">About</h3>
            <p class="description-text">{{ this.movie.description }}</p>
          </div>

          <div class="cast">
            <h3 class="section-title">Cast</h3>
            <div class="cast-list">
              <div v-for="(actor, index) in this.movie.cast" :key="index" class="cast-member">
                <img :src="actor.photo" :alt="actor.name" class="cast-photo">
                <span class="cast-name">{{ actor.name }}</span>
                <span class="cast-character">as {{ actor.character }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="screenings-section">
        <h2 class="screenings-title">Screenings</h2>
        <div class="sessions-container">
          <div v-for="(ses, index) in this.session" :key="index" class="session-card">
            <div class="session-details">
              <div class="session-time">{{ formatDate(ses.date) }}</div>
              <div class="session-venue">{{ ses?.venue }}</div>
              <div class="session-seats">{{ ses?.availableSeats }} seats available</div>
            </div>
            <router-link :to="{ name: 'SessionDetails', params: {id: ses._id}}" class="book-button">
              Book Now
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="isAdmin()" class="admin-controls">
        <router-link :to="{name: 'UpdateMovie', params: {id: movie._id}}" class="admin-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13M10 18L15 18M18.5 2.5C19.3284 2.5 20 3.17157 20 4C20 4.82843 19.3284 5.5 18.5 5.5M18.5 2.5C17.6716 2.5 17 3.17157 17 4C17 4.82843 17.6716 5.5 18.5 5.5M18.5 2.5L13.5 7.5L13 11L16.5 10.5L21.5 5.5C22.3284 5.5 23 4.82843 23 4C23 3.17157 22.3284 2.5 21.5 2.5C20.6716 2.5 20 3.17157 20 4C20 4.82843 20.6716 5.5 21.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Edit Movie
        </router-link>
        <button class="admin-button delete-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Delete Movie
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as movieAPI from '@/services/movieAPI';
import * as sessionAPI from '@/services/sessionAPI';

export default {
  data() {
    return {
      movie: {},
      response: [],
      session: []
    };
  },
  methods: {
    async getMovie() {
      this.response = await movieAPI.getMovie(this.$route.params.id);
      if (this.response != null) {
        this.movie = this.response;
      }
    },
    async getAllSession() {
      const allSessions = await sessionAPI.getAllSessions();
      if (allSessions != null) {
        this.session = allSessions.filter(session => session.movieId === this.movie._id);
      }
    },
    isAdmin() {
      return localStorage.getItem("isAdmin");
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    }
  },
  created() {
    this.getMovie();
    this.getAllSession();
  }
};
</script>

<style scoped>
.movie-details-page {
  min-height: 100vh;
  color: white;
  position: relative;
}

.backdrop-overlay {
  position: fixed;
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
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.movie-header {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
}

.poster-container {
  position: relative;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  width: 320px;
}

.movie-poster {
  width: 100%;
  height: auto;
  display: block;
}

.rating-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #ff6b6b;
  border-radius: 12px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
}

.rating-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6b6b;
}

.rating-max {
  font-size: 0.875rem;
  color: #aaa;
  margin-left: 2px;
}

.trailer-button {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background: rgba(255, 107, 107, 0.9);
  color: white;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.trailer-button:hover {
  background: #ff6b6b;
  transform: translateY(-2px);
}

.movie-info {
  flex: 1;
}

.movie-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  line-height: 1.2;
  background: linear-gradient(90deg, #ff6b6b, #ffb347);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.movie-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  color: #ccc;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.1rem;
  color: #eee;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.genre-tag {
  background: rgba(255, 107, 107, 0.15);
  border: 1px solid rgba(255, 107, 107, 0.3);
  color: #ffb347;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
}

.director {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.director .label {
  color: #aaa;
  margin-right: 0.5rem;
}

.director .value {
  color: white;
  font-weight: 500;
}

.description {
  margin-bottom: 2.5rem;
}

.section-title {
  color: #ffb347;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #ffb347);
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ddd;
  margin: 0;
}

.cast-list {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.cast-list::-webkit-scrollbar {
  height: 8px;
}

.cast-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.cast-list::-webkit-scrollbar-thumb {
  background: rgba(255, 107, 107, 0.5);
  border-radius: 10px;
}

.cast-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 107, 107, 0.8);
}

.cast-member {
  flex: 0 0 auto;
  width: 120px;
  text-align: center;
}

.cast-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.75rem;
  border: 2px solid rgba(255, 107, 107, 0.3);
}

.cast-name {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: white;
}

.cast-character {
  display: block;
  font-size: 0.8rem;
  color: #aaa;
}

.screenings-section {
  margin-bottom: 3rem;
}

.screenings-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.sessions-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.session-card {
  background: rgba(30, 30, 40, 0.7);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.session-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 107, 107, 0.3);
}

.session-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.date-day {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.date-month {
  font-size: 1rem;
  color: #ffb347;
  font-weight: 600;
}

.session-details {
  margin-bottom: 1.25rem;
}

.session-time {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.session-venue {
  font-size: 0.9rem;
  color: #ddd;
  margin-bottom: 0.5rem;
}

.session-seats {
  font-size: 0.85rem;
  color: #ff6b6b;
}

.book-button {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.5);
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  text-decoration: none;
  margin-top: auto;
}

.book-button:hover {
  background: rgba(255, 107, 107, 0.9);
  color: white;
}

.admin-controls {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.admin-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
}

.admin-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.delete-button {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
}

.delete-button:hover {
  background: rgba(255, 107, 107, 0.2);
}

@media (max-width: 1024px) {
  .movie-header {
    flex-direction: column;
    gap: 2rem;
  }

  .poster-container {
    width: 280px;
    margin: 0 auto;
  }

  .movie-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .content-container {
    padding: 1.5rem;
  }

  .movie-meta {
    flex-direction: column;
    gap: 1rem;
  }

  .sessions-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .movie-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .cast-member {
    width: 100px;
  }

  .cast-photo {
    width: 80px;
    height: 80px;
  }
}
</style>