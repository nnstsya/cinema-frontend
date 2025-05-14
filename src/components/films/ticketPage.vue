<template>
  <div class="ticket-booking">
    <div class="glass-card">
      <h2 class="title">Book Your Tickets</h2>

      <form @submit.prevent="addTicket" class="booking-form">
        <div class="form-section">
          <div class="input-group">
            <label for="email">
              <span class="label-text">Payer's Email</span>
            </label>
            <input
                type="email"
                id="email"
                v-model="ticketData.email"
                @input="validateEmail(ticketData.email)"
                class="input-field"
                placeholder="your@email.com"
                required
            >
          </div>

          <div class="input-group">
            <label for="receiverEmail">
              <span class="label-text">Receiver's Email</span>
            </label>
            <input
                type="email"
                id="receiverEmail"
                v-model="newEmailPlace.email"
                @input="validateEmail(newEmailPlace.email)"
                @change="emailCheck"
                class="input-field"
                placeholder="receiver@email.com"
                required
            >
            <span v-if="emailExists" class="error">This email already exists</span>
          </div>

          <div class="input-group">
            <label for="seatNumber">
              <span class="label-text">Seat Number</span>
            </label>
            <input
                type="number"
                id="seatNumber"
                v-model="newEmailPlace.place"
                @input="checkPlace"
                min="0"
                :max="session?.quantityAvailablePlaces || 0"
                class="input-field"
                placeholder="Select a seat number"
                required
            >
            <span v-if="placeAlreadyBooked" class="error">This seat is already booked or in your order</span>
          </div>
        </div>

        <div class="validation-messages">
          <span v-if="invalidEmail" class="error">Please enter a valid email address</span>
          <span v-if="exceedsAvailableSeats" class="error">Not enough available seats</span>
          <p class="notice">Tickets are non-exchangeable and non-refundable</p>
        </div>

        <div class="action-buttons">
          <button
              type="submit"
              class="btn btn-add"
              :disabled="emailExists || invalidEmail || exceedsAvailableSeats || placeAlreadyBooked || isAnyFieldEmpty()"
          >
            Add Ticket
          </button>
          <button
              type="button"
              @click="buyTicket"
              class="btn btn-buy"
              :disabled="isEmailPlaceEmpty()"
          >
            Complete Purchase
          </button>
        </div>
      </form>

      <div class="tickets-summary" v-if="Object.keys(ticketData.emailPlace).length > 0">
        <h3>Your Selection</h3>
        <div class="ticket-list">
          <div
              v-for="(place, email) in ticketData.emailPlace"
              :key="email"
              class="ticket-item"
          >
            <div class="ticket-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <line x1="6" y1="6" x2="6" y2="18" />
                <line x1="18" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div class="ticket-info">
              <div class="recipient">{{ email }}</div>
              <div class="seat-number">Seat #{{ place }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="seating-section">
        <h3>Available Seats</h3>
        <div class="seating-chart">
          <button
              v-for="seat in totalSeats"
              :key="seat"
              :class="['seat', {
              'seat-available': !isBooked(seat),
              'seat-unavailable': isBooked(seat),
              'seat-selected': Object.values(ticketData.emailPlace).includes(seat)
            }]"
              @click="selectSeat(seat)"
              :disabled="isBooked(seat)"
          >
            {{ seat }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as ticketAPI from '@/services/ticketAPI';
import * as sessionAPI from '@/services/sessionAPI';
import { buyTickets } from '@/services/stripe';

export default {
  data() {
    return {
      ticketData: {
        sessionId: '',
        email: '',
        emailPlace: {}
      },
      newEmailPlace: {
        email: '',
        place: ''
      },
      emailExists: false,
      invalidEmail: false,
      exceedsAvailableSeats: false,
      placeAlreadyBooked: false,
      tickets: [],
      session: {},
      totalSeats: []
    };
  },
  methods: {
    addTicket() {
      if (!this.emailExists && !this.exceedsAvailableSeats && !this.placeAlreadyBooked) {
        this.ticketData.emailPlace[this.newEmailPlace.email] = this.newEmailPlace.place;
        this.newEmailPlace.email = '';
        this.newEmailPlace.place = '';
        this.updateSeats();
      }
    },

    selectSeat(seat) {
      if (!this.isBooked(seat) && !Object.values(this.ticketData.emailPlace).includes(seat)) {
        this.newEmailPlace.place = seat;
        this.checkPlace();
      }
    },

    checkPlace() {
      this.placeAlreadyBooked = this.isBooked(this.newEmailPlace.place) || Object.values(this.ticketData.emailPlace).includes(this.newEmailPlace.place);
    },

    isEmailPlaceEmpty() {
      return Object.keys(this.ticketData.emailPlace).length === 0;
    },

    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.invalidEmail = !emailPattern.test(email);
    },

    emailCheck() {
      this.emailExists = Object.prototype.hasOwnProperty.call(this.ticketData.emailPlace, this.newEmailPlace.email);
    },

    isAnyFieldEmpty() {
      return !this.ticketData.email || !this.ticketData.sessionId || !this.newEmailPlace.email || !this.newEmailPlace.place;
    },

    async buyTicket() {
      if (!this.emailExists && !this.exceedsAvailableSeats && !this.placeAlreadyBooked && !this.isEmailPlaceEmpty()) {
        await buyTickets(this.ticketData.email, this.ticketData.sessionId, this.ticketData.emailPlace);
      }
    },

    async getTicketsBySessionId() {
      this.tickets = await ticketAPI.getTicketsBySessionId(this.$route.params.id);
      this.updateSeats();
    },

    async getSession() {
      this.session = await sessionAPI.getSession(this.$route.params.id);
      this.updateSeats();
    },

    updateSeats() {
      const availableSeats = this.session?.quantityAvailablePlaces || 0;
      if (!this.tickets || !availableSeats) {
        this.totalSeats = [];
        return;
      }
      
      const bookedSeats = this.tickets.map(ticket => ticket.place);
      const allSeats = Array.from(
        { length: availableSeats }, 
        (_, i) => i + 1
      );
      this.totalSeats = allSeats.filter(seat => !bookedSeats.includes(seat));
    },

    isBooked(seat) {
      return this.tickets && this.tickets.some(ticket => ticket.place === seat);
    }
  },
  mounted() {
    this.ticketData.sessionId = this.$route.params.id;
    this.getTicketsBySessionId();
    this.getSession();
  }
};
</script>

<style>
.ticket-booking {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b);
  padding: 2rem;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 800px;
  color: white;
  overflow: hidden;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: grid;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.label-text {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
}

.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: white;
  transition: all 0.3s ease;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-field:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.error {
  color: #ff6b6b;
  font-size: 0.75rem;
  position: absolute;
  left: 0;
  bottom: -1.25rem;
}

.validation-messages {
  position: relative;
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.notice {
  font-size: 0.875rem;
  color: #ffd166;
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-add {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-add:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.btn-buy {
  background: #6366f1;
  color: white;
}

.btn-buy:hover:not(:disabled) {
  background: #4f46e5;
}

.tickets-summary {
  margin-top: 2rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.ticket-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.ticket-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 12px;
}

.ticket-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.recipient {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

.seat-number {
  font-weight: 600;
  color: white;
}

.seating-section {
  margin-top: 2rem;
}

.seating-chart {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 0.75rem;
  max-height: 180px;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.seat {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.seat-available {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.seat-available:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.seat-unavailable {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.4);
  cursor: not-allowed;
}

.seat-selected {
  background: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

@media (max-width: 768px) {
  .glass-card {
    padding: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (min-width: 640px) {
  .form-section {
    grid-template-columns: 1fr;
  }
}
</style>
