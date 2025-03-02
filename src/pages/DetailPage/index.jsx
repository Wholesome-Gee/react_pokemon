import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function DetailPage() {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const pokemonId = useParams().id
  // params.id = 포켓몬 id
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
  useEffect(()=>{
    fetchPokemonData()
  },[])

  async function fetchPokemonData() {
    const url = `${baseUrl}${pokemonId}`
    try {
      const { data:pokemonData } = await axios.get(url)
      if( pokemonData ){
        const { name, id, types, weight, height, stats, abilities } = pokemonData;
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
        const DamageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get(i.type.url);
            return type.data.damage_relations
          })
        )

        const formattedPokemonData = {
          id,
          name,
          weight: weight / 10,
          height: height / 10,
          previous: nextAndPreviousPokemon.previous,
          next: nextAndPreviousPokemon.next,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          DamageRelations
        }

        setPokemon(formattedPokemonData);
        setIsLoading(false);
        console.log(formattedPokemonData);
        
      }
    } catch(error){
      console.log(error);
    }
  }

  const formatPokemonAbilities = (abilities) => {
    return abilities.filter((ability,index)=>{ return index <=1 })
                    .map((item)=>{ return item.ability.name.replaceAll('-',' ') })
  }

  const formatPokemonStats = ([statHP,statATK,statDEP,statSATK,statSDEP,statSPD]) => {
    return [
      { name: 'Hit Points', baseStats: statHP.base_stat },
      { name: 'Attack', baseStats: statATK.base_stat },
      { name: 'Defense', baseStats: statDEP.base_stat },
      { name: 'Special Attack', baseStats: statSATK.base_stat },
      { name: 'Special Defense', baseStats: statSDEP.base_stat },
      { name: 'Speed', baseStats: statSPD.base_stat },
    ]

  }

  async function getNextAndPreviousPokemon(id) {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id-1}`;
    const { data:pokemonData } = await axios.get(urlPokemon)
    const nextResponse = pokemonData.next && (await axios.get(pokemonData.next))
    const previousResponse = pokemonData.next && (await axios.get(pokemonData.previous))
    return {
      next: nextResponse?.data?.results?.[0]?.name,
      previous: previousResponse?.data?.results?.[0]?.name,
    }
  }
  
  if(isLoading) return <div>Loading...</div>

  return (
    <div>Detail Pages</div>
  )
}

export default DetailPage