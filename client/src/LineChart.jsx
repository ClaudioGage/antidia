import React, { Component } from "react";
import { Line, defaults } from "react-chartjs-2";

defaults.global.mantianAspectRatio = false;

const options = {
  title: {
    display: true,
    text: "Glucose Averages levels for",
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

export default class comLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: ""
    };
  }

  componentDidMount() {
    this.labelsDataSet();
  }

  labelsDataSet = () => {
    setInterval(() => {
      var Data = this.props.DataForLine;
      console.log(Data, "is the Data for line being passed?");
      let label = [];
      let lineData = [];
      console.log("should be an empty array", lineData);
      for (let i = 0; i < Data.length; i++) {
        label.push(Data[i][1]);
        lineData.push(Data[i][2]);
      }
      console.log(`AAAAAA ${label} - labels and ${lineData}  -points`);
      this.setState({
        labels: label,
        datasets: [
          {
            label: "Glucose level at",
            backgroundColor: "#05e6ff",
            data: lineData
          }
        ]
      });
      console.log(" state for datasets data...", this.state.datasets[0].data);
    }, 1000);
  };

  render() {
    console.log(
      "this is the data for the line graph - ",
      this.props.DataForLine
    );
    return (
      <div>
        <Line data={this.state} options={options} />
      </div>
    );
  }
}
