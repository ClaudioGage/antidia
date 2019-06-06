import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

const State = {
  firstInstance: "testing",
  glucose: "",
  date: "",
  data: "",
  allDatAverage: [],
  timeStamp: Math.floor(Date.now() / 3600000)
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

  amountForPieChart = () => {
    var pieData = this.state.data;
    var totalGls = this.state.data.length;
    console.log("this is complete number of elements", totalGls);
    // hyplogucemic, normal and hyperglucemic counter and array of specific values.
    var hypoCount = 0;
    var hypoAr = [];
    var normalCount = 0;
    var normalAr = [];
    var hyperCount = 0;
    var hyperAr = [];
    for (var i = 0; i < pieData.length; i++) {
      if (pieData[i][1] <= 80) {
        hypoCount++;
        hypoAr.push(pieData[i][1]);
      } else if (pieData[i][1] > 180) {
        hyperCount++;
        hyperAr.push(pieData[i][1]);
      } else {
        normalCount++;
        normalAr.push(pieData[i][1]);
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
      allDatAverage: [hypoCount, normalCount, hyperCount]
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
        console.log(this.state.data);
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
    const { glucose, date, timeStamp } = this.state;
    var uid = this.props.firebase.auth.O;
    this.props.firebase.glda(uid, glucose, date, timeStamp);
    this.setState({
      glucose: "",
      date: "",
      timeStamp: Math.floor(Date.now() / 3600000)
    });
    this.retrieveGluDate();

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { glucose, date, allDatAverage } = this.state;
    console.log(this.state.timeStamp)
      <div>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <h1>Account: {authUser.email} </h1>
              {console.log("this is the state I want ...", this.state.data)}
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
          <input
            name="date"
            value={date}
            onChange={this.onChange}
            type="date"
            placeholder="date"
          />
          <button type="submit">submot</button>
        </form>
        <div>
          <PieChart allDatAverage={allDatAverage} />
          <button onClick={this.amountForPieChart}>PieChart testing</button>
        </div>
        <div>
          <LineChart />
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
