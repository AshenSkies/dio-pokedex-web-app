const listObject = document.getElementById("pokelist")
const loadMoreObject = document.getElementById("loadMore")
const attributesPage = document.getElementById("attributes")
let pageSize = 10
let pageOffset = 0
let attributesView = false

loadPage(pageOffset, pageSize)
loadAttributes()

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

function loadAttributes(id = 1) {
	const attributesSection = document.getElementById("attributes")
	const attributesName = document.getElementById("attrName")
	const attributesImage = document.getElementById("attrImage")
	const attributesID = document.getElementById("attrID")
	const attributesTypes = attributesSection.getElementsByClassName("types")[0]
	const attributesDescription = document.getElementById("attrDescription")
	const attributesSpecies = document.getElementById("attrSpecies")
	const attributesAbilities = document.getElementById("attrAbilities")
	const attributesShape = document.getElementById("attrShape")
	const attributesRarity = document.getElementById("attrRarity")

	PokeAPI.getPokemons(id-1, 1).then((res) => {
		let poke = res[0]
		let rarity;
		attributesName.innerHTML = capitalizeFirstLetter(poke.name)
		attributesImage.src = poke.image
		attributesID.innerHTML = `#${normalizeNumberLength(poke.id, 3)}`
		attributesTypes.innerHTML = `${poke.types.map((type) => `<li class="${type}" style="background-color:${typeColors[type]}">${capitalizeFirstLetter(type)}</li>`).join("")}`
		attributesSection.style.backgroundColor = poke.accentColor
		attributesDescription.innerHTML = poke.flavorText
		attributesSpecies.innerHTML = poke.species
		attributesAbilities.innerHTML = poke.abilities.join("; <br>")
		attributesShape.innerHTML = capitalizeFirstLetter(poke.shape)
		if(poke.mythical) rarity = "Mythical"
		else if(poke.legendary) rarity = "Legendary"
		else rarity = "Regular"
		attributesRarity.innerHTML = rarity
		
	})
	document.body.scrollTop = 0;
  	document.documentElement.scrollTop = 0;
}

loadMoreObject.addEventListener("click", () => {
	pageOffset += pageSize
	loadPage(pageOffset, pageSize)
})