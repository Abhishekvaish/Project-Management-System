import React, { Component } from "react";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";
import AdminContent from "./AdminContent";
import LoggedNavbar from "../Navbar/LoggedNavbar";

let Ad = null;

function Tind(props) {
  let groups = props.static;
  console.log(groups);

  if (groups === null) {
    return <h1>Groups is null</h1>;
  }
  return (
    <div>
      {groups.map(group => {
        let members = group.members;
        return (
          <div key={group.name}>
            <h1>{group.name}</h1>
            {members.map(member => {
              return <h1 key={member}>member:{member}</h1>;
            })}
            <hr />
          </div>
        );
      })}
    </div>
  );
  // return (
  //   <h1>Hello</h1>
  // <React.Fragment>
  //   <LoggedNavbar />
  //   <div>
  //     {groups.map(group => {
  //       let member = group.members;
  //       return (
  //         <div key={group.name}>
  //           <h1>{group.name}</h1>
  //           {member.map(member => {
  //             return <h1>member:{member}</h1>;
  //           })}
  //         </div>
  //       );
  //     })}
  //   </div>
  // </React.Fragment>
  // );
}
function Lion() {
  return (
    <div>
      <AdminContent />
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default class DataFilledAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adData: null,
      filled: false
    };
  }

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true
    })
      .then(res => {
        Ad = res.data;

        this.setState({
          adData: res.data,
          filled: true
        });
      })
      // .then(() => {
      //   localStorage.setItem("data", "set");
      // })

      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const stat = this.props.stat;
    if (Ad === null) {
      this.checkData();
    }

    if (this.props.stat != null)
      return (
        <div>
          <LoggedNavbar />
          <Tind static={Ad} />
        </div>
      );

    if (this.props.stat === null) {
      console.log(stat);
      return <Lion />;
    }
  }
}
