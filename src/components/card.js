import React from 'react'
import Progressbar from './progressbar'
import { usePokemon } from '../context/pokemonContext'
import PropTypes from 'prop-types'
import smile from '../cute.png'

const Card = ({ data, deleted = false }) => {
  const {
    pokemonContext: { addList, deleteList },
  } = usePokemon()
  const inlineStyle = !deleted ? { margin: 10 } : { margin: '10px 0' }
  const inlineWidth = !deleted ? { width: '15%' } : { width: '30%' }
  return (
    <div className="card">
      {deleted ? (
        <span className="text-add" onClick={() => deleteList(data.id)}>
          X
        </span>
      ) : (
        <span className="text-add" onClick={() => addList(data.id)}>
          Add
        </span>
      )}
      <img src={data.imageUrl} style={{ width: 200 }} />
      <div className="card-content" style={deleted ? { padding: '0 10px' } : {}}>
        <h2>{data.name}</h2>
        <div className="d-flex" style={inlineStyle}>
          <span style={inlineWidth}>HP </span>
          <Progressbar percent={data.percentHealth} />
        </div>
        <div className="d-flex" style={inlineStyle}>
          <span style={inlineWidth}>STR </span>
          <Progressbar percent={data.percentStrength} />
        </div>
        <div className="d-flex" style={inlineStyle}>
          <span style={inlineWidth}>WEAK </span>
          <Progressbar percent={data.percentWeakness} />
        </div>
        {[...Array(data.happiness)].map((_, i) => (
          <img key={i} src={smile} width={40} />
        ))}
      </div>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  deleted: PropTypes.bool,
}

export default Card
