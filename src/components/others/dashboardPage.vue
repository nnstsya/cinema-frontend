<template>
  <div class="dashboard">
    <div class="sidebar">
      <div class="logo">
        <span class="logo-text">CinemaAdmin</span>
      </div>
      <div class="nav-items">
        <div class="nav-item active" @click="activeSection = 'cinemas'">
          <i class="fas fa-film"></i>
          <span>Cinemas</span>
        </div>
        <div class="nav-item" @click="activeSection = 'movies'">
          <i class="fas fa-video"></i>
          <span>Movies</span>
        </div>
        <div class="nav-item" @click="activeSection = 'sessions'">
          <i class="fas fa-calendar-alt"></i>
          <span>Sessions</span>
        </div>
        <div class="nav-item" @click="activeSection = 'users'">
          <i class="fas fa-users"></i>
          <span>Users</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="header">
        <h1>{{ activeSection.charAt(0).toUpperCase() + activeSection.slice(1) }} Management</h1>
        <div class="actions">
          <router-link :to="'/create' + activeSection.charAt(0).toUpperCase() + activeSection.slice(1, activeSection.length - 1)">
            <button class="btn-add">
              <i class="fas fa-plus"></i> Add {{ activeSection.slice(0, -1) }}
            </button>
          </router-link>
        </div>
      </div>

      <div v-if="activeSection === 'cinemas'" class="section">
        <div class="table-container">
          <table v-if="cinemas.length" class="modern-table">
            <thead>
            <tr>
              <th v-for="(value, key) in cinemas[0]" :key="key">
                <span v-if="key !== '__v' && key !== 'photoUrl'">{{ key }}</span>
              </th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cinema in cinemas" :key="cinema._id">
              <td v-for="(value, key) in cinema" :key="key">
                <span v-if="key !== '__v'">{{ value }}</span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-delete" @click="deleteCinema(cinema._id)"><font-awesome-icon icon="trash"></font-awesome-icon></button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeSection === 'movies'" class="section">
        <div class="table-container">
          <table v-if="movies.length" class="modern-table">
            <thead>
            <tr>
              <th v-for="(value, key) in movies[0]" :key="key">
                <span v-if="key !== '__v' && key !== 'photoUrl'">{{ key }}</span>
              </th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="movie in movies" :key="movie._id">
              <td v-for="(value, key) in movie" :key="key">
                <span v-if="key !== '__v' && key !== 'photoUrl'">{{ value }}</span>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link class="btn-edit" :to="{ name: 'UpdateMovie', params: { id: movie._id }}">
                    <font-awesome-icon icon="pen-to-square"></font-awesome-icon>
                  </router-link>
                  <button class="btn-delete" @click="deleteMovie(movie._id)"><font-awesome-icon icon="trash"></font-awesome-icon></button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeSection === 'sessions'" class="section">
        <div class="table-container">
          <table v-if="sessions.length" class="modern-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Movie ID</th>
              <th>Cinema ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Quantity Available Places</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="session in sessions" :key="session._id">
              <td>{{ session._id }}</td>
              <td>{{ session.movieId }}</td>
              <td>{{ session.cinemaId }}</td>
              <td>{{ session.date }}</td>
              <td>{{ session.time }}</td>
              <td>{{ session.price }}</td>
              <td>{{ session.discount }}</td>
              <td>{{ session.quantityAvailablePlaces }}</td>
              <td>
                <div class="action-buttons">
                  <router-link class="btn-edit" :to="{ name: 'UpdateSession', params: { id: session._id }}">
                    <font-awesome-icon icon="pen-to-square"></font-awesome-icon>
                  </router-link>
                  <button class="btn-delete" @click="deleteSession(session._id)"><font-awesome-icon icon="trash"></font-awesome-icon></button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeSection === 'users'" class="section">
        <div class="table-container">
          <table v-if="users.length" class="modern-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn-delete" @click="deleteUser(user._id)"><font-awesome-icon icon="trash"></font-awesome-icon></button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as cinemaAPI from '@/services/cinemaAPI'
import * as movieAPI from '@/services/movieAPI'
import * as sessionAPI from '@/services/sessionAPI'
import * as userAPI from '@/services/userAPI'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

export default {
  components: {FontAwesomeIcon},
  data() {
    return {
      activeSection: 'cinemas',
      cinemas: [],
      movies: [],
      sessions: [],
      users: [],
    };
  },
  methods: {
    async fetchData() {
      this.cinemas = await cinemaAPI.getAllCinemas();
      this.movies = await movieAPI.getAllMovies();
      this.sessions = await sessionAPI.getAllSessions();
      this.users = await userAPI.getAllUsers();
    },
    async deleteSession(id) {
      await sessionAPI.deleteSession(id);
      window.location.reload()
    },
    async deleteUser(id) {
      await userAPI.deleteUser(id,localStorage.getItem("token"));
      window.location.reload()
    },
    async deleteCinema(id) {
      await cinemaAPI.deleterCinema(id);
      window.location.reload()
    },
    async deleteMovie(id) {
      await movieAPI.deleteMovie(id);
      window.location.reload()
    }
  },
  async mounted() {
    await this.fetchData();
  }
};
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #121212;
  color: #f5f5f5;
}

.dashboard {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #1e1e1e;
  padding: 20px 0;
  color: #f5f5f5;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.logo {
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg, #FF5F1F 0%, #FF267E 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.nav-items {
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 5px;
  border-left: 4px solid transparent;
}

.nav-item i {
  margin-right: 15px;
  font-size: 18px;
}

.nav-item:hover {
  background-color: rgba(255, 95, 31, 0.1);
  border-left: 4px solid #FF5F1F;
}

.nav-item.active {
  background-color: rgba(255, 95, 31, 0.15);
  border-left: 4px solid #FF5F1F;
  font-weight: 500;
}

.main-content {
  flex: 1;
  padding: 30px;
  background-color: #121212;
  overflow: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
}

.btn-add {
  background: linear-gradient(90deg, #FF5F1F 0%, #FF267E 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 95, 31, 0.3);
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.card-content p {
  margin-bottom: 8px;
  color: #ccc;
}

.movie-details h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modern-table thead {
  background: linear-gradient(90deg, #FF5F1F 0%, #FF267E 100%);
}

.modern-table th {
  padding: 15px;
  text-align: left;
  color: white;
  font-weight: 600;
}

.modern-table td {
  padding: 15px;
  border-bottom: 1px solid #333;
}

.modern-table tbody tr {
  background-color: #1e1e1e;
  transition: background-color 0.3s ease;
}

.modern-table tbody tr:hover {
  background-color: #2a2a2a;
}

.btn-edit, .btn-delete {
  border: none;
  background: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #ccc;
}

.btn-edit {
  background-color: rgba(255, 95, 31, 0.2);
  color: #FF5F1F;
}

.btn-delete {
  background-color: rgba(255, 38, 126, 0.2);
  color: #FF267E;
}

.btn-edit:hover, .btn-delete:hover {
  transform: translateY(-2px);
}

.action-buttons {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 10px;
  }

  .nav-items {
    flex-direction: row;
    justify-content: space-between;
    overflow-x: auto;
  }

  .nav-item {
    border-left: none;
    border-bottom: 3px solid transparent;
  }

  .nav-item:hover,
  .nav-item.active {
    border-left: none;
    border-bottom: 3px solid #FF5F1F;
  }

  .header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>