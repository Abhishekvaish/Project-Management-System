import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    // minWidth: 275,
    textAlign: "left",
    width: "100%",
    [theme.breakpoints.down("sm")]: {}
  },
  title: {
    fontSize: "20px",
    letterSpacing: "1px"
  },
  pos: {
    marginBottom: 12
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const userInfo = props;
  console.log(userInfo);
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
        backgroundColor: "#fff",
        borderRadius: "6px"
      }}
    >
      <CardContent>
        <Typography variant="h3">User Details -</Typography>
        <Typography className={classes.title}>
          <b> Name:</b> {userInfo.userInfo.name} &nbsp;&nbsp;&nbsp;&nbsp;
          <b> Designation:</b> {userInfo.userInfo.type} &nbsp;&nbsp;&nbsp;&nbsp;
          <b> Department:</b> {userInfo.userInfo.department}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <b>Email:</b> {userInfo.userInfo.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
