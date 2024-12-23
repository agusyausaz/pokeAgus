const tipoImagenes = {
    "normal": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/99/latest/20221208180705/Tipo_normal_EP.png/80px-Tipo_normal_EP.png",
    "fire": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/c/c0/latest/20221208180625/Tipo_fuego_EP.png/80px-Tipo_fuego_EP.png",
    "water": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/59/latest/20221208180426/Tipo_agua_EP.png/80px-Tipo_agua_EP.png",
    "steel": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/52/latest/20221208180543/Tipo_acero_EP.png/80px-Tipo_acero_EP.png",
    "bug": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/5d/latest/20221208180434/Tipo_bicho_EP.png/80px-Tipo_bicho_EP.png",
    "dragon": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/b/b8/latest/20221208180443/Tipo_drag%C3%B3n_EP.png/80px-Tipo_drag%C3%B3n_EP.png",
    "electric": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/38/latest/20221208180452/Tipo_el%C3%A9ctrico_EP.png/80px-Tipo_el%C3%A9ctrico_EP.png",
    "ghost": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/03/latest/20221208180503/Tipo_fantasma_EP.png/80px-Tipo_fantasma_EP.png",
    "fairy": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/97/latest/20221208180633/Tipo_hada_EP.png/80px-Tipo_hada_EP.png",
    "ice": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/17/latest/20221208180641/Tipo_hielo_EP.png/80px-Tipo_hielo_EP.png",
    "fighting": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/5f/latest/20221208180651/Tipo_lucha_EP.png/80px-Tipo_lucha_EP.png",
    "grass": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/a7/latest/20221208180710/Tipo_planta_EP.png/80px-Tipo_planta_EP.png",
    "psychic": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/9b/latest/20221208180717/Tipo_ps%C3%ADquico_EP.png/80px-Tipo_ps%C3%ADquico_EP.png",
    "rock": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/8/88/latest/20221208180726/Tipo_roca_EP.png/80px-Tipo_roca_EP.png",
    "dark": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/de/latest/20221208180734/Tipo_siniestro_EP.png/80px-Tipo_siniestro_EP.png",
    "poison": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/11/latest/20221208180751/Tipo_veneno_EP.png/80px-Tipo_veneno_EP.png",
    "flying": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/9a/latest/20221208180800/Tipo_volador_EP.png/80px-Tipo_volador_EP.png",
    "ground": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/c/c9/latest/20221208180742/Tipo_tierra_EP.png/80px-Tipo_tierra_EP.png",
};

const listaPokemon = document.getElementById("listaPokemon");
const paginacion = document.getElementById("paginacion");
const searchInput = document.getElementById("searchInput");
const destacadosContainer = document.getElementById("destacados");


let URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
let pokemons = [];
let pokemonsFiltrados = [];
const pokemonsPorPagina = 10;

async function cargarTodosLosPokemon() {
    for (let i = 1; i <= 151; i++) {
        const response = await fetch(URL_POKEMON + i);
        const data = await response.json();
        pokemons.push(data);
    }
    console.log(pokemons);
    mostrarPagina(1); 
    crearPaginacion();
    cargarDestacados(); 
}

function mostrarPokemon(pokemon, container) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    const pokemonNumber = document.createElement("p");
    pokemonNumber.classList.add("pokemon-number");
    pokemonNumber.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;

    const pokemonName = document.createElement("p");
    pokemonName.classList.add("pokemon-name");
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const pokemonTypesContainer = document.createElement("div");
    pokemonTypesContainer.classList.add("pokemon-types");

    pokemon.types.forEach((type) => {
        const tipoImagen = document.createElement("img");
        tipoImagen.src = tipoImagenes[type.type.name];
        tipoImagen.alt = type.type.name;
        tipoImagen.classList.add("tipo-imagen");
        pokemonTypesContainer.appendChild(tipoImagen);
    });

    const statsTotal = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);

    const pokemonStats = document.createElement("p");
    pokemonStats.classList.add("pokemon-stats");
    pokemonStats.textContent = `Total Stats: ${statsTotal}`;

    const btnAddToCart = document.createElement("button");
    btnAddToCart.classList.add("btn-add-carrito");
    btnAddToCart.textContent = "Agregar al carrito";

    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonNumber);
    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonTypesContainer);
    pokemonCard.appendChild(pokemonStats);
    pokemonCard.appendChild(btnAddToCart);

    container.appendChild(pokemonCard);
}

async function cargarDestacados() {
    const pokemonsDestacados = [];
    for (let i = 1; i <= 6; i++) {
        const response = await fetch(URL_POKEMON + i);
        const data = await response.json();
        pokemonsDestacados.push(data);
    }

    console.log(pokemonsDestacados);

    destacadosContainer.innerHTML = ""; 
    pokemonsDestacados.forEach((pokemon) => mostrarPokemon(pokemon, destacadosContainer));
}

function mostrarPagina(numeroPagina) {
    listaPokemon.innerHTML = "";
    const inicio = (numeroPagina - 1) * pokemonsPorPagina;
    const fin = inicio + pokemonsPorPagina;
    const pokemonsPagina = pokemons.slice(inicio, fin);

    pokemonsPagina.forEach((pokemon) => mostrarPokemon(pokemon, listaPokemon));
}

function crearPaginacion() {
    paginacion.innerHTML = "";
    const totalPaginas = Math.ceil(pokemons.length / pokemonsPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = document.createElement("button");
        botonPagina.textContent = i;
        botonPagina.classList.add("boton-pagina");
        botonPagina.addEventListener("click", () => mostrarPagina(i));
        paginacion.appendChild(botonPagina);
    }
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    pokemonsFiltrados = pokemons.filter(pokemon => {
        const pokemonNumber = `#${pokemon.id.toString().padStart(3, '0')}`;
        const pokemonName = pokemon.name.toLowerCase();
        
        return pokemonNumber.includes(query) || pokemonName.includes(query);
    });

    mostrarPaginaFiltrados(1);
    crearPaginacionFiltrados();
});

function mostrarPaginaFiltrados(numeroPagina) {
    listaPokemon.innerHTML = "";
    const inicio = (numeroPagina - 1) * pokemonsPorPagina;
    const fin = inicio + pokemonsPorPagina;
    const pokemonsPagina = pokemonsFiltrados.slice(inicio, fin);

    pokemonsPagina.forEach((pokemon) => mostrarPokemon(pokemon, listaPokemon));
}

function crearPaginacionFiltrados() {
    paginacion.innerHTML = "";
    const totalPaginas = Math.ceil(pokemonsFiltrados.length / pokemonsPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = document.createElement("button");
        botonPagina.textContent = i;
        botonPagina.classList.add("boton-pagina");
        botonPagina.addEventListener("click", () => mostrarPaginaFiltrados(i));
        paginacion.appendChild(botonPagina);
    }
}

cargarTodosLosPokemon();


