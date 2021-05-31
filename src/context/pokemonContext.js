import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const PokemonContext = createContext(null)

const initialState = {
  pokemonList: [],
  myList: [],
}

const type = [
  'Psychic',
  'Fighting',
  'Fairy',
  'Normal',
  'Grass',
  'Metal',
  'Water',
  'Lightning',
  'Darkness',
  'Colorless',
  'Fire',
]

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'GET_POKEMON':
      if (prevState.myList.length !== 0) {
        const newMap = action.pokemonList.filter(
          ({ id: id1 }) => !prevState.myList.some(({ id: id2 }) => id2 === id1)
        )
        return {
          ...prevState,
          pokemonList: newMap,
        }
      }
      return {
        ...prevState,
        pokemonList: action.pokemonList,
      }
    case 'ADD_MYLIST':
      const pokemonSelected = prevState.pokemonList.find((item) => item.id === action.id)
      const pokemonList = prevState.pokemonList.filter((item) => item.id !== action.id)
      const myList = [...prevState.myList, pokemonSelected]
      return {
        pokemonList,
        myList,
      }
    case 'DEL_MYLIST':
      const mySelected = prevState.myList.find((item) => item.id === action.id)
      const myListNew = prevState.myList.filter((item) => item.id !== action.id)
      const pokemonListNew = [...prevState.pokemonList, mySelected]
      return {
        pokemonList: pokemonListNew,
        myList: myListNew,
      }
    default:
      throw new Error()
  }
}

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    pokemonContext.getList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const pokemonContext = useMemo(
    () => ({
      getList: async (keyword) => {
        try {
          const isType = keyword
            ? type.some((v) => v === keyword.charAt(0).toUpperCase() + keyword.slice(1))
            : false
          const res = await axios
            .get(`http://localhost:3030/api/cards`, {
              params: {
                name: isType ? undefined : keyword ? keyword : undefined,
                type: isType ? keyword : undefined,
              },
            })
            .then((res) => res.data.cards)
          const newData = res.map((item) => {
            const percentHealth = item.hp >= 100 ? 100 : item.hp < 100 ? +item.hp : 0
            const percentStrength = item.attacks
              ? item.attacks.length > 0
                ? item.attacks.length * 50
                : 0
              : 0
            const percentWeakness = item.weaknesses
              ? item.weaknesses.length > 0
                ? item.weaknesses.length * 100
                : 0
              : 0
            const damage = item.attacks
              ? item.attacks
                  .map((skill) => (skill.damage ? parseInt(skill.damage) : 0))
                  .reduce((prev, curr) => prev + curr, 0)
              : 0
            const happiness = Math.round(
              (percentHealth / 10 + damage / 10 + 10 - percentWeakness / 100) / 5
            )
            return {
              ...item,
              percentHealth,
              percentStrength,
              percentWeakness,
              damage,
              happiness,
            }
          })
          dispatch({ type: 'GET_POKEMON', pokemonList: newData })
        } catch (e) {
          console.log(e)
          alert(e)
        }
      },
      addList: async (id) => {
        try {
          dispatch({ type: 'ADD_MYLIST', id })
        } catch (e) {
          console.log(e)
          alert(e)
        }
      },
      deleteList: async (id) => {
        try {
          dispatch({ type: 'DEL_MYLIST', id })
        } catch (e) {
          console.log(e)
          alert(e)
        }
      },
    }),
    []
  )
  return (
    <PokemonContext.Provider value={{ state, pokemonContext }}>{children}</PokemonContext.Provider>
  )
}

PokemonProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export const usePokemon = () => {
  const context = useContext(PokemonContext)
  if (!context) {
    throw new Error('useAuth can be use in AuthContext only')
  }
  return context
}
