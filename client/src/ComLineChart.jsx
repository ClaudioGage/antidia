import React, { Component } from "react";
import { Line, defaults } from "react-chartjs-2";

defaults.global.mantianAspectRatio = false;

const options = {
  title: {
    display: true,
    text: "Comparative Chart in between",
    fontSize: 20
  },
  scales: {
    xAxes: [
      {
        display: true
      }
    ],
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left"
      }
    ]
  },
  responsive: true
};

export default class ComLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(52, 152, 219, 0.75)",
          data: [5, 10, 15, 30, 50]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(231, 76, 60, 0.75)",
          data: [300, 500, 100, 40, 120]
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Line data={this.state} options={options} />
      </div>
    );
  }
}
