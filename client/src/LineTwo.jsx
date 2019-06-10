import React, { Component } from "react";
import { Line, defaults } from "react-chartjs-2";

defaults.global.mantianAspectRatio = true;

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

export default class LineTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.labelsDataSet();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

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
            backgroundColor: "6D1FF3",
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
