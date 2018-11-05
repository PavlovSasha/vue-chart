<script>
  import { Doughnut } from 'vue-chartjs';
  import './chart-config';

  export default {
    extends: Doughnut,
    name: 'VueChart',
    data() {
      return {
        chartData: {
          datasets: [{
            data: [10, 20, 30],

            backgroundColor: [
              'rgba(239, 85, 216, .5)',
              'rgba(226, 239, 85, .5)',
              'rgba(85, 193, 239, .5)',
            ],

            hoverBackgroundColor: [
              'rgba(239, 85, 216, .5)',
              'rgba(226, 239, 85, .5)',
              'rgba(85, 193, 239, .5)',
            ],

            borderColor: [
              'transparent',
              'transparent',
              'transparent'
            ],

            hoverBorderColor: [
              'rgba(239, 85, 216, .5)',
              'rgba(226, 239, 85, .5)',
              'rgba(85, 193, 239, .5)',
            ],

            borderWidth: [20, 20, 20],
            hoverBorderWidth: [20, 20, 20],
            hoveredChart: null
          }],

          labels: [
            'Red',
            'Yellow',
            'Blue'
          ],
        },

        chartOptions: {
          responsive: false,
          cutoutPercentage: 80,
          legend: false,
          events: ['mousemove'],

          tooltips: {
            custom: (model) => {
              console.log('mode tooltips', model);
            }
          },

          animation: {
            onComplete: () => {
              for (let i = 0; i < this.chartData.datasets[0].borderWidth.length; i++) {
                this.chartData.datasets[0].borderWidth[i] = 20;
                this.chartData.datasets[0].borderColor[i] = 'transparent';
              }
            }
          },

          onHover: (event, el) => {
            if (el.length && this.chartData.datasets[0].hoveredChart !== el[0]._index) {
              const data = el[0]._chart.data.datasets[0];
              const selectedIndex = el[0]._index;

              data.borderWidth[selectedIndex] = 0;
              data.borderColor[selectedIndex] = 'transparent';
              el[0]._chart.update({ duration: 0 });


              data.borderWidth[selectedIndex] = 20;
              data.borderColor[selectedIndex] = data.backgroundColor[selectedIndex];

              if (data.hoveredChart !== null) {
                data.borderWidth[data.hoveredChart] = 0;
                data.borderColor[data.hoveredChart] = 'transparent';
              }

              el[0]._chart.update({ duration: 300 });

              data.hoveredChart = el[0]._index;
            }

            if (!el.length) {
              if (this.chartData.datasets[0].hoveredChart !== null) {
                const lastIndex = this.chartData.datasets[0].hoveredChart;
                this.chartData.datasets[0].borderWidth[lastIndex] = 0;
                this.chartData.datasets[0].borderColor[lastIndex] = 'transparent';
                this.$data._chart.update({ duration: 300 });
              }
              this.chartData.datasets[0].hoveredChart = null;
            }
          },

          legendCallback(chart) {
            const listEl = document.createElement('ul');
            listEl.className = `legend-${chart.id}`;
            const parentEl = document.querySelector('.legend-container');

            for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
              const listItem = document.createElement('li');
              const label = chart.data.labels[i];
              listItem.className = 'legend-item';
              listItem.innerHTML = `<span style='background-color:${chart.data.datasets[0].backgroundColor[i]}'>${ label }</span>`;
              listItem.onmouseenter = () => {
                chart.data.datasets[0].borderWidth[i] = 0;
                chart.data.datasets[0].borderColor[i] = 'transparent';
                chart.update({ duration: 0 });
                chart.data.datasets[0].borderWidth[i] = 20;
                chart.data.datasets[0].borderColor[i] = chart.data.datasets[0].backgroundColor[i];
                chart.update({ duration: 300 });
              };
              listItem.onmouseleave = () => {
                setTimeout(() => {
                  chart.data.datasets[0].borderWidth[i] = 0;
                  chart.data.datasets[0].borderColor[i] = 'transparent';
                  chart.update({ duration: 300 });
                  chart.data.datasets[0].borderWidth[i] = 20;
                });
              };
              listEl.appendChild(listItem);
            }

            parentEl.appendChild(listEl);
            return '';
          },
        },
      };
    },

    mounted() {
      const legendEl = document.createElement('div');
      legendEl.className = 'legend-container';
      this.$el.parentElement.appendChild(legendEl);
      this.renderChart(this.chartData, this.chartOptions);
      this.generateLegend();
    },
  }
</script>

<style lang="scss">
    .legend-container ul {
        list-style: none;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    .legend-item {
        flex-grow: 1;
    }
</style>