import React, { useState, Fragment } from 'react'
import Modal from './modal'
import Card from './card'
import { usePokemon } from '../context/pokemonContext'

const Footer = () => {
  const [isShow, setModal] = useState(false)
  const {
    state: { pokemonList },
    pokemonContext: { getList },
  } = usePokemon()

  return (
    <Fragment>
      <div className="footer">
        <div className="btn-add" onClick={() => setModal(true)}>
          <span style={{ fontSize: 75 }}>+</span>
        </div>
      </div>
      <Modal show={isShow} handleClose={() => setModal(false)}>
        <div style={{ padding: '5px 10px' }}>
          <div className="d-flex">
            <input
              type="text"
              onChange={(e) => getList(e.target.value)}
              placeholder="Find Pokemon"
            />
          </div>
          <div style={{ paddingTop: 20 }}>
            {pokemonList.length > 0 && pokemonList.map((v) => <Card key={v.id} data={v} />)}
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default Footer
