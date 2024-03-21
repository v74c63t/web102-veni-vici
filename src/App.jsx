import { useState } from 'react'
import './App.css'
import axios from 'axios'
const API_KEY = import.meta.env.API_KEY
const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [imageUrl, setImageUrl] = useState('')

  const getRandomImage = () => {
    axios.get(`${API_URL}/search?api_key=${API_KEY}`)
      .then((res) => {
        if(res.status == 200) {
          console.log(res.data[0].id)
          return getImageById(res.data[0].id)
        }
        else{
          console.error("Something went wrong.", res.statusText)
        }
      })
  }

  const getImageById = (id) => {
    console.log(id)
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
    // do checking with ban list if conflict redo requests
    setImageUrl(data.url)
    // return
  }

  return (
    <>
    <button onClick={getRandomImage}></button>
    </>
  )
}

export default App
