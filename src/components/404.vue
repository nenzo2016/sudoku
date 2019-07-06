<template>
  <div class="body">
      404
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {
    }
  },
  created(){
    localStorage.clear()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
  text-align: center;
  font-size: 36px;
  padding: 100px;
}
</style>
