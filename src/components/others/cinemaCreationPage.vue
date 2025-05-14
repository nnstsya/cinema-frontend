<template>
  <div class="cinema-creator">
    <div class="cinema-creator__background"></div>

    <div class="cinema-creator__container">
      <h1 class="cinema-creator__title">Create Cinema</h1>

      <div class="cinema-creator__form-card">
        <div class="form-section">
          <h2 class="section-title">Cinema Details</h2>

          <div class="form-grid">
            <div class="form-group">
              <label for="name_cinema" class="form-label">Cinema Name</label>
              <div class="input-container">
                <input
                    type="text"
                    id="name_cinema"
                    v-model="cinema.name"
                    class="form-input"
                    placeholder="Enter cinema name"
                >
                <div class="input-focus-line"></div>
              </div>
            </div>

            <div class="form-group">
              <label for="location_cinema" class="form-label">Location</label>
              <div class="input-container">
                <input
                    type="text"
                    id="location_cinema"
                    v-model="cinema.location"
                    class="form-input"
                    placeholder="Enter location"
                >
                <div class="input-focus-line"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2 class="section-title">Seating Configuration</h2>

          <div class="form-grid">
            <div class="form-group">
              <label for="rows_cinema" class="form-label">Number of Rows</label>
              <div class="input-container input-container--numeric">
                <button
                    type="button"
                    class="number-control-btn"
                    @click="decrementRows"
                    :disabled="cinema.quantityRows <= 1"
                >
                  <span>−</span>
                </button>
                <input
                    type="number"
                    id="rows_cinema"
                    v-model="cinema.quantityRows"
                    class="form-input form-input--numeric"
                    min="1"
                >
                <button
                    type="button"
                    class="number-control-btn"
                    @click="incrementRows"
                >
                  <span>+</span>
                </button>
                <div class="input-focus-line"></div>
              </div>
            </div>

            <div class="form-group">
              <label for="amount_rows_cinema" class="form-label">Seats Per Row</label>
              <div class="input-container input-container--numeric">
                <button
                    type="button"
                    class="number-control-btn"
                    @click="decrementSeats"
                    :disabled="cinema.quantityPlacesInRow <= 1"
                >
                  <span>−</span>
                </button>
                <input
                    type="number"
                    id="amount_rows_cinema"
                    v-model="cinema.quantityPlacesInRow"
                    class="form-input form-input--numeric"
                    min="1"
                >
                <button
                    type="button"
                    class="number-control-btn"
                    @click="incrementSeats"
                >
                  <span>+</span>
                </button>
                <div class="input-focus-line"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="theater-visualization" v-if="cinema.quantityRows > 0 && cinema.quantityPlacesInRow > 0">
          <div class="screen">
            <div class="screen-label">Screen</div>
          </div>

          <div class="seats-container">
            <div
                v-for="row in Math.min(cinema.quantityRows, 5)"
                :key="`row-${row}`"
                class="seat-row"
            >
              <div
                  v-for="seat in Math.min(cinema.quantityPlacesInRow, 12)"
                  :key="`seat-${row}-${seat}`"
                  class="seat"
              ></div>
              <span v-if="cinema.quantityPlacesInRow > 12" class="more-indicator">+{{ cinema.quantityPlacesInRow - 12 }}</span>
            </div>
            <div v-if="cinema.quantityRows > 5" class="more-rows-indicator">
              +{{ cinema.quantityRows - 5 }} more rows
            </div>
          </div>
        </div>

        <div class="capacity-info" v-if="cinema.quantityRows > 0 && cinema.quantityPlacesInRow > 0">
          <div class="capacity-badge">
            Total Capacity: <span>{{ cinema.quantityRows * cinema.quantityPlacesInRow }}</span> seats
          </div>
        </div>

        <div class="form-footer">
          <button
              type="submit"
              class="submit-btn"
              @click="createCinema"
              :disabled="isAnyFieldEmpty()"
          >
            <span class="btn-icon">+</span>
            <span class="btn-text">Create Cinema</span>
          </button>

          <p v-if="isAnyFieldEmpty()" class="error-message">
            Please fill in all required fields
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as cinemaAPI from '@/services/cinemaAPI'

export default {
    data() {
        return {
            cinema: {
                name: '',
                location: '',
                quantityRows: 0,
                quantityPlacesInRow: 0,
            },
        };
    },
    methods: {
        isAnyFieldEmpty() {
            return !this.cinema.name || !this.cinema.location || !this.cinema.quantityRows || !this.cinema.quantityPlacesInRow
        },
        async createCinema() {
                await cinemaAPI.createCinema(this.cinema);
                this.$router.push("/");
        },
      decrementRows() {
        if (this.cinema.quantityRows > 1) {
          this.cinema.quantityRows = parseInt(this.cinema.quantityRows) - 1;
        }
      },
      incrementRows() {
        this.cinema.quantityRows = parseInt(this.cinema.quantityRows) + 1;
      },
      incrementSeats() {
        this.cinema.quantityPlacesInRow = parseInt(this.cinema.quantityPlacesInRow || 0) + 1;
      },
      decrementSeats() {
        if (this.cinema.quantityPlacesInRow > 1) {
          this.cinema.quantityPlacesInRow = parseInt(this.cinema.quantityPlacesInRow) - 1;
        }
      },
    },
  created() {
    if (!this.cinema.quantityRows) this.cinema.quantityRows = 6;
    if (!this.cinema.quantityPlacesInRow) this.cinema.quantityPlacesInRow = 8;
  }
};
</script>

<style>
.cinema-creator {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.cinema-creator__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -2;
}

.cinema-creator__background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(20, 20, 40, 0.6), rgba(30, 15, 60, 0.8));
  z-index: -1;
}

.cinema-creator__container {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.cinema-creator__title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #9d50bb, #6e48aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

.cinema-creator__form-card {
  width: 100%;
  background: rgba(30, 30, 50, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3),
  0 0 0 1px rgba(255, 255, 255, 0.1);
}

.form-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.95);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}

.form-label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

.input-container {
  position: relative;
}

.input-container--numeric {
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input--numeric {
  text-align: center;
  width: calc(100% - 80px);
  border-radius: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-left: none;
  border-right: none;
}

.form-input:focus {
  outline: none;
  border-color: rgba(157, 80, 187, 0.5);
  box-shadow: 0 0 0 3px rgba(157, 80, 187, 0.2);
}

.input-focus-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #9d50bb, #6e48aa);
  transition: width 0.3s ease;
}

.form-input:focus ~ .input-focus-line {
  width: 100%;
}

.number-control-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.number-control-btn:first-child {
  border-radius: 8px 0 0 8px;
}

.number-control-btn:last-of-type {
  border-radius: 0 8px 8px 0;
}

.number-control-btn:hover:not(:disabled) {
  background: rgba(157, 80, 187, 0.2);
}

.number-control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Theater visualization */
.theater-visualization {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.screen {
  width: 80%;
  height: 10px;
  background: linear-gradient(to right, #9d50bb, #6e48aa);
  border-radius: 3px;
  margin-bottom: 2rem;
  position: relative;
}

.screen-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.seats-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.seat-row {
  display: flex;
  gap: 5px;
  align-items: center;
}

.seat {
  width: 12px;
  height: 12px;
  background: rgba(157, 80, 187, 0.3);
  border-radius: 3px;
  transition: all 0.2s ease;
}

.seat:hover {
  transform: scale(1.1);
  background: rgba(157, 80, 187, 0.6);
}

.more-indicator {
  margin-left: 8px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.more-rows-indicator {
  margin-top: 10px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Capacity badge */
.capacity-info {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.capacity-badge {
  background: rgba(157, 80, 187, 0.15);
  border: 1px solid rgba(157, 80, 187, 0.3);
  border-radius: 25px;
  padding: 0.5rem 1.25rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.capacity-badge span {
  font-weight: 700;
  color: #9d50bb;
}

/* Submit button */
.form-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #9d50bb, #6e48aa);
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(157, 80, 187, 0.4);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(157, 80, 187, 0.5);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.error-message {
  margin-top: 1rem;
  color: #ff6e6e;
  font-size: 0.9rem;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cinema-creator {
    padding: 1.5rem;
  }

  .cinema-creator__title {
    font-size: 2.5rem;
  }

  .cinema-creator__form-card {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .cinema-creator__title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .form-label {
    font-size: 0.9rem;
  }

  .submit-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>