import StatsChart from "./StatsChart";
import ErrorBoundary from "./ErrorBoundary";
import DefenseChart from "./DefenseChart";
import OffenseChart from "./OffenseChart";


function Display({ chosen, pokemon }) {
  return (
    <div className="Display">
      {!chosen ? (
        <h1></h1>
      ) : (
        <>
          <div className="pokemon-header">
  <h1 style={{ textTransform: "capitalize" }}>{pokemon.name}</h1>

  {pokemon.type1 && (
    <div className="type-tooltip" data-tip={pokemon.type1}>
      <img
        src={`/types/${pokemon.type1}.png`}
        alt={pokemon.type1}
        className="type-img"
      />
    </div>
  )}

  {pokemon.type2 && (
    <div className="type-tooltip" data-tip={pokemon.type2}>
      <img
        src={`/types/${pokemon.type2}.png`}
        alt={pokemon.type2}
        className="type-img"
      />
    </div>
  )}
</div>

          <img src={pokemon.img} alt={pokemon.name} className="pokemon-sprite" />
            
          <ErrorBoundary>
            <StatsChart pokemon={pokemon} />
          </ErrorBoundary>
          <DefenseChart type1={pokemon.type1} type2={pokemon.type2} />
          <OffenseChart type1={pokemon.type1} type2={pokemon.type2} />
        </>
      )}
    </div>
  );
}

export default Display;