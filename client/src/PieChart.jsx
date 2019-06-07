import React, { Component } from "react";
import { Doughnut, defaults } from "react-chartjs-2";

defaults.global.mantianAspectRatio = false;

const options = {
  responsive: true,
  legend: {
    display: true
  },
  title: {
    display: true,
    text: ` Glucose Average `,
    position: "bottom"
  },
  animation: {
    animateScale: true,
    animateRotate: true
  },
  tooltips: {
    displayColors: true,
    callbacks: {
      label: function(tooltipItem, data) {
        //get the concerned dataset
        var dataset = data.datasets[tooltipItem.datasetIndex];
        //calculate the total of this data set
        var total = dataset.data.reduce(function(
          previousValue,
          currentValue,
          currentIndex,
          array
        ) {
          return previousValue + currentValue;
        });
        //get the current items value
        var currentValue = dataset.data[tooltipItem.index];
        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
        var percentage = Math.floor((currentValue / total) * 100 + 0.5);

        return percentage + "%";
      }
    }
  }
};

export default class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [">80", "80-180", "188>"],
      datasets: [
        {
          data: this.props.TotalDataPie,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderColor: "#fff",
          borderWidth: 1,
          hoverBorderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBorderWidth: 8
        }
      ]
    };
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        labels: [">80", "80-180", "188>"],
        datasets: [
          {
            data: this.props.TotalDataPie,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderColor: "#fff",
            borderWidth: 1,
            hoverBorderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBorderWidth: 8
          }
        ]
      });
    }, 500);
  }

  render() {
    //console.log(this.props.TotalDataPie);
    return (
      <div>
        <h2>Glucose range average</h2>
        <Doughnut data={this.state} options={options} />
      </div>
    );
  }
}
