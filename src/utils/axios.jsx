import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2MyZjU1MDI0YTIzMzZkOGNkZWY1ZjEwM2Q5MDBjNyIsInN1YiI6IjY1ZDFjOWFjYjQyMjQyMDE2M2IyNDVmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bP_SU3Y8TDJuGtRvjaSXdzOswRMK5IVWuBXjxNzR3hc'
  }
})

export default instance