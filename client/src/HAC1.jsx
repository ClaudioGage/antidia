import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
import PieChart from "./PieChart";
import ComLineChart from "./ComLineChart";
import LineChart from "./LineChart";

const rThreeMonth = Math.floor(Date.now() / 3600000) - 2190;
const rSixMonth = Math.floor(Date.now() / 3600000) - 4380;

const State = {
  firstInstance: "",
  glucose: "",
  date: "",
  data: "",
  TotalDataPie: [],
  timeStamp: "",
  rawData: ""
};

class HCA1 extends Component {
  constructor(props) {
    super(props);

    this.state = { ...State };
  }

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

  render() {
    return (
      <div>
        <div>
          <PieChart />
          <LineChart />
        </div>
        <div>
          <PieChart />
          <LineChart />
        </div>
        <div>
          <PieChart />
          <LineChart />
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(HCA1));
