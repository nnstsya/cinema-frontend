<template>
  <div class="movie-form-page">
    <div class="backdrop-gradient"></div>
    <div class="content-container">
      <div class="form-header">
        <h1>Update Movie</h1>
        <p class="subtitle">Edit movie information below</p>
      </div>

      <form class="movie-form" @submit.prevent="updateMovie">
        <div class="form-columns">
          <div class="form-column">
            <div class="upload-section">
              <div class="upload-placeholder" :class="{ 'has-photo': movie.photoUrl }">
                <img v-if="movie.photoUrl" :src="movie.photoUrl" alt="Movie poster" class="preview-image">
                <div v-else class="upload-icon">
                  <i class="bx bx-image-add"></i>
                </div>
              </div>
              <div class="form-group">
                <label for="photo_movie">Movie Poster</label>
                <input
                    type="text"
                    id="photo_movie"
                    v-model="movie.photoUrl"
                    @input="isAnyFieldEmpty"
                    placeholder="Enter poster URL"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="title_movie">Title</label>
              <input
                  type="text"
                  id="title_movie"
                  v-model="movie.title"
                  @input="isAnyFieldEmpty"
                  placeholder="Enter movie title"
              >
            </div>

            <div class="form-group">
              <label for="year_movie">Release Year</label>
              <input
                  type="number"
                  id="year_movie"
                  v-model="movie.year"
                  @input="validateYear"
                  placeholder="2001-2024"
              >
              <p v-if="invalidYear" class="error-message">Year must be between 2001 and 2024</p>
            </div>

            <div class="form-group">
              <label for="description_movie">Description</label>
              <textarea
                  id="description_movie"
                  v-model="movie.description"
                  @input="isAnyFieldEmpty"
                  placeholder="Provide a brief description of the movie"
                  rows="4"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="language_movie">Language</label>
              <input
                  type="text"
                  id="language_movie"
                  v-model="movie.language"
                  @input="isAnyFieldEmpty"
                  placeholder="e.g. English, Spanish, etc."
              >
            </div>
          </div>

          <div class="form-column">
            <div class="form-group">
              <label for="director_movie">Director</label>
              <input
                  type="text"
                  id="director_movie"
                  v-model="movie.director"
                  @input="isAnyFieldEmpty"
                  placeholder="Enter director's name"
              >
            </div>

            <div class="form-group">
              <label for="duration_movie">Duration (minutes)</label>
              <input
                  type="number"
                  id="duration_movie"
                  v-model="movie.duration"
                  @input="validateDuration"
                  placeholder="e.g. 120"
              >
              <p v-if="invalidDuration" class="error-message">Duration must be a positive number</p>
            </div>

            <div class="form-group">
              <label for="link_trailer_movie">Trailer URL</label>
              <input
                  type="text"
                  id="link_trailer_movie"
                  v-model="movie.trailerLink"
                  @input="isAnyFieldEmpty"
                  placeholder="Enter YouTube or video link"
              >
            </div>

            <div class="form-group rating-group">
              <label for="rating_movie">Rating (0-10)</label>
              <div class="rating-input">
                <input
                    type="number"
                    id="rating_movie"
                    v-model="movie.rating"
                    @input="validateRating"
                    placeholder="0-10"
                    min="0"
                    max="10"
                    step="0.1"
                >
                <div class="rating-stars">
                  <i class="bx bxs-star" v-for="n in Math.floor(movie.rating)" :key="'star-'+n"></i>
                  <i class="bx bxs-star-half" v-if="movie.rating % 1 >= 0.5"></i>
                  <i class="bx bx-star" v-for="n in Math.floor(10 - movie.rating)" :key="'empty-'+n"></i>
                </div>
              </div>
              <p v-if="invalidRating" class="error-message">Rating must be between 0 and 10</p>
            </div>

            <div class="form-group">
              <label>Genres</label>
              <div class="genres-container">
                <div v-for="(genre, index) in movie.genres" :key="'genre-'+index" class="genre-item">
                  <select v-model="movie.genres[index]" @change="validateGenres">
                    <option value="" disabled>Select genre</option>
                    <option v-for="option in genreOption" :key="option" :value="option">
                      {{ option }}
                    </option>
                  </select>
                  <button type="button" class="remove-btn" @click="removeGenre(index)" title="Remove genre">
                    <i class="bx bx-x"></i>
                  </button>
                </div>
                <button type="button" class="add-btn" @click="addGenre">
                  <i class="bx bx-plus"></i> Add Genre
                </button>
              </div>
              <p v-if="invalidGenres" class="error-message">At least one genre is required</p>
            </div>

            <div class="form-group">
              <label>Actors</label>
              <div class="actors-container">
                <div v-for="(actor, index) in movie.actors" :key="'actor-'+index" class="actor-item">
                  <input
                      type="text"
                      v-model="movie.actors[index]"
                      @input="validateActors"
                      placeholder="Actor name"
                  >
                  <button type="button" class="remove-btn" @click="removeActor(index)" title="Remove actor">
                    <i class="bx bx-x"></i>
                  </button>
                </div>
                <button type="button" class="add-btn" @click="addActor">
                  <i class="bx bx-plus"></i> Add Actor
                </button>
              </div>
              <p v-if="invalidActors" class="error-message">At least one actor is required</p>
            </div>
          </div>
        </div>

        <div class="form-footer">
          <p v-if="isAnyFieldEmpty()" class="error-message">Please fill in all required fields</p>
          <div class="actions">
            <button
                type="button"
                class="cancel-btn"
                @click="$router.go(-1)"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="submit-btn"
                :disabled="invalidYear || invalidActors || invalidGenres || invalidDuration || invalidRating || isAnyFieldEmpty()"
            >
              <i class="bx bx-save"></i> Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as movieAPI from '@/services/movieAPI';

export default {
    data() {
        return {
            movie: {
                title: '',
                year: 0,
                genres: [],
                language: '',
                trailerLink: '',
                actors: [],
                director: '',
                duration: 0,
                rating: 0,
                description: '',
                photoUrl: '',
            },
            genreOption: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Thriller"],
            previewUrl: null,
            invalidYear: false,
            invalidGenres: false,
            invalidActors: false,
            invalidDuration: false,
            invalidRating: false,
        };
    },
    methods: {
        addGenre() {
            this.movie.genres.push("");
        },
        removeGenre(index) {
            this.movie.genres.splice(index, 1);
        },
        addActor() {
            this.movie.actors.push("");
        },
        removeActor(index) {
            this.movie.actors.splice(index, 1);
        },
        validateYear() {
            this.invalidYear = this.movie.year <= 2000 || this.movie.year >= 2025;
        },
        validateGenres() {
            this.invalidGenres = this.movie.genres.length === 0 || this.movie.genres.some(genre => !genre.trim());
        },
        validateActors() {
            this.invalidActors = this.movie.actors.length === 0 || this.movie.actors.some(actor => !actor.trim());
        },
        validateDuration() {
            this.invalidDuration = this.movie.duration <= 0;
        },
        validateRating() {
            this.invalidRating = this.movie.rating < 0 || this.movie.rating > 10;
        },
        isAnyFieldEmpty() {
            return !this.movie.title || !this.movie.language || !this.movie.trailerLink || !this.movie.director ||
            !this.movie.description || this.movie.genres.length === 0 || this.movie.actors.length === 0 || !this.movie.photoUrl;
        },
        async updateMovie() {
            await movieAPI.updateMovie(this.movie,this.$route.params.id);
            this.$router.push("/movie/"+this.$route.params.id)
        },
        async getMovie() {
            this.movie = await movieAPI.getMovie(this.$route.params.id);
        }
    },
    mounted(){
        this.getMovie();
    }
};
</script>

<style scoped>
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #ec4899;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-color: #1e293b;
  --text-light: #64748b;
  --error-color: #ef4444;
  --success-color: #22c55e;
  --border-color: #e2e8f0;
  --hover-color: #f1f5f9;
}

.movie-form-page {
  min-height: 100vh;
  background-color: var(--bg-color);
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.backdrop-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30vh;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  z-index: 0;
}

.content-container {
  width: 100%;
  max-width: 1200px;
  background-color: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-light);
  font-size: 1rem;
}

.movie-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.form-column {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-color);
}

input, select, textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: #232734;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

input::placeholder, textarea::placeholder {
  color: #cbd5e1;
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-placeholder {
  width: 100%;
  aspect-ratio: 2/3;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px dashed #cbd5e1;
}

.upload-placeholder.has-photo {
  border: none;
}

.upload-icon {
  font-size: 3rem;
  color: #cbd5e1;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.genres-container, .actors-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.genre-item, .actor-item {
  display: flex;
  gap: 0.5rem;
}

.genre-item select, .actor-item input {
  flex: 1;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.1s;
}

button:active {
  transform: translateY(1px);
}

.add-btn {
  padding: 0.75rem 1rem;
  background-color: #232734;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  width: fit-content;
}

.add-btn:hover {
  background-color: #e2e8f0;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #232734;
  color: var(--text-light);
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
}

.remove-btn:hover {
  background-color: #fecaca;
  color: var(--error-color);
}

.rating-input {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rating-input input {
  width: 5rem;
}

.rating-stars {
  color: #fbbf24;
  font-size: 1.25rem;
}

.form-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background-color: #232734;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.cancel-btn:hover {
  background-color: #f1f5f9;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover {
  background-color: var(--primary-dark);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: var(--error-color);
  font-size: 0.8rem;
  margin-top: 0.2rem;
}

@media (max-width: 768px) {
  .content-container {
    padding: 1.5rem;
  }

  .form-column {
    flex: 1 0 100%;
  }

  .actions {
    width: 100%;
  }

  .cancel-btn, .submit-btn {
    flex: 1;
  }
}
</style>
