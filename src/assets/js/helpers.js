const typeColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD'
}

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function normalizeNumberLength(num, length = 3) {
    var res = num.toString()
    while (res.length < length) res = "0" + res
    return res
}

function pickAccentColor(e){
    if(e.length > 1) return mixColors(typeColors[e[0]], typeColors[e[1]], 0.2)
    else return mixColors(typeColors[e[0]], "c0c0c0", 0.5)
}

function mixColors(colorA, colorB, threshold) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16))
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16))
    const r = Math.round(rA + (rB - rA) * threshold).toString(16).padStart(2, '0')
    const g = Math.round(gA + (gB - gA) * threshold).toString(16).padStart(2, '0')
    const b = Math.round(bA + (bB - bA) * threshold).toString(16).padStart(2, '0')
    return '#' + r + g + b;
}

function filterEnglish(pokeEntries) {
    let res = []
    pokeEntries.forEach(element => {
        if(element.language.name == "en") res.push(element)
        //console.log(res.pop())
    });
    return res.pop()
}

function pokemonObjectToClass(poke){
    const pokemon = new Pokemon()
    pokemon.name = poke.name
    pokemon.id = poke.id
    pokemon.image = poke.sprites.other.dream_world.front_default
    pokemon.types = poke.types.map((typeCollection) => typeCollection.type.name)
    pokemon.abilities = poke.abilities.map((abilityCollection) => capitalizeFirstLetter(abilityCollection.ability.name))
    pokemon.accentColor = pickAccentColor(pokemon.types)
    pokemon.flavorText = filterEnglish(poke.flavor_text_entries).flavor_text
    pokemon.species = filterEnglish(poke.genera).genus
    pokemon.shape = poke.shape.name
    pokemon.legendary = poke.is_legendary
    pokemon.mythical = poke.is_mythical
    return pokemon
}

function pokemonsToHTML(pokemon) {
	return `
		<li class="pokemon" style="background-color:${pokemon.accentColor}" onclick="loadAttributes(${pokemon.id})">
            <div class="details">
                <h4>#${normalizeNumberLength(pokemon.id)}</h4>
                <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="${type}" style="background-color:${typeColors[type]}">${capitalizeFirstLetter(type)}</li>`).join("")}
                </ol>
            </div>
            <div class="image">
                <img src="${pokemon.image}">
            </div>
        </li>
	`
}