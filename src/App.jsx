import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Tag from './components/Tag/Tag'
const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [cat, setCat] = useState(null)
  const [seen, setSeen] = useState([])
  const [banList, setBanList] = useState({
                                          "name": [],
                                          "weight": [],
                                          "life": [],
                                          "origin": []
                                        })

  const getRandomImage = () => {
    axios.get(`${API_URL}&api_key=${API_KEY}`)
      .then((res) => {
        if(res.status == 200) {
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

  const addToNameBanList = () => {
    if(!banList.name.includes(cat.name)) {
      setBanList({
        "name": [...banList.name, cat.name],
        "weight": banList.weight,
        "life": banList.life,
        "origin": banList.origin
      }) 
    }            
  }

  const addToWeightBanList = () => {
    if(!banList.weight.includes(cat.weight)) {
      setBanList({
        "name": banList.name,
        "weight": [...banList.weight, cat.weight],
        "life": banList.life,
        "origin": banList.origin
      })
    }
  }

  const addToLifeBanList = () => {
    if(!banList.life.includes(cat.lifespan)) {
      setBanList({
        "name": banList.name,
        "weight": banList.weight,
        "life": [...banList.life, cat.lifespan],
        "origin": banList.origin
      })
    }
  }

  const addToOriginBanList = () => {
    if(!banList.origin.includes(cat.origin)) {
      setBanList({
        "name": banList.name,
        "weight": banList.weight,
        "life": banList.life,
        "origin": [...banList.origin, cat.origin]
      })
    }
  }

  return (
    <div>
      <div className='seen-list'>
        <h3>Seen</h3>
        {seen.length !== 0 ? (
          seen.map((seenCat, key) => {
            return (
            <div key={key}>
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
            <div className="tags">
              <Tag onClick={addToNameBanList}>{cat.name}</Tag>
              <Tag onClick={addToWeightBanList}>{cat.weight} lbs</Tag>
              <Tag onClick={addToLifeBanList}>{cat.lifespan} years</Tag>
              <Tag onClick={addToOriginBanList}>{cat.origin}</Tag>
            </div>
          </div>
        ):
        ""}
        <button onClick={getRandomImage}>Discover</button>
      </div>
    </div>
  )
}

export default App
