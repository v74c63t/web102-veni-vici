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
                                          "names": [],
                                          "weights": [],
                                          "lifespans": [],
                                          "origins": []
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
                "weight": `${data.breeds[0].weight.imperial} lbs`,
                "lifespan": `${data.breeds[0].life_span} years`,
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
    if(!banList.names.includes(cat.name)) {
      setBanList({
        "names": [...banList.names, cat.name],
        "weights": banList.weights,
        "lifespans": banList.lifespans,
        "origins": banList.origins
      }) 
    }            
  }

  const addToWeightBanList = () => {
    if(!banList.weights.includes(cat.weight)) {
      setBanList({
        "names": banList.names,
        "weights": [...banList.weights, cat.weight],
        "lifespans": banList.lifespans,
        "origins": banList.origins
      })
    }
  }

  const addToLifeBanList = () => {
    if(!banList.lifespans.includes(cat.lifespan)) {
      setBanList({
        "names": banList.names,
        "weights": banList.weights,
        "lifespans": [...banList.lifespans, cat.lifespan],
        "origins": banList.origins
      })
    }
  }

  const addToOriginBanList = () => {
    if(!banList.origins.includes(cat.origin)) {
      setBanList({
        "names": banList.names,
        "weights": banList.weights,
        "lifespans": banList.lifespans,
        "origins": [...banList.origins, cat.origin]
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
        <h3>Cat</h3>
        {cat ? (
          <div>
            <img src={cat.url} alt='cat image' className='image'/>
            <div className="tags">
              <Tag onClick={addToNameBanList}>{cat.name}</Tag>
              <Tag onClick={addToWeightBanList}>{cat.weight}</Tag>
              <Tag onClick={addToLifeBanList}>{cat.lifespan}</Tag>
              <Tag onClick={addToOriginBanList}>{cat.origin}</Tag>
            </div>
          </div>
        ):
        ""}
        <button onClick={getRandomImage}>Discover</button>
      </div>
      <div className='ban-list'>
        <h3>Ban List</h3>
        {banList.names.length !== 0 ? (
            banList.names.map((name, key) => {
              return (
                <Tag key={key}>{name}</Tag>
              )
            })
          ): ""}
          {banList.weights.length !== 0 ? (
            banList.weights.map((weight, key) => {
              return (
                <Tag key={key}>{weight}</Tag>
              )
            })
          ): ""}
          {banList.lifespans.length !== 0 ? (
            banList.lifespans.map((lifespan, key) => {
              return (
                <Tag key={key}>{lifespan}</Tag>
              )
            })
          ): ""}
          {banList.origins.length !== 0 ? (
            banList.origins.map((origin, key) => {
              return (
                <Tag key={key}>{origin}</Tag>
              )
            })
          ): ""}
      </div>
    </div>
  )
}

export default App
