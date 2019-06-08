import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
import PieChart from "./PieChart";
import ComLineChart from "./ComLineChart";
import LineChart from "./LineChart";

const State = {
  firstInstance: "",
  glucose: "",
  date: "",
  data: "",
  TotalDataPie: [],
  timeStamp: "",
  rawData: ""
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
    console.log("DATA BEFORE FILTERING!!!!!", dayData);
    console.log(" ISSSS THEEE timeStamp is active", dayData[49][0]);
    // change condition to constant set for specific filter
    for (let i = dayData.length - 1; i > 47; i--) {
      console.log("loop working", dayData[i]);
      dataArr.push(dayData[i]);
      console.log("passing arrays inside arrays", dataArr);
    }

    this.setState({
      rawData: dataArr
    });
    //}, 800);
    console.log("is raw data being passed", this.state.rawData);
  };

  filterForWeek = () => {
    var dataArr = [];
    //setInterval(() => {
    const weekData = this.state.data;
    let begin = Math.floor(Date.now() / 3600000);
    for (let i = weekData.length - 1; i > 45; i--) {
      dataArr.push(weekData[i]);
    }
    this.setState({
      rawData: dataArr
    });

    //}, 800);
  };

  amountForPieChart = () => {
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

    console.log(
      `value of hypoG after loop ${hypoCount} value of hypoAr ${hypoAr}`
    );
    console.log(
      `value of hyperG after loop ${hyperCount} value of hyperAr ${hyperAr}`
    );
    console.log(
      `value of normalCount after loop ${normalCount} value of normalAr ${normalAr}`
    );

    this.setState({
      TotalDataPie: [hypoCount, normalCount, hyperCount]
    });
  };

  weekAmountForPieChart = () => {
    this.filterForWeek();
    var pieData = this.state.rawData;
    var totalGls = this.state.rawData.length;
    console.log("this is complete number of elements", totalGls);
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
    const { glucose, timeStamp } = this.state;
    var uid = this.props.firebase.auth.O;
    var Dates = new Date;
    const date =  Dates //`${Date.getDate()}-${Date.getMonth()}-${Date.getFullYear()}`;
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
    const { glucose, TotalDataPie, data } = this.state;
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <h1>Account: {authUser.email} </h1>
            </div>
          )}
        </AuthUserContext.Consumer>
        <form onSubmit={this.onSubmit}>
          <input
            name="glucose"
            value={glucose}
            onChange={this.onChange}
            type="number"
            placeholder="Glucose index"
          />
          <button type="submit">submot</button>
        </form>
        <div>
          <PieChart TotalDataPie={TotalDataPie} />
          <p>
            <button onClick={this.dayButton}>Daily</button>
            <button onClick={this.weekButton}>Weekly</button>
          </p>
        </div>
        <div>
          <ComLineChart />
          <LineChart DataForLine={data} />
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
