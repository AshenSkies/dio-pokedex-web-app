const PokeAPI = {}

PokeAPI.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
	    .then((response) => response.json())
	    .then((jsonBody) => jsonBody.results)
        .then((pokeCollection) => pokeCollection.map(PokeAPI.getPokeDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokeDetails) => pokeDetails)
}

PokeAPI.getPokeDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(pokemonObjectToClass)
}