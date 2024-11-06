<template>
  <div id="app">
    {{this.$store.state.num}}
    {{this.$store.getters.newNum}}
    <button @click="add()">给爷加tm</button>
    <button @click="addsync()">给爷加tm</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    add(){
      this.$store.commit('increase')
    },
    addsync(){
      this.$store.dispatch('asyncIncrease',2)
    }
  },
}

</script>

<style>

</style>
