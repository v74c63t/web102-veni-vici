import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Tag from './components/Tag/Tag'
const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [cat, setCat] = useState(null)
  const [seen, setSeen] = useState([])
  const [banList, setBanList] = useState([])

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
    if(banList.includes(data.breeds[0].name)){
      console.log(data.breeds[0].name, 'in ban list so reroll')
      getRandomImage()
    }
    else if(banList.includes(`${data.breeds[0].weight.imperial} lbs`)) {
      console.log(`${data.breeds[0].weight.imperial} lbs`, 'in ban list so reroll')
      getRandomImage()
    }
    else if(banList.includes(`${data.breeds[0].life_span} years`)) {
      console.log(`${data.breeds[0].life_span} years`, 'in ban list so reroll')
      getRandomImage()
    }
    else if(banList.includes(data.breeds[0].origin)) {
      console.log(data.breeds[0].origin, 'in ban list so reroll')
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


  const addToBanList = (bannedVal) => {
    setBanList([...banList, bannedVal])
  }

  const removeFromBanList = (bannedVal) => {
    const index = banList.indexOf(bannedVal)
    if(index > -1) {
      setBanList(banList.filter((_, i) => i !== index))
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
              <Tag onClick={() => addToBanList(cat.name)}>{cat.name}</Tag>
              <Tag onClick={() => addToBanList(`${cat.weight} lbs`)}>{cat.weight} lbs</Tag>
              <Tag onClick={() => addToBanList(`${cat.lifespan} years`)}>{cat.lifespan} years</Tag>
              <Tag onClick={() => addToBanList(cat.origin)}>{cat.origin}</Tag>
            </div>
          </div>
        ):
        ""}
        <button onClick={getRandomImage}>Discover</button>
      </div>
      <div className='ban-list'>
        <h2>Ban List</h2>
        {banList.length !== 0 ? (
          banList.map((bannedVal, key) => {
            return (
              <Tag key={key} onClick={() => removeFromBanList(bannedVal)}>{bannedVal}</Tag>
            )
          })
        ): ""}
      </div>
    </div>
  )
}

export default App
