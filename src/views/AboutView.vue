<template>
  <div class="about">
    <h1>Genres List</h1>
    <!-- Displaying genres as a table -->
    <table v-if="genres.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="genre in genres" :key="genre.id">
          <td>{{ genre.id }}</td>
          <td>{{ genre.Name }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No genres found.</p>
  </div>
</template>

<script>
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export default {
  data() {
    return {
      genres: [], // Store genres data here
    };
  },
  mounted() {
    // Fetch genres from the API when the component is mounted
    this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        console.log(apiUrl);
        const response = await axios({
            method: 'GET',
            url: `${apiUrl}/genres`
        });// Adjust URL as per your API
        this.genres = response.data; // Store the API response in genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  table {
    width: 50%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #00bd7e;
  }

  th {
    background-color: #00bd7e;
  }

  tr:hover {
    background-color: #3d7965;
  }
}
</style>
