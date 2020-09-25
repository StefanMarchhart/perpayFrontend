// import React from 'react';
import Infocard from '../infocard/newcard';
import React, {useState, useEffect} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import BreakdownTable from "../breakdowntable/breakdowntable"
import {Alert, AlertTitle} from '@material-ui/lab';

// import { withStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
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
  }));


  export default function Mainpage() {
  const classes = useStyles();


        const [totalError, setTotalError] = useState("")
        const [isLoading, setIsLoading] = useState(false)
        // const [totals, setTotals] = useState({})

        const [totals, setTotals] = useState({
          "totalPaid": "",
          "totalPayments": "",
          "totalUsers": "",
          "totalCompanies": ""
      })




        // useEffect(() => {
        //   fetch(createUrl(url, options.query), {
        //     method: options.method || "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: options.method !== "GET" && JSON.stringify(options.body),
        //   })
        //     .then(async (response) => {
        //       const data = await response.json();
        //       setData({
        //         response: data,
        //         error: !response.ok,
        //         loading: false,
        //       });
        //     })
        //     .catch((error) => {
        //       //fetch throws an error only on network failure or if anything prevented the request from completing
        //       setData({
        //         response: { status: "network_failure" },
        //         error: true,
        //         loading: false,
        //       });
        //     });
        // }, [url, JSON.stringify(options)]);

















      const fetchStatusHandler=((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      })
      






      // fetch("http://127.0.0.1:8000/totals?format=json")
      // fetch(process.env.REACT_APP_DATABASE_URL)


        useEffect(() => {
          fetch("http://127.0.0.1:8000/testtotals?format=json")
              .then((res) => {
                if (res.ok) {
                  return res.json();
                } else {
                  throw new Error(res.status+" - "+res.statusText);
                }
              }).then(
                (result) => {

                  setTotals(result)

                },
                (e) => {
                  setTotalError(e)
                  console.log(e)
                  console.log("error hit")
                  setIsLoading(false)
                }
              )

          }
        ,[])

        useEffect(()=>{
          setIsLoading(false)

        },[totals])
          
        return (

          <React.Fragment>
              <CssBaseline />


          {totalError?
          (
            <Alert severity="error">
              <AlertTitle>Something went horribly wrong</AlertTitle>
              {totalError.message}
            </Alert>
           
          // <Alert variant="outlined" severity="error">Something went horribly wrong {totalError.message}</Alert>
          ):(
          // (<div>something went horribly wrong{totalError}</div>):(
              
              <Grid container className={classes.masterGrid} direction="column" justify="space-around" alignItems="center" maxidth="lg" component="main">
                {/* Hero unit */}
                <Container maxwidth="false" className={classes.heroContent}>
                {/* <Container maxWidth="sm" component="main" > */}
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Perpay Payment Metrics
                  </Typography>
                </Container>
                {/* End hero unit */}
                {isLoading ?(
                  <div>currently loading</div>
                ):(
                  <Container maxwidth="false">
                
                  <Grid container spacing={5} direction="row" justify="space-around" alignItems="stretch">                  
                      <Infocard isLoading={isLoading} cardType="paid" data={[totals["totalPaid"]]}></Infocard>
                      <Infocard isLoading={isLoading} cardType="payments" data={[totals["totalPayments"]]}></Infocard>
                      <Infocard isLoading={isLoading} cardType="breakdown" data={[totals["totalUsers"],totals["totalCompanies"]]} ></Infocard>
                  </Grid>

                </Container>
                )}

                <Container maxwidth="false">
                <Typography className={classes.typography} component="h4" variant="h4" gutterBottom>
                    Company Breakdown
                  </Typography>
                  <BreakdownTable></BreakdownTable>
                </Container>


              </Grid>
            )}
            </React.Fragment>
            );
        }
    
// }
    

// Mainpage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Mainpage);





