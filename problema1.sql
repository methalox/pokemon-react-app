-- Devolver el número de Pokémon que ha capturado cada entrenador
SELECT t.id, t.name, COUNT(*)
FROM trainer t
JOIN trainer_pokedex tp ON t.id = tp.trainer_id
GROUP BY t.id, t.name;

-- Devolver los pokémon de tipo Electric que haya capturado Ash Ketchum
SELECT p.id, p.level, ps.name, tp.captured_at
FROM pokemon p
JOIN pokemon_species ps ON p.pokemon_species_id = ps.id
JOIN trainer_pokedex tp ON p.id = tp.pokemon_id
JOIN trainer t ON tp.trainer_id = t.id
JOIN pokemon_species_type pst ON ps.id = pst.pokemon_species_id
JOIN pokemon_type pt ON pst.pokemon_type = pt.type
WHERE t.id = 1
AND pt.type = 'Electric';

-- Devolver último pokémon que haya capturado Brock
SELECT p.id, p.level, ps.name, tp.captured_at
FROM pokemon p
JOIN pokemon_species ps ON p.pokemon_species_id = ps.id
JOIN trainer_pokedex tp ON p.id = tp.pokemon_id
JOIN trainer t ON tp.trainer_id = t.id
WHERE t.id = 2
AND tp.captured_at = (
    SELECT MAX(captured_at)
    FROM trainer_pokedex
    WHERE trainer_id = t.id
);
