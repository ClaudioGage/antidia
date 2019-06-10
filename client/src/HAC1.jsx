import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
import PieChart from "./PieChart";
import ComLineChart from "./ComLineChart";
import LineChart from "./LineChart";
import Navigation from "./Navigation";
import SecondPie from "./SecondPie";
import LineTwo from "./LineTwo";

const rThreeMonth = Math.floor(Date.now() / 3600000) - 2190;
const rSixMonth = Math.floor(Date.now() / 3600000) - 4380;

const State = {
  glucose: "",
  date: "",
  data: "",
  TotalDataPie: [],
  Hbca1: "",
  glucAve: ""
};

class HCA1 extends Component {
  constructor(props) {
    super(props);

    this.state = { ...State };
  }
  componentDidMount() {
    this.retrieveGluDate();
  }

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
    this.setState({
      glucAve: gAverage,
      Hbca1: HCA1
    });
  };

  retrieveGluDate = () => {
    if (this.state.data.length === 0) {
      var uid = this.props.firebase.auth.O;
      const data = this.props.firebase
        .Hretrieve(uid)
        .then(s => {
          if (this._isMounted)
            this.setState({
              data: s
            });
          this.calculateHCA1();
          console.log("i am being called");
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div>
          <LineTwo DataForLine={data} />
        </div>
        <div>
          <button onClick={this.calculateHCA1}>ya</button>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(HCA1));
