<template>
  <div class="movie-showcase">
    <div class="header-container">
      <h2 class="showcase-title">Featured Films</h2>
      <div class="navigation-controls">
        <button class="nav-button prev-button" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="nav-button next-button" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="movies-showcase">
      <div v-for="(movie, index) in this.response" :key="index" class="movie-item">
        <div class="movie-poster-wrapper">
          <img :src="movie.photoUrl" :alt="movie.title" class="movie-poster">
          <div class="hover-details">
            <div class="movie-rating">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="rating-star">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ movie.rating || '8.' + (index + 3) }}</span>
            </div>

            <div class="hover-actions">
              <a :href="movie.trailerLink" target="_blank" rel="noopener noreferrer">
                <button class="play-button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
                  </svg>
                  Play Now
                </button>
              </a>
            </div>
          </div>
        </div>

        <div class="movie-details">
          <router-link :to="{ name: 'MovieDetails', params: {id: movie._id}}" class="movie-link">
            {{ movie.title }}
          </router-link>

          <div class="movie-info">
            <span class="movie-year">{{ movie.year || '20' + (18 + index) }}</span>
            <span class="separator">•</span>
            <span class="movie-duration">{{ movie.duration || (120 + index * 10) + ' min' }}</span>
          </div>

          <div class="genre-tags">
            <span v-for="(genre, idx) in movie.genres"
                  :key="idx"
                  class="genre-pill"
                  :class="getGenreClass(genre)">
              {{ genre }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as movieAPI from '@/services/movieAPI'

export default {
  data() {
    return {
      response: [],
      genreColors: {
        'Action': 'action',
        'Crime': 'crime',
        'Drama': 'drama',
        'Adventure': 'adventure',
        'Sci-Fi': 'scifi',
        'Thriller': 'thriller',
        'Comedy': 'comedy',
        'Romance': 'romance',
        'Horror': 'horror',
        'Fantasy': 'fantasy'
      },
    };
  },
  methods: {
    async getAllMovies() {
      try {
        this.response = await movieAPI.getAllMovies();
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    getGenreClass(genre) {
      return this.genreColors[genre] || 'default';
    }
  },
  mounted() {
    this.getAllMovies();
  },
};

</script>

<style scoped>
.movie-showcase {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: #111111;
  color: #f5f5f5;
  position: relative;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.showcase-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(238, 9, 121, 0.2);
}

.showcase-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  border-radius: 2px;
}

.navigation-controls {
  display: flex;
  gap: 12px;
}

.nav-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: rgba(238, 9, 121, 0.2);
  border-color: rgba(238, 9, 121, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(238, 9, 121, 0.15);
}

.movies-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.movie-item {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-color: #1a1a1a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.movie-item:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.movie-poster-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 2/3;
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-item:hover .movie-poster {
  transform: scale(1.08);
}

.hover-details {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-item:hover .hover-details {
  opacity: 1;
}

.movie-rating {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  border: 1px solid rgba(255, 106, 0, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.rating-star {
  color: #ff6a00;
}

.hover-actions {
  display: flex;
  gap: 10px;
  width: 100%;
}

.play-button {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(238, 9, 121, 0.3);
}

.play-button:hover {
  box-shadow: 0 6px 16px rgba(238, 9, 121, 0.4);
  transform: translateY(-2px);
}

.add-button {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.movie-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.movie-link {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.movie-link:hover {
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.movie-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a0a0a0;
  font-size: 0.9rem;
}

.separator {
  color: #555;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.genre-pill {
  font-size: 0.7rem;
  padding: 4px 12px;
  border-radius: 50px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Genre-specific styling */
.genre-pill.action {
  background: rgba(255, 106, 0, 0.15);
  color: #ff6a00;
}

.genre-pill.crime {
  background: rgba(132, 0, 255, 0.15);
  color: #8400ff;
}

.genre-pill.thriller {
  background: rgba(255, 0, 76, 0.15);
  color: #ff004c;
}

.genre-pill.scifi {
  background: rgba(0, 217, 255, 0.15);
  color: #00d9ff;
}

.genre-pill.adventure {
  background: rgba(255, 191, 0, 0.15);
  color: #ffbf00;
}

.genre-pill.drama {
  background: rgba(0, 255, 170, 0.15);
  color: #00ffaa;
}

.genre-pill.comedy {
  background: rgba(255, 251, 0, 0.15);
  color: #fffb00;
}

.genre-pill.romance {
  background: rgba(255, 0, 234, 0.15);
  color: #ff00ea;
}

.genre-pill.horror {
  background: rgba(191, 0, 0, 0.15);
  color: #bf0000;
}

.genre-pill.fantasy {
  background: rgba(149, 0, 255, 0.15);
  color: #9500ff;
}

.genre-pill.default {
  background: rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
}

@media (max-width: 992px) {
  .movies-showcase {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .showcase-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .movies-showcase {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .showcase-title {
    font-size: 1.75rem;
  }

  .movie-details {
    padding: 1.25rem;
  }

  .movie-link {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .movies-showcase {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .showcase-title {
    font-size: 1.5rem;
  }

  .navigation-controls {
    display: none;
  }

  .movie-details {
    padding: 1rem;
  }

  .movie-link {
    font-size: 1rem;
  }

  .movie-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .separator {
    display: none;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }
}
</style>