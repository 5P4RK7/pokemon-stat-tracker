import { useState, useEffect, useRef } from "react";

function Autocomplete({ pokemonName, setPokemonName, searchPokemon }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null); 

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
      .then((res) => res.json())
      .then((data) => setAllPokemon(data.results.map((p) => p.name)));
  }, []);

  useEffect(() => {
    if (!pokemonName.trim()) {
      setFiltered([]);
      return;
    }
    setFiltered(
      allPokemon
        .filter((name) =>
          name.toLowerCase().includes(pokemonName.toLowerCase())
        )
        .slice(0, 10)
    );
  }, [pokemonName, allPokemon]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="autocomplete-wrapper">
      <input
        ref={inputRef}
        type="text"
        className="autocomplete-input"
        value={pokemonName}
        placeholder="Search Pokémon..."
        onFocus={() => setShowList(true)}
        onChange={(e) => setPokemonName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchPokemon(pokemonName)}
      />

      {showList && filtered.length > 0 && (
        <ul className="autocomplete-list">
          {filtered.map((name) => (
            <li
              key={name}
              className="autocomplete-item"
              onMouseDown={(e) => {
                e.preventDefault(); 
                setPokemonName(name);
                searchPokemon(name);
                setShowList(true);
                inputRef.current.focus(); 
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;