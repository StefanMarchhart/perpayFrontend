// import React from 'react';
import Infocard from '../infocard/newcard';
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import BreakdownTable from "../breakdowntable/breakdowntable"
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const styles = theme => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    heroContent: {
      // padding: theme.spacing(8, 0, 6),
      padding: theme.spacing(4,0),
    },
    typography:{
      [theme.breakpoints.down('sm')]: {
        textAlign: "center",
      },
      [theme.breakpoints.up('md')]: {
        textAlign: "left",
      } 
    },
    // masterGrid:{
    //   height: "100%",
    //   flexWrap: "nowrap"
    // },
  });



class Mainpage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isLoaded: false,
                totals: []
              };
        }
        componentDidMount() {
          fetch("http://127.0.0.1:8000/testtotals?format=json")
            // fetch("http://127.0.0.1:8000/totals?format=json")
            // fetch(process.env.REACT_APP_DATABASE_URL)
              .then(res => res.json())
              .then(
                (result) => {
                    console.log(result)
                  this.setState({
                    isLoaded: true,
                    totals: result
                  });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )

          }
          



    render(){

      const {classes} = this.props;


        var profit = this.state.totals["totalPaid"]
        var payments = this.state.totals["totalPayments"]
        var users = this.state.totals["totalUsers"]
        var companies = this.state.totals["totalCompanies"]
      console.log(classes)
    const {error,isLoaded,items} = this.state;
    if (error) {
        return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (

        <React.Fragment>
              <CssBaseline />
              <Grid container className={classes.masterGrid} direction="column" justify="space-around" alignItems="center" maxWidth="lg" component="main">
                {/* Hero unit */}
                <Container maxWidth="false" className={classes.heroContent}>
                {/* <Container maxWidth="sm" component="main" > */}
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Perpay Payment Metrics
                  </Typography>
                </Container>
                {/* End hero unit */}
                <Container maxWidth="false">
                  {/* <Grid container spacing={5} alignItems="flex-end"> */}
                  <Grid container spacing={5} direction="row" justify="space-around" alignItems="stretch">
                      <Infocard isloaded={this.state.isLoaded} cardType="paid" data={[profit]}></Infocard>
                      <Infocard isloaded={this.state.isLoaded} cardType="payments" data={[payments]}></Infocard>
                      <Infocard isloaded={this.state.isLoaded} cardType="breakdown" data={[users,companies]} ></Infocard>
                  </Grid>
                </Container>
                <Container maxWidth="false">
                <Typography className={classes.typography} component="h4" variant="h4"  color="blue" gutterBottom>
                    Company Breakdown
                  </Typography>
                  <BreakdownTable></BreakdownTable>
                </Container>


              </Grid>
            </React.Fragment>
            );
        }
    }
}
    

Mainpage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mainpage);





