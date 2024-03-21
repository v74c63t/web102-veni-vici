import { useState } from 'react'
import './App.css'
import axios from 'axios'
const API_KEY = import.meta.env.API_KEY
const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [cat, setCat] = useState({})

  const getRandomImage = () => {
    axios.get(`${API_URL}/search?has_breeds=1&api_key=${API_KEY}`)
      .then((res) => {
        if(res.status == 200) {
          // console.log(res.data[0].id)
          return getImageById(res.data[0].id)
        }
        else{
          console.error("Something went wrong.", res.statusText)
        }
      })
  }

  const getImageById = (id) => {
    // console.log(id)
    axios.get(`${API_URL}/${id}?api_key=${API_KEY}`)
      .then((res) => {
        if(res.status == 200) {
          return checkImage(res.data)
        }
        else{
          console.error("Something went wrong.", res.statusText)
        }
      })
  }

  const checkImage = (data) =>{ 
    console.log(data)
    // console.log(data.breeds[0])
    // console.log(data.breeds[0].country_code)
    // do checking with ban list if conflict redo requests
    const catData = {"url": data.url, 
                "name": data.breeds[0].name, 
                "weight": data.breeds[0].weight.imperial,
                "lifespan": data.breeds[0].life_span,
                "origin": data.breeds[0].origin}
    setCat(catData)
    console.log(cat)
    // return
  }

  return (
    <>
      {cat ? (
        <div>
          <img src={cat.url} alt='cat image' className='image'/>
          <div>{cat.name}</div>
          <div>{cat.weight} lbs</div>
          <div>{cat.lifespan} years</div>
          <div>{cat.origin}</div>
        </div>
      ): 
      ""}
      <button onClick={getRandomImage}>Discover</button>
    </>
  )
}

export default App
