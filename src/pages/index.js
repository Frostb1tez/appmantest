import React from 'react'
import { Card } from '../components'
import { usePokemon } from '../context/pokemonContext'

const HomePage = () => {
  const {
    state: { myList },
  } = usePokemon()
  return (
    <div className="row">
      {myList.length > 0 &&
        myList.map((v) => (
          <div key={v.id} className="col-6">
            <Card data={v} deleted={true} />
          </div>
        ))}
    </div>
  )
}

export default HomePage
