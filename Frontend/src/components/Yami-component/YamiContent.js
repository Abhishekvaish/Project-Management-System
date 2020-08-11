import React, { Component } from "react";
import "./YamiContent.css";
import LoggedNavbar from "../Navbar/LoggedNavbar";

export default class YamiContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: "",
      dept: "Computer Science"
    };
  }

  mailHandler = event => {
    this.setState({ mail: event.target.value });
  };

  deptHandler = event => {
    this.setState({ dept: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    const { mail, dept } = this.state;
    alert(`dept:${dept} \n mail:${mail}`);
  };

  render() {
    return (
      <div>
        <LoggedNavbar />
        <div className="yami-container">
          <form onSubmit={this.submitHandler}>
            <div className="yami-title">
              <label>Create Admin</label>
            </div>
            <label className="yami-label">Admin Email:</label>
            <br />
            <br />
            <input
              type="email"
              name="email"
              placeholder="enter email"
              value={this.state.mail}
              onChange={this.mailHandler}
              required
            />
            <br />
            <br />
            <label className="yami-label">Select Department</label>
            <br />
            <br />
            <div>
              <select onChange={this.deptHandler} value={this.state.dept}>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Electronics And Telecommunication">
                  Electronics And Telecommunication
                </option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
