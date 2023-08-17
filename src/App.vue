<template>
  <main>
      <img :src="urlImage" v-if="urlImage != ''" alt="pokemon" class="pokemon__image" />

      <h1 class="pokemon__data">
        <span class="pokemon__number"> {{pokemon?.id}} </span> -
        <span class="pokemon__name"> {{pokemon?.name}} </span>
      </h1>

      <form @keydown.enter.prevent="handleSubmit" class="form">
        <input
        v-model="search"
          type="search"
          class="input__search"
          placeholder="Name or Number"
          required
        />
      </form>

      <div class="buttons">
        <button @click="handlePrev" class="button btn-prev">&lt; Prev</button>
        <button @click="handleNext" class="button btn-next">Next &gt;</button>
      </div>

      <img src="@/assets/pokedex.jpg" alt="pokedex" class="pokedex" />
    </main>
</template>

<script>

import pokeApi from './apis/models/pokeApi.js'

export default {
  name: 'App',
  
  data() {
    return {
      pokemon : null,
      search: 'pikachu', 
      urlImage: '',
      idx: null,
      error: null,
    }
  },
  created() {
    this.getPokemon(this.search) ;
  }, 
  computed: {

  },
  methods: {
    async getPokemon (search) {
      const pokemonRespond =await pokeApi
      .get(search)
      .catch(error => {
        this.urlImage = '';
        this.pokemon= {
          id: this.search,
          name: 'Not Found T_T'
        }
        return error
      }) 
      if(pokemonRespond.status === 200) {
        this.pokemon = pokemonRespond.data;
        this.urlImage = pokemonRespond.data.sprites.versions['generation-v']['black-white'].animated.front_default
        this.idx = pokemonRespond.data.id

      }
    },
    handleSubmit() {
      this.getPokemon(this.search.toLowerCase())
    }, 
    handleNext() {
      this.search = ''
      if(this.idx < 1010){
        this.getPokemon(this.idx + 1)
      }else {
        this.getPokemon(1)
      }
    },
    handlePrev() {
      this.search=''
      if(this.idx >1) {
        this.getPokemon(this.idx - 1)
      }else {
        this.getPokemon(1010)
      }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Oxanium", cursive;
}

body {
  text-align: center;
  background: linear-gradient(to bottom, #6ab7f5, #fff);
  min-height: 100vh;
}

main {
  display: inline-block;
  margin-top: 2%;
  padding: 15px;
  position: relative;
}

.pokedex {
  width: 100%;
  max-width: 425px;
}

.pokemon__image {
  position: absolute;
  bottom: 55%;
  left: 50%;
  transform: translate(-63%, 20%);
  height: 18%;
}

.pokemon__data {
  position: absolute;
  font-weight: 600;
  color: #aaa;
  top: 54.5%;
  right: 27%;
  font-size: clamp(8px, 5vw, 25px);
}

.pokemon__name {
  color: #3a444d;
  text-transform: capitalize;
}

.form {
  position: absolute;
  width: 65%;
  top: 65%;
  left: 13.5%;
}

.input__search {
  width: 100%;
  padding: 4%;
  outline: none;
  border: 2px solid #333;
  border-radius: 5px;
  font-weight: 600;
  color: #3a444d;
  font-size: clamp(8px, 5vw, 1rem);
  box-shadow: -3px 4px 0 #888, -5px 7px 0 #333;
}

.buttons {
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 65%;
  transform: translate(-57%, 0);
  display: flex;
  gap: 20px;
}

.button {
  width: 50%;
  padding: 4%;
  border: 2px solid #000;
  border-radius: 5px;
  font-size: clamp(8px, 5vw, 1rem);
  font-weight: 600;
  color: white;
  background-color: #444;
  box-shadow: -2px 3px 0 #222, -4px 6px 0 #000;
}

.button:active {
  box-shadow: inset -4px 4px 0 #222;
  font-size: 0.9rem;
}
</style>
