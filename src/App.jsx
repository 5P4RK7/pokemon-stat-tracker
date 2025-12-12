import { useState } from "react";
import "./App.css";
import Axios from "axios";
import TitleSection from "./components/TitleSection";
import Display from "./components/Display";
import Autocomplete from "./components/Autocomplete";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [chosen, setChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    special_attack: "",
    special_defense: "",
    speed: "",
    type1: "",
    type2:"",
  });

  const searchPokemon = (name) => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          special_attack: response.data.stats[3].base_stat,
          special_defense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type1: response.data.types[0].type.name,
          type2: response.data.types[1] ? response.data.types[1].type.name : null,
        });
        setChosen(true);
      }
    );
  };

  return (
    <div className='App'>
      <TitleSection/>

     <Autocomplete
  pokemonName={pokemonName}
  setPokemonName={setPokemonName}
  searchPokemon={searchPokemon}
/>


      <Display chosen={chosen} pokemon={pokemon} />
    </div>
  );
}

export default App;
