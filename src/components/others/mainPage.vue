<template>
  <div class="page-container">
    <div class="hero-section">
      <div class="main_background"></div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="main-title">StarCinema</h1>
          <p class="main-description">
            Discover the latest premieres, explore the most anticipated films, and review ratings from renowned critics. Our platform offers you a journey through the world of cinema from the first frames to the closing credits, from classics to innovation.
          </p>
          <button @click="$router.push('/posters')" class="join_now_button">
            <span class="join-now-text-button">join us right now →</span>
          </button>
        </div>
      </div>
    </div>

    <div class="posters-section">
      <h2 class="section-title">Movies of the week</h2>
      <div class="posters-container">
        <router-link
          v-for="movie in randomMovies"
          :key="movie.id"
          :to="{ name: 'MovieDetails', params: {id: movie.id}}"
          class="poster-link"
        >
          <img :src="movie.photoUrl" :alt="movie.title" class="poster-image">
        </router-link>
      </div>
    </div>

    <div class="why-us-section">
      <h2 class="section-title">Why us?</h2>
      <div class="features-container">
        <div class="feature">
          <p>Experience movies like never before with our cutting-edge audio and visual technology, creating an immersive atmosphere that transports you into the heart of the story.</p>
        </div>
        <div class="feature">
          <p>Immerse yourself in the world of cinema with our interactive events, including filmmaker Q&A sessions, behind-the-scenes tours, and themed movie nights, offering an enriching and engaging experience for movie enthusiasts of all ages.</p>
        </div>
        <div class="feature">
          <p>Unlock exclusive perks and rewards with our membership program, including priority booking, discounts on tickets and concessions, and access to members-only events, ensuring you get the most out of your moviegoing experience.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as movieAPI from "@/services/movieAPI";

export default {
  data() {
    return {
      movies: [],
      randomMovies: []
    };
  },
  async mounted() {
    this.movies = await movieAPI.getAllMovies();
    this.randomMovies = this.getRandomMovies(3);
  },
  methods: {
    getRandomMovies(count) {
      const shuffled = [...this.movies].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #000115;
  overflow-x: hidden;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
}

.main_background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(5px) brightness(90%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 2rem;
}

.hero-text {
  max-width: 760px;
  margin-left: 50px;
}

.main-title {
  font-family: 'Cal Sans', sans-serif;
  font-size: 96px;
  color: white;
  margin-bottom: 1rem;
}

.main-description {
  font-size: 34px;
  color: white;
  margin-bottom: 2rem;
}

.join_now_button {
  background: rgba(129, 35, 48, 0.55);
  border: none;
  border-radius: 20px;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    background: rgba(129, 35, 48, 0.75);
  }
}

.join-now-text-button {
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.posters-section {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.section-title {
  color: white;
  font-size: 5vw;
  margin-bottom: 3rem;
  width: 100%;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-family: 'Cal Sans', sans-serif;
}

.posters-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.poster-image {
  width: 300px;
  height: 450px;
  border-radius: 15px;
  transition: transform 0.3s;
}

.poster-image:hover {
  transform: scale(1.05);
}

.why-us-section {
  position: relative;
  padding: 10rem 2rem;
  text-align: center;
  background: #000000;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(255, 65, 108, 1) 29%, rgba(255, 107, 74, 1) 73%, rgba(0, 0, 0, 1) 100%);
}

.features-container {
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.feature {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  color: white;
  font-size: 20px;
  line-height: 1.5;
}
</style>
