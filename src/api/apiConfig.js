const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'ff82d31c5004af4a0b23931376053af8',//506a7a4b7f25d45cc0f3d4d9351442ed',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;