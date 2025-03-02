import React from "react"
import { useEffect, useState } from 'react'
import axios from "axios"
import LazyImage from "./LazyImage"
import { Link } from "react-router-dom"

function PokeCard({url, name}) {
  // state
  const [pokemon, setPokemon] = useState()

  // 1번
  useEffect(()=>{
    fetchPokeDetailData()
  },[])

  // 2번
  async function fetchPokeDetailData() {
    try {
      const response = await axios.get(url)
      // console.log(response.data);
      let pokeData = formatPokemonData(response.data);
      //4번 실행행
      setPokemon(pokeData)
    } catch (error) {
      console.log(error.message);
    }
  }

  // 3번 ( 받아온 data에서 필요한 옵션으로만 formatting 후 다시 객체로 리턴 )
  function formatPokemonData(params) {
    let { id, types, name } = params
    let pokeData = {
      id,
      name,
      type: types[0].type.name
    }
    return pokeData
  }

  // 5번 실행
  const bg = `bg-${pokemon?.type}`
  const border = `border-${pokemon?.type}`
  const text = `text-${pokemon?.type}`
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  return (
    
    <>
      {pokemon &&
        <Link 
          to={`/pokemon/${name}`} 
          className={`pokeCard box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center`}
        >
          <div
            className={`pokeCard_id ${text} h-[1.5rem] text-xs w-full pt-1 px-2 text-right rounded-t-lg`}
          >
            #{pokemon.id.toString().padStart(3,'00')}
          </div>
          <div className={`pokeCard_contents w-full f-6 flex flex-col items-center justify-center`}>
            <div className={`contents_img box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}>
              <LazyImage url={img} alt={name}></LazyImage>
            </div>
            <div className={`${bg} text-xs text-zinc-100 text-center w-full h-[1.5rem] rounded-b-lg uppercase font-medium pt-1`}>
              {pokemon.name}
            </div>
          </div>
        </Link>
      }
    </>
  )
}

export default PokeCard