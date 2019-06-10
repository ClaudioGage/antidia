import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
import PieChart from "./PieChart";
import ComLineChart from "./ComLineChart";
import LineChart from "./LineChart";
import Navigation from "./Navigation";
import SecondPie from "./SecondPie";
import ThirdPie from "./ThirdPie";
import FourthPie from "./FourthPie";
import LineOne from "./LineOne";
import LineTwo from "./LineTwo";
import LineThree from "./LineThree";

var Dates = new Date();
var date = `${Dates.getDate()}-${Dates.getMonth()}-${Dates.getFullYear()}`;

const State = {
  firstInstance: "",
  glucose: "",
  date: date,
  data: "",
  TotalDataPie: [],
  timeStamp: "",
  rawData: "",
  monthD: "",
  threeM: "",
  sixM: "",
  pieM: "",
  pieThree: "",
  pieSix: ""
};

const rDay = Math.floor(Date.now() / 3600000) - 24;
const rWeek = Math.floor(Date.now() / 3600000) - 168;
const rMonth = Math.floor(Date.now() / 3600000) - 730;
const rThreeMonth = Math.floor(Date.now() / 3600000) - 2190;
const rSixMonth = Math.floor(Date.now() / 3600000) - 4380;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...State };
  }

  componentDidMount() {
    this.retrieveGluDate();
  }

  dayButton = () => {
    //setInterval(() => {
    this.amountForPieChart();
    this.amountForPieChart();
    //}, 500);
    console.log("value of firstInstance...", this.state.firstInstance);
  };

  weekButton = () => {
    this.weekAmountForPieChart();
    this.weekAmountForPieChart();
  };

  filterForDay = () => {
    var dataArr = [];
    //setInterval(() => {
    const dayData = this.state.data;

    console.log(" ISSSS THEEE timeStamp is active", dayData[49][0]);
    // change condition to constant set for specific filter
    for (let i = dayData.length - 1; i > 47; i--) {
      dataArr.push(dayData[i]);
    }

    this.setState({
      rawData: dataArr
    });
    //}, 800);
  };

  filterForWeek = () => {
    var dataArr = [];
    const weekData = this.state.data;
    let begin = Math.floor(Date.now() / 3600000);
    for (let i = weekData.length - 1; i > 45; i--) {
      dataArr.push(weekData[i]);
    }
    this.setState({
      rawData: dataArr
    });
  };

  generalPieData = (stateNum, pies) => {
    var pieData = stateNum;
    var hypoCount = 0;
    var hypoAr = [];
    var normalCount = 0;
    var normalAr = [];
    var hyperCount = 0;
    var hyperAr = [];
    for (var i = 0; i < pieData.length; i++) {
      if (pieData[i][2] <= 80) {
        hypoCount++;
        hypoAr.push(pieData[i][2]);
      } else if (pieData[i][2] > 180) {
        hyperCount++;
        hyperAr.push(pieData[i][2]);
      } else {
        normalCount++;
        normalAr.push(pieData[i][2]);
      }
    }
    this.setState({
      [pies]: [hypoCount, normalCount, hyperCount]
    });
    console.log(
      "if this works I am genius",
      this.state.monthD,
      this.state.pieM
    );
  };

  generalFilter = (limit, states) => {
    // use this filter using the param limit to set how do you want to filter data
    //const states = states
    var dataArr = [];
    const gData = this.state.data;
    for (let i = gData.length - 1; i > limit; i--) {
      dataArr.push(gData[i]);
    }
    this.setState({
      [states]: dataArr
    });
  };

  amountForPieChart = () => {
    this.generalFilter(40, "monthD");
    this.generalPieData(this.state.monthD, "pieM");
    this.generalFilter(30, "threeM");
    this.generalPieData(this.state.threeM, "pieThree");
    this.generalFilter(5, "sixM");
    this.generalPieData(this.state.sixM, "pieSix");
    this.filterForDay();
    var pieData = this.state.rawData;
    var totalGls = this.state.rawData.length;
    console.log("this is complete number of elements", totalGls);
    console.log("what is rawData being passed as ... ", pieData);
    // hyplogucemic, normal and hyperglucemic counter and array of specific values.
    var hypoCount = 0;
    var hypoAr = [];
    var normalCount = 0;
    var normalAr = [];
    var hyperCount = 0;
    var hyperAr = [];
    for (var i = 0; i < pieData.length; i++) {
      if (pieData[i][2] <= 80) {
        hypoCount++;
        hypoAr.push(pieData[i][2]);
      } else if (pieData[i][2] > 180) {
        hyperCount++;
        hyperAr.push(pieData[i][2]);
      } else {
        normalCount++;
        normalAr.push(pieData[i][2]);
      }
    }

    this.setState({
      TotalDataPie: [hypoCount, normalCount, hyperCount]
    });
  };

  weekAmountForPieChart = () => {
    this.filterForWeek();
    var pieData = this.state.rawData;
    var totalGls = this.state.rawData.length;
    // hyplogucemic, normal and hyperglucemic counter and array of specific values.
    var hypoCount = 0;
    var hypoAr = [];
    var normalCount = 0;
    var normalAr = [];
    var hyperCount = 0;
    var hyperAr = [];
    for (var i = 0; i < pieData.length; i++) {
      if (pieData[i][2] <= 80) {
        hypoCount++;
        hypoAr.push(pieData[i][2]);
      } else if (pieData[i][2] > 180) {
        hyperCount++;
        hyperAr.push(pieData[i][2]);
      } else {
        normalCount++;
        normalAr.push(pieData[i][2]);
      }
    }
    this.setState({
      TotalDataPie: [hypoCount, normalCount, hyperCount]
    });
  };

  calculateHCA1 = () => {
    let denominator = this.state.data.length;
    const dataH = this.state.data;
    var totalGlu = 0;
    for (let i = 0; i < dataH.length; i++) {
      totalGlu += parseFloat(dataH[i][2]);
    }
    const gAverage = totalGlu / denominator;
    const HCA1 = (gAverage + 46.7) / 28.7;

    console.log(`the glucose ave ${gAverage} and the HCA1 ${HCA1}`);
  };

  retrieveGluDate = () => {
    var uid = this.props.firebase.auth.O;
    const data = this.props.firebase
      .retrieve(uid)
      .then(s => {
        this.setState({
          data: s,
          timeStamp: Math.floor(Date.now() / 3600000)
        });
        console.log("i am being called");
        this.amountForPieChart();
        this.calculateHCA1();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  createGlucoseNode = g => {
    const { firstInstance } = this.state;
    this.props.firebase.crg(g).update({
      glucoseLevels: [firstInstance]
    });
  };

  onSubmit = event => {
    const { glucose, timeStamp, date } = this.state;
    var uid = this.props.firebase.auth.O;
    this.props.firebase.glda(uid, glucose, date, timeStamp);
    this.setState({
      glucose: "",
      timeStamp: Math.floor(Date.now() / 3600000)
    });
    this.retrieveGluDate();

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      glucose,
      TotalDataPie,
      data,
      monthD,
      threeM,
      sixM,
      pieM,
      pieSix,
      pieThree
    } = this.state;
    const isEnabled = glucose.length > 0;
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <br />
        <br />
        <br />
        <br />
        <div>
          <div className="box">
            <div className="box">
              <form onSubmit={this.onSubmit}>
                <input
                  className="input-group-field"
                  name="glucose"
                  value={glucose}
                  onChange={this.onChange}
                  type="number"
                  placeholder="Glucose index"
                />
                <button
                  disabled={!isEnabled}
                  className="theSubmitButton"
                  type="submit"
                >
                  Submit
                </button>
              </form>
              <button className="SignOut" onClick={this.dayButton}>
                Daily
              </button>
              <button className="SignOut" onClick={this.weekButton}>
                Weekly
              </button>
            </div>
            <div className="box">
              <PieChart TotalDataPie={TotalDataPie} />
            </div>
          </div>
          <div className="box">
            <div className="box">
              <SecondPie TotalDataPie={pieM} />
              <LineOne DataForLine={monthD} />
            </div>
            <div className="box">
              <ThirdPie TotalDataPie={pieThree} />
              <div className="box">
                <FourthPie TotalDataPie={pieSix} />
                <LineThree DataForLine={sixM} />
              </div>
            </div>
            <div>
              <div>
                <ComLineChart />
                <LineChart DataForLine={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Profile));
/*
console.log(
  "another way of getting the user id",
  this.props.firebase.auth.O
);

console.log(this.props);
console.log("id of the user", this.props.firebase.user);
*/
