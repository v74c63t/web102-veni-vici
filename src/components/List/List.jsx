import './List.css'
import Tag from '../Tag/Tag'

const List = ({className, title, list, removeFromBanList}) => {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {list.length !== 0 ? (
        title === 'Seen' ? (
          list.map((seenCat, key) => {
            return (
              <div key={key}>
                <img src={seenCat.url} alt='cat image' className='seen'/>
                <div>{seenCat.desc}</div>
              </div>
            )
        })) : title === 'Ban List'  ? (
          list.map((bannedVal, key) => {
            return (
              <Tag key={key} onClick={() => removeFromBanList(bannedVal)}>{bannedVal}</Tag>
            )
          })
        ): ""     
      ): ""}
    </div>
  )
}

export default List