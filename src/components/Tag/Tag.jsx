import './Tag.css'

const Tag = ({onClick, children}) => {
  return (
    <button className='tag' onClick={onClick}>{children}</button>
  )
}

export default Tag