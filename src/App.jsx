import { useState } from 'react'
import './App.css'
import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [cat, setCat] = useState(null)
  const [seen, setSeen] = useState([])

  const getRandomImage = () => {
    axios.get(`${API_URL}&api_key=${API_KEY}`)
      .then((res) => {
        if(res.status == 200) {
          console.log(res.data[0])
          return checkImage(res.data[0])
        }
        else{
          console.error("Something went wrong.", res.statusText)
        }
      })
  }


  const checkImage = (data) =>{ 
    // console.log(data)
    // console.log(data.breeds[0])
    // console.log(data.breeds[0].country_code)
    // do checking with ban list if conflict redo requests
    const catData = {"url": data.url, 
                "name": data.breeds[0].name, 
                "weight": data.breeds[0].weight.imperial,
                "lifespan": data.breeds[0].life_span,
                "origin": data.breeds[0].origin}
    setCat(catData)
    const seenData = {"url": catData.url,
                      "desc": `A ${catData.name} cat from ${catData.origin}`}
    // console.log(`A ${catData.name.toLowerCase()} cat from ${catData.origin}`)
    setSeen([...seen, seenData])
    // console.log(seen)
    // return
  }

  return (
    <div>
      <div className='seen-list'>
        <h3>Seen</h3>
        {seen.length !== 0 ? (
          seen.map((seenCat) => {
            return (
            <div>
              <img src={seenCat.url} alt='cat image' className='seen'/>
              <div>{seenCat.desc}</div>
            </div>
            )
          })
        ): ""}
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default App
