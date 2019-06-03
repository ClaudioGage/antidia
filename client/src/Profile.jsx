import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
import PieChart from "./PieChart";

var d = new Date();

const State = {
  firstInstance: "testing",
  glucose: "",
  date: "",
  data: "",
  actual: ""
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...State };
  }
  componentDidMount() {
    this.retrieveGluDate();
  }

  retrieveGluDate = () => {
    var uid = this.props.firebase.auth.O;
    const data = this.props.firebase
      .retrieve(uid)
      .then(s => {
        this.setState({
          data: s
        });
      })
      .catch(function(err) {});
  };

  createGlucoseNode = g => {
    const { firstInstance } = this.state;
    this.props.firebase.crg(g).update({
      glucoseLevels: [firstInstance]
    });
  };

  onSubmit = event => {
    const { glucose, date } = this.state;
    var uid = this.props.firebase.auth.O;
    this.props.firebase.glda(uid, glucose, date);
    this.setState({
      ...State
    });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { glucose, date } = this.state;
    console.log(
      "another way of getting the user id",
      this.props.firebase.auth.O
    );

    console.log(this.props);
    console.log("id of the user", this.props.firebase.user);
    return (
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
          <PieChart />
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Profile));
