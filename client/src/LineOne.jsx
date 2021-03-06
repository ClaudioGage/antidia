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
  responsive: false
};

export default class LineOne extends Component {
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
  componentWillUnmount() {}

  labelsDataSet = () => {
    setTimeout(() => {
      var Data = this.props.DataForLine;
      let label = [];
      let lineData = [];
      for (let i = 0; i < Data.length; i++) {
        label.push(Data[i][1]);
        lineData.push(Data[i][2]);
      }
      this.setState({
        labels: label,
        datasets: [
          {
            label: "Glucose level at",
            backgroundColor: "#1FF3BB",
            data: lineData
          }
        ]
      });
    }, 800);
  };

  render() {
    /*
    console.log(
      "this is the data for the line graph - ",
      this.props.DataForLine
    );
    */
    return (
      <div>
        <Line data={this.state} options={options} />
      </div>
    );
  }
}
