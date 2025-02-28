import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import axios from 'axios';
import PokeCard from './components/PokeCard';
import useDebounce from './hooks/useDebounce';

function App() {
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  useEffect(()=>{
    fetchPokeData(true)
  },[])

  useEffect(()=>{
    handleSearchInput(debouncedSearchTerm)
  },[debouncedSearchTerm])
  
  // fetch가 처음으로 일어날때 (isFirstFetch = true), offsetValue는 0이 되고, 
  // limit과 offsetValue를 url에 반영시켜 데이터를 받아온 뒤, response변수에 담는다.
  // 이후, setPokemons()로 [] 이었던 pokemons에 response.data.results 배열을 구조분해할당(distucturing)으로 pokemons state에 넣는다.
  // 마지막으로, setOffset()으로 현재의 offsetValue를 넣어준다.
  
  //fetch가 2번쨰 일어날떄 (더보기 버튼 클릭시) jsx를 통해 isFirstFetch에는 false가 들어오게되며, 그에따라 offsetValue는 0+20이 된다.
  // limit은 20,offsetValue도 20이 되어 url에 담겨지고, url로 받아온 데이터는 response에 담긴다.
  // 기존에 있던 pokemons 배열과 response.data.results 배열이 합쳐지게 되고
  // setOffset으로 offset 값을 40으로 만들어준다.
  const fetchPokeData = async (isFirstFetch) => {
    try{
      const offsetValue = isFirstFetch ? 0 : offset+limit
      const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`;
      const response = await axios.get(pokeApiUrl)
      // console.log(response.data.results);
      setPokemons([...pokemons ,...response.data.results]);
      setOffset(offsetValue)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchInput= async (e) => {
    if (searchTerm.length > 0) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        const pokemonData = {
          url:`https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
          name:searchTerm
        }
        setPokemons([pokemonData])
      } catch (error) {
        setPokemons([]);
        console.log(error);
      }
    } else {
      fetchPokeData(true)
    }
  };

  return (
    <article className='pt-6'>
      <header className="flex flex-col items-center gap-2 w-full px-4 z-50">
        <div>
          <form className='relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto'>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e)=>{setSearchTerm(e.target.value)}}
              className='text-xs w-[20.5rem] h-6 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-lg text-gray-300 text-center'
            />
            <button 
              type='submit'
              className='text-xs bg-slate-900 text-slate-300 w[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700'
            >
              검색
            </button>
          </form>
        </div>
      </header>
      <section className='pt-6 flex flex-col justify-center items-center overflow-auto z-0'>
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {pokemons.length > 0 ? 
          (
            pokemons.map(({url,name}) => (
              <PokeCard key={url} url={url} name={name}/>
            ))
          ) : 
          (
            <h2 className='font-medium text-lg text-slate-900 mb-1'>
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        <button 
          className='bg-slate-800 px-6 py- my-4 text-base rounded-lg font-bold text-white'
          onClick={()=>{ fetchPokeData(false) }}
        >
          더 보기
        </button>
      </div>
    </article>
  )
}

export default App
