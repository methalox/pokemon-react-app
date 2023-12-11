'use client'

import { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sorted, setSorted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();

        const results = data.results.map((pokemon: { name: string }) => pokemon.name);
        setPokemonList(results);
        setFilteredPokemonList(results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchValue: string) => {
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
    setSearch(searchValue);
  };

  const handleSort = () => {
    setSorted((sorted) => !sorted);

    const sortedList = [...filteredPokemonList].sort();

    if (sorted) {
      sortedList.reverse();
    }

    setFilteredPokemonList(sortedList);
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
          {sorted ? 'Ordenar Z-A' : 'Ordenar A-Z'}
        </button>
        <ul className="mt-4">
          {filteredPokemonList.map((pokemon) => (
            <li key={pokemon} className="mb-2">{pokemon}</li>
          ))}
        </ul>
      </div>
  );
};

export default Home;