import {useState, useEffect} from 'react'

function App() {

  const [pokemons, setPokemons] = useState([])

  const indexFormatter = (index) => {
    let number = index.toString();
    switch(number.length){
      case 1:
        number = '#00'+number;
        break;
      case 2:
        number = '#0'+number;
        break;
      case 3:
        number = '#'+number;
        break;
    }
    return number;
  }

  const getType = (type) => {
    return 'card ' + type
  }

  useEffect(()=>{
    // const getPokemonInformation = async() => {
    //   await fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
    //   .then(response => response.json())
    //   .then(pokemon => setPokemons([...pokemon.results]))
    // }
    // getPokemonInformation();

    // const getPokemonInformation2 = () => {
    //   for (let index = 1; index < 151; index++) {
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    //     .then(data => data.json())
    //     .then(poke => setPokemons([...pokemons, poke]))
    //   }
    // }

    // getPokemonInformation2()

    // const getPokemonInformation3 = async() => {
    //     for (let index = 1; index < 151; index++) {
    //       await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    //       .then(data => data.json())
    //       .then(poke => setPokemons(prev => [...prev, poke]))
    //     }
    //   }
  
    //   getPokemonInformation3()

    const getPokemonInformation = () => {
      let pokeFetchs = []
      for (let index = 1; index < 151; index++) {
        pokeFetchs.push(`https://pokeapi.co/api/v2/pokemon/${index}/`)
      }
      let request = pokeFetchs.map(url => fetch(url).then(res => res.json()));

      Promise.all(request).then(res => {
        setPokemons([...res])
      })
    }

    getPokemonInformation()
  },[])

  return (
    <div className="app">
      <h1>Pokedex</h1>
      <div className='poke-container'>
        {pokemons.map((pokemon, index) => {
          return( <div className={getType(pokemon.types[0].type.name)} key={index}>
            <img src={pokemon.sprites.front_default} className='poke-picture'/>
            <span className='poke-index'>{indexFormatter(pokemon.id)}</span>
            <h1 className='poke-name'>{pokemon.name}</h1>
            <p className='poke-type'>Type: {pokemon.types[0].type.name}</p>
          </div> )
        })}
      </div>
    </div>
  );
}

export default App;
