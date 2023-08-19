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
    let data = [];
    let obj = {};
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((res) => {
            data.push(res)
            return res
        })
        .then(PokeAPI.getPokeAttributes)
        .then((res) => data.push(res))
        .then(() => {
            Object.assign(obj, data[0], data[1])
            return obj
        })
        .then(pokemonObjectToClass)
}

PokeAPI.getPokeAttributes = (pokemon) => {
    return fetch(pokemon.species.url)
        .then((response) => response.json())
        .then((pokeAttributes) => pokeAttributes)
}