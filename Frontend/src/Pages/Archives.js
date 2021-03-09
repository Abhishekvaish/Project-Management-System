import React, { Component } from "react";
import ASideMenu from "../components/Admin-component/SideMenu";
import HSideMenu from "../components/Hod-component/HodSideMenu"
import axios from "axios";
import SERVER_URL from "./URL";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles, Grid, Card } from "@material-ui/core";
import ArchiveTable from "../components/ArchiveTable"
import qs from "qs"

let archData = null, dates = new Set(["All"]);

const useStyles = theme => ({
filterDiv:{
  backgroundColor:"#fff",
  width:"90%",
  margin:"20px auto",
  },
tableContainer:{
  width:"90%",
  margin:"auto"
},
title:{
  backgroundColor:"#fff",
  width:"90%",
  margin:"30px auto",
  boxShadow:"0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
} 
});

class AdminArchives extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token === "admin") {
      loggedIn = true;
    }

    this.state = {
      loggedIn,
      user: "",
      expanded: false,
      archiveData: null,
      deleteDialogOpen: false
    };
  }
 
  //Get Archive Data
  getArchive = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/archive",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        archData = res.data
        archData.forEach( grp => dates.add(grp.acadYear) )
        dates = [...dates]
        console.log(dates)
        this.setState(
          {
            archiveData: res.data
          },
        );
      })

      .catch(err => {
        console.log(err);
      });
  };

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        this.setState({
          loggedIn: true,
          user: res.data
        });
      })

      .catch(err => {
        this.setState({
          loggedIn: false,
          user: "No User"
        });
        localStorage.removeItem("token");
      });
  };

  filterContent = () => {
    let  f_acadYear = document.getElementById("f_acadYear").value
    let f_category = document.getElementById("f_category").value
    let f_typeOfProject = document.getElementById("f_typeOfProject").value
    if(f_acadYear == "All") f_acadYear=null
    if(f_category == "All") f_category=null
    if(f_typeOfProject == "All") f_typeOfProject=null
    this.setState({
      archiveData : archData.filter( (arc)=>{
                if (f_acadYear && arc.acadYear != f_acadYear.trim()) 
                  return false
                if (f_category && arc.project.category != f_category.trim())
                  return false
                if (f_typeOfProject && arc.project.typeOfProject != f_typeOfProject.trim())
                  return false
                return true
              } )
          })
  }
  downloadFilterContent = () => {
    let  f_acadYear = document.getElementById("f_acadYear").value
    let f_category = document.getElementById("f_category").value
    let f_typeOfProject = document.getElementById("f_typeOfProject").value
    if(f_acadYear == "All") f_acadYear=null
    if(f_category == "All") f_category=null
    if(f_typeOfProject == "All") f_typeOfProject=null
    axios({
      method: "post",
      url: SERVER_URL + "/genExcel",
      withCredentials: true,
      responseType: "blob",
      data: qs.stringify({
        f_acadYear: f_acadYear,
        f_category: f_category,
        f_typeOfProject  : f_typeOfProject
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")

      }
    }).then( (res)=>{
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Filtered List.xlsx');
        document.body.appendChild(link);
        link.click();
    } ).catch( (err)=>{
      console.log(err)
    } )
  }


  render() {
    const { classes } = this.props;

    if (this.state.user === "" && this.state.archiveData === null) {
      this.getStat();
      this.getArchive();
      return <LinearProgress />;
    } 
    
    else if (this.state.user.type === "admin" || this.state.user.type === "hod") {
      return this.state.archiveData !== null ? (
        <React.Fragment>
        {this.state.user.type === "admin"?<ASideMenu/>:<HSideMenu/>}
        <div className={classes.title}><Typography variant="h3"><b>Archives</b></Typography></div>
          <div className={classes.filterDiv}>            
            <label>Academic Year : </label>
            <select id="f_acadYear" onChange = {this.filterContent}>
              {dates.map( d=>(
                 <option value={d}>{d}</option>
              ) ) }  
            </select>

            <label >Category </label>
            <select id="f_category" onChange = {this.filterContent}>
              <option value="All">All</option>
              <option value="Social Need">Social Need </option>
              <option value="Education Based">Education Based</option>
              <option value="Real Time">Real Time</option>
              <option value="NGO Based">NGO Based  </option>
              <option value="Innovative">Innovative</option>
              <option value="Research Oriented">Research Oriented</option>
            </select>

            <label >Type of Project </label>
            <select id="f_typeOfProject" onChange = {this.filterContent}>
              <option value="All">All</option>
              <option value="Inhouse">Inhouse</option>
              <option value="Outhouse">Outhouse</option>
            </select>            
            <button onClick = {this.downloadFilterContent} >download
            </button>
          </div>

          
          <div className={classes.tableContainer}>
          <ArchiveTable archData={this.state.archiveData}/> 
          </div>
        </React.Fragment>
      ) : (
        <LinearProgress />
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
export default withStyles(useStyles)(AdminArchives);
