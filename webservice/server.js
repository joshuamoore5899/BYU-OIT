const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch')
const PORT = 8000;
require('dotenv').config()



app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const pathRoute = __dirname.slice(0, __dirname.indexOf('webservice'));

app.get('/', (req, res) => {

  res.sendFile(pathRoute + 'webapp/index.html')
});

app.get('/public/main.js', (req, res) => {
  const pathRoute = __dirname.slice(0, __dirname.indexOf('webservice'));
  res.sendFile(pathRoute + 'webapp/public/main.js')
});

app.get('/public/style.css', (req, res) => {
  const pathRoute = __dirname.slice(0, __dirname.indexOf('webservice'));
  res.sendFile(pathRoute + 'webapp/public/style.css')
});

app.get('/api/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const apiResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=eb62a108d777dc486d9e8dc0fc79c4eb&language=en-US&query=${name}&page=1&include_adult=false`
    )
    const apiResponseJson = await apiResponse.json()
    const movieArray = apiResponseJson.results.slice(0, 10);

    const movies = [];
    for (let i = 0; i < movieArray.length; i++) {
      let temp = {
        "movie_id": movieArray[i].id,
        "title": movieArray[i].original_title,
        "poster_image_url": `https://image.tmdb.org/t/p/w500/${movieArray[i].poster_path}`,
        "popularity_summary": `${movieArray[i].popularity} out of ${movieArray[i].vote_count}`
      }
      movies.push(temp)
    }
    res.send(movies)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})
