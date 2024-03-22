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
    if(banList.names.includes(data.breeds[0].name)){
      console.log(data.breeds[0].name, 'in name ban list so reroll')
      getRandomImage()
    }
    else if(banList.weights.includes(data.breeds[0].weight.imperial)) {
      console.log(`${data.breeds[0].weight.imperial} lbs`, 'in weight ban list so reroll')
      getRandomImage()
    }
    else if(banList.lifespans.includes(data.breeds[0].life_span)) {
      console.log(`${data.breeds[0].life_span} years`, 'in lifespan ban list so reroll')
      getRandomImage()
    }
    else if(banList.origins.includes(data.breeds[0].origin)) {
      console.log(data.breeds[0].origin, 'in origin ban list so reroll')
      getRandomImage()
    }
    else {
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

  const removeFromNameBanList = (name) => {
    const index = banList.names.indexOf(name)
    console.log(banList.names.splice(index, 1))
    if(index > -1) {
      setBanList({
        "names": banList.names.filter((_, i) => i !== index),
        "weights": banList.weights,
        "lifespans": banList.lifespans,
        "origins": banList.origins
      }) 
    }            
  }

  const removeFromWeightBanList = (weight) => {
    const index = banList.weights.indexOf(weight)
    if(index > -1) {
      setBanList({
        "names": banList.names,
        "weights": banList.weights.filter((_, i) => i !== index),
        "lifespans": banList.lifespans,
        "origins": banList.origins
      })
    }
  }

  const removeFromLifeBanList = (lifespan) => {
    const index = banList.lifespans.indexOf(lifespan)
    if(index > -1) {
      setBanList({
        "names": banList.names,
        "weights": banList.weights,
        "lifespans": banList.lifespans.filter((_, i) => i !== index),
        "origins": banList.origins
      })
    }
  }

  const removeFromOriginBanList = (origin) => {
    const index = banList.origins.indexOf(origin)
    if(index > -1) {
      setBanList({
        "names": banList.names,
        "weights": banList.weights,
        "lifespans": banList.lifespans,
        "origins": banList.origins.filter((_, i) => i !== index)
      })
    }
  }

  return (
    <div>
      <div className='seen-list'>
        <h2>Seen</h2>
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
      <div className='cat'>
        <h2>Cat</h2>
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
      <div className='ban-list'>
        <h2>Ban List</h2>
        {banList.names.length !== 0 ? (
            banList.names.map((name, key) => {
              return (
                <Tag key={key} onClick={() => removeFromNameBanList(name)}>{name}</Tag>
              )
            })
          ): ""}
          {banList.weights.length !== 0 ? (
            banList.weights.map((weight, key) => {
              return (
                <Tag key={key} onClick={() => removeFromWeightBanList(weight)}>{weight} lbs</Tag>
              )
            })
          ): ""}
          {banList.lifespans.length !== 0 ? (
            banList.lifespans.map((lifespan, key) => {
              return (
                <Tag key={key} onClick={() => removeFromLifeBanList(lifespan)}>{lifespan} years</Tag>
              )
            })
          ): ""}
          {banList.origins.length !== 0 ? (
            banList.origins.map((origin, key) => {
              return (
                <Tag key={key} onClick={() => removeFromOriginBanList(origin)}>{origin}</Tag>
              )
            })
          ): ""}
      </div>
    </div>
  )
}

export default App
