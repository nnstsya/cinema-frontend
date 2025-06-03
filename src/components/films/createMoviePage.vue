<template>
  <div class="movie-creator">
    <div class="movie-creator__background"></div>
    <div class="movie-creator__container">
      <h1 class="movie-creator__title">Create Movie</h1>

      <div class="movie-creator__content">
        <div class="movie-creator__upload-panel">
          <div class="upload-area">
            <img src="@/assets/upload_photo_image.png" alt="Upload" class="upload-area__image">
            <div class="upload-area__input">
              <label for="photo_movie" class="form-label">Upload Photo</label>
              <input
                  type="text"
                  id="photo_movie"
                  v-model="movie.photoUrl"
                  @input="isAnyFieldEmpty"
                  class="form-input"
                  required
              >
            </div>
          </div>
        </div>

        <div class="movie-creator__form-panel">
          <div class="form-grid">
            <div class="form-group">
              <label for="title_movie" class="form-label">Title</label>
              <input
                  type="text"
                  id="title_movie"
                  v-model="movie.title"
                  @input="isAnyFieldEmpty"
                  class="form-input"
                  required
              >
            </div>

            <div class="form-group">
              <label for="year_movie" class="form-label">Year</label>
              <input
                  type="number"
                  id="year_movie"
                  v-model="movie.year"
                  @input="validateYear"
                  class="form-input"
                  required
              >
              <p v-if="invalidYear" class="form-error">Year must be between 2001 and 2025</p>
            </div>

            <div class="form-group">
              <label for="description_movie" class="form-label">Description</label>
              <textarea
                  id="description_movie"
                  v-model="movie.description"
                  @input="isAnyFieldEmpty"
                  class="form-input form-textarea"
                  required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="language_movie" class="form-label">Language</label>
              <input
                  type="text"
                  id="language_movie"
                  v-model="movie.language"
                  @input="isAnyFieldEmpty"
                  class="form-input"
                  required
              >
            </div>

            <div class="form-group">
              <label for="director_movie" class="form-label">Director</label>
              <input
                  type="text"
                  id="director_movie"
                  v-model="movie.director"
                  @input="isAnyFieldEmpty"
                  class="form-input"
                  required
              >
            </div>

            <div class="form-group">
              <label for="duration_movie" class="form-label">Duration (minutes)</label>
              <input
                  type="number"
                  id="duration_movie"
                  v-model="movie.duration"
                  @input="validateDuration"
                  class="form-input"
                  required
              >
              <p v-if="invalidDuration" class="form-error">Duration must be a positive number</p>
            </div>

            <div class="form-group">
              <label for="link_trailer_movie" class="form-label">Trailer Link</label>
              <input
                  type="text"
                  id="link_trailer_movie"
                  v-model="movie.trailerLink"
                  @input="isAnyFieldEmpty"
                  class="form-input"
                  required
              >
            </div>

            <div class="form-group">
              <label for="rating_movie" class="form-label">Rating (0-10)</label>
              <input
                  type="number"
                  id="rating_movie"
                  v-model="movie.rating"
                  @input="validateRating"
                  class="form-input"
                  required
              >
              <p v-if="invalidRating" class="form-error">Rating must be between 0 and 10</p>
            </div>

            <div class="form-group form-group--full">
              <label class="form-label">Genres</label>
              <div class="genre-container">
                <div class="genre-tags">
                  <div v-for="(genre, index) in movie.genres" :key="index" class="genre-tag">
                    <select v-model="movie.genres[index]" required class="genre-select">
                      <option v-for="option in genreOption" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                    <button type="button" class="genre-remove-btn" @click="removeGenre(index)">
                      <span>×</span>
                    </button>
                  </div>
                </div>
                <button type="button" class="genre-add-btn" @click="addGenre">
                  <span>+ Add Genre</span>
                </button>
                <p v-if="invalidGenres" class="form-error">At least one genre is required</p>
              </div>
            </div>

            <div class="form-group form-group--full">
              <label class="form-label">Actors</label>
              <div class="actors-container">
                <div class="actor-tags">
                  <div v-for="(actor, index) in movie.actors" :key="index" class="actor-tag">
                    <input
                        type="text"
                        v-model="movie.actors[index]"
                        @input="validateActors"
                        class="actor-input"
                        required
                        placeholder="Actor name"
                    />
                    <button type="button" class="actor-remove-btn" @click="removeActor(index)">
                      <span>×</span>
                    </button>
                  </div>
                </div>
                <button type="button" class="actor-add-btn" @click="addActor">
                  <span>+ Add Actor</span>
                </button>
                <p v-if="invalidActors" class="form-error">At least one actor is required</p>
              </div>
            </div>
          </div>

          <div class="form-submit">
            <button
                @click="createMovie"
                class="submit-btn"
                type="submit"
                :disabled="invalidYear || invalidActors || invalidGenres || invalidDuration || invalidRating || isAnyFieldEmpty()"
            >
              <span>Create Movie</span>
            </button>
            <p v-if="isAnyFieldEmpty()" class="form-error form-error--center">Please fill in all required fields</p>
          </div>
        </div>
      </div>
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
      if(this.movie.year <= 2000) this.movie.year = 2001;
      if(this.movie.year >= 2025) this.movie.year = 2025;
    },
    validateGenres() {
      this.invalidGenres = this.movie.genres.length === 0 || this.movie.genres.some(genre => !genre.trim());
    },
    validateActors() {
      this.invalidActors = this.movie.actors.length === 0 || this.movie.actors.some(actor => !actor.trim());
    },
    validateDuration() {
      this.invalidDuration = this.movie.duration <= 0;
      if(this.movie.duration <= 0) this.movie.duration = 1;
    },
    validateRating() {
      this.invalidRating = this.movie.rating < 0 || this.movie.rating > 10;
    },
    isAnyFieldEmpty() {
      return !this.movie.title || !this.movie.language || !this.movie.trailerLink || !this.movie.director ||
          !this.movie.description || this.movie.genres.length === 0 || this.movie.actors.length === 0 || !this.movie.photoUrl;
    },
    async createMovie() {
      await movieAPI.createMovie(this.movie);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.movie-creator {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.movie-creator__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.movie-creator__container {
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;
}

.movie-creator__title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(229, 69, 224, 0.5);
}

.movie-creator__content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.movie-creator__upload-panel,
.movie-creator__form-panel {
  background: rgba(25, 25, 35, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.movie-creator__upload-panel {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-creator__form-panel {
  flex: 2;
  min-width: 500px;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.upload-area__image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.upload-area__image:hover {
  transform: scale(1.02);
}

.upload-area__input {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group--full {
  grid-column: span 2;
}

.form-label {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.form-input,
.genre-select,
.actor-input {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.genre-select:focus,
.actor-input:focus {
  border-color: rgba(229, 69, 224, 0.6);
  box-shadow: 0 0 0 2px rgba(229, 69, 224, 0.3);
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.form-error--center {
  text-align: center;
}

.genre-container,
.actors-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.genre-tags,
.actor-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.genre-tag,
.actor-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.genre-select,
.actor-input {
  min-width: 120px;
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 1.5rem;
}

.genre-select option {
  background: #232734;
  color: white;
}

.genre-remove-btn,
.actor-remove-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 70, 70, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.genre-remove-btn:hover,
.actor-remove-btn:hover {
  background: rgba(255, 70, 70, 0.4);
}

.genre-add-btn,
.actor-add-btn {
  align-self: flex-start;
  background: rgba(229, 69, 224, 0.2);
  color: white;
  border: 1px solid rgba(229, 69, 224, 0.4);
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.genre-add-btn:hover,
.actor-add-btn:hover {
  background: rgba(229, 69, 224, 0.4);
}

.form-submit {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.submit-btn {
  background: linear-gradient(135deg, rgba(229, 69, 224, 0.8), rgba(155, 34, 154, 0.8));
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.75rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(155, 34, 154, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(155, 34, 154, 0.4);
  background: linear-gradient(135deg, rgba(229, 69, 224, 0.9), rgba(155, 34, 154, 0.9));
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .movie-creator__content {
    flex-direction: column;
    align-items: center;
  }

  .movie-creator__upload-panel,
  .movie-creator__form-panel {
    max-width: 600px;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group--full {
    grid-column: auto;
  }

  .movie-creator__title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .movie-creator {
    padding: 1rem;
  }

  .movie-creator__upload-panel,
  .movie-creator__form-panel {
    padding: 1.5rem;
  }

  .movie-creator__title {
    font-size: 2rem;
  }
}
</style>