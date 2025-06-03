<template>
  <div>
    <header>
      <div class="logo-text">
        <a class="logo-text" href="/">StarCinema</a>
      </div>
      <img src="@/assets/burger-bar.png" class="burger-bar" id="burger-bar" @click="toggleSidebar">
    </header>
    <div v-if="isSidebarOpen" class="dropdown-menu">
      <div class="dropdown_background">
        <button class="close-btn" @click="toggleSidebar"><i class='bx bx-x'></i></button>
        <ul>
          <li><a href="/">Home page</a></li>
          <li v-if="isNotAuthorized()"><a href="/authentication">Authentication</a></li>
          <li><a href="/posters">Cinema Poster</a></li>
          <li v-if="isAuthorized()"><a href="/profile">My Profile</a></li>
          <li v-if="userAccess()"><a href="/createSession">Create Session</a></li>
          <li v-if="userAccess()"><a href="/createMovie">Create Movie</a></li>
          <li v-if="userAccess()"><a href="/createCinema">Create Cinema</a></li>
          <li v-if="userAccess()"><a href="/profile/dashboard">Dashboard</a></li>
          <li v-if="isAuthorized()"><a @click="logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      user: [],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    userAccess() {
      return localStorage.getItem("isAdmin") === 'true';
    },
    logout() {
      localStorage.clear();
      window.location.reload();
    },
    isNotAuthorized() {
      return localStorage.getItem("isAdmin") === null;
    },
    isAuthorized() {
      return localStorage.getItem("isAdmin") !== null;
    },
  },
};
</script>

<style>
header {
  z-index: 10;
  position: absolute;
  padding: 24px;
  justify-content: space-between;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  background: #000000;
}

.logo-text {
  font-family: 'Cal Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF;
  text-decoration: none;
}

.burger-bar {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 85px;
  right: 20px;
  width: 350px;
  height: 220px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  background-color: #1e1e1e;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  z-index: 1000;
  overflow-y: auto;
}

.dropdown-menu .close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.dropdown-menu ul {
  list-style: none;
  padding-top: 50px;
  padding-left: 25px;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
  border-bottom: #fcc2ce 1px solid;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #FFFFFF;
  font-size: 18px;
}

.dropdown-menu li:hover {
  background-color: #ff416c;
  border-radius: 40px;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  color: rgba(255, 255, 255, 1);
  top: 17px;
  width: 50px;
  height: 50px;
  font-size: 100px;
}
</style>
