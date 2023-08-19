const listObject = document.getElementById("pokelist")
const loadMoreObject = document.getElementById("loadMore")
let pageSize = 10
let pageOffset = 0

loadPage(pageOffset, pageSize)

function manualUpdate(a, b) {
	PokeAPI.getPokemons(a, b).then((pokemonList = []) => {
		listObject.innerHTML = pokemonList.map(pokemonsToHTML).join("")
	})
}

function loadPage(offset, size) {
	return PokeAPI.getPokemons(offset, size).then((pokemonList = []) => {
		listObject.innerHTML += pokemonList.map(pokemonsToHTML).join("")
	})
}

loadMoreObject.addEventListener("click", () => {
	pageOffset += pageSize
	loadPage(pageOffset, pageSize)
})