"use client";

import { useState, useEffect } from "react";

const Home: React.FC = () => {
  // Having two states for pokemonList, one filtered and one unfiltered is a bad practice. Whenever you have "derived" states
  // from another state, it's best to calculate them at the time of use, not to have them duplicated in the state.
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  const [search, setSearch] = useState(""); // Typescript infers that this state is a string, there's no need to be explicit

  // This state is really if it's sorted ascending or descending, not if it's sorted or not.
  const [isSortedAsc, setIsSortedAsc] = useState(true); // Typescript infers that this state is a boolean, there's no need to be explicit

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();
        const results = data.results.map(
          (pokemon: { name: string }) => pokemon.name
        );
        setPokemonList(results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // filteredPokemonList is no longer a state variable, it's calculated on each render.
  // If this were something costly and we had more state variables that trigger re-renders
  // it could be optimized with useMemo, but that's not the case.
  // Debouncing the search input would also be a good idea, use-debounce is a good library for that.
  const filteredPokemonList = pokemonList
    .filter((pokemon) => pokemon.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (isSortedAsc) {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleSort = () => {
    setIsSortedAsc((sorted) => !sorted);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="mr-2 p-2 rounded"
      />
      <button
        onClick={handleSort}
        className="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
      >
        {isSortedAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
      </button>
      <ul className="mt-4">
        {/* I miss a loading state or a "no results" message
        when there are no results. I also don't see what happens
        if the API call fails, the user is not informed */}
        {filteredPokemonList.map((pokemon) => (
          <li key={pokemon} className="mb-2">
            {pokemon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
