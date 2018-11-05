<template>
  <div id="app">
    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Linechart</h2>
          <vue-chart
            class="chart"
            :width="400"
            :height="400"
          ></vue-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueChart from './components/Chart'
  export default {
    name: 'app',
    components: {
      VueChart
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .container {
    max-width: 800px;
    margin:  0 auto;
  }
  .chart {
    display: flex;
    justify-content: center;
  }
</style>
