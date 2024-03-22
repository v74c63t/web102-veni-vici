import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Tag from './components/Tag/Tag'
import List from './components/List/List'
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
      setSeen([...seen, seenData])
    }
  }


  const addToBanList = (bannedVal) => {
    console.log(`${bannedVal} added to ban list`)
    setBanList([...banList, bannedVal])
  }

  const removeFromBanList = (bannedVal) => {
    const index = banList.indexOf(bannedVal)
    if(index > -1) {
      console.log(`${bannedVal} removed from ban list`)
      setBanList(banList.filter((_, i) => i !== index))
    }
  }

  return (
    <div>
      <List className={'seen-list'} title={'Seen'} list={seen} />
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
        <button className='discover' onClick={getRandomImage}>Discover</button>
      </div>
      <List className={'ban-list'} title={'Ban List'} list={banList} removeFromBanList={removeFromBanList} />
    </div>
  )
}

export default App
