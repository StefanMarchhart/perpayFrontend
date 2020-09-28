// import React from 'react';
import Infocard from '../infocard/infocard';
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
import SimpleModal from "../login/modalmanger"
import Fab from '@material-ui/core/Fab';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

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
    fab:{
      margin: 0,
      bottom: 'auto',
      right: 20,
      top: 20,
      left: 'auto',
      position: 'fixed',
    }
  }));


  export default function Mainpage() {
    const classes = useStyles();



      const signOut=(()=>{
        window.sessionStorage.removeItem("userToken")
        window.localStorage.removeItem("userToken")
        window.location.reload(false);
      })


      const fetchStoredToken=(()=>{
        return window.sessionStorage.getItem("userToken") || window.localStorage.getItem("userToken") || null
      })


      // useEffect(()=>{
      //   fetchStoredToken()
      // },[window.sessionStorage.getItem("userToken"),window.localStorage.getItem("userToken")])


        const [totalError, setTotalError] = useState("")
        const [isLoading, setIsLoading] = useState(false)
        // const [totals, setTotals] = useState({})
        // cons [isSignedIn, setIsSignedIn] = useState()
        const [userToken, setUserToken] = useState(fetchStoredToken())
        const [update, setUpdate] = useState(false) 
        const [totals, setTotals] = useState({
          "totalPaid": "",
          "totalPayments": "",
          "totalUsers": "",
          "totalCompanies": ""
      })



      
      useEffect(() => {
        if(!userToken){
          return
        }
        
        fetch("http://127.0.0.1:8000/testtotals?format=json",{
          headers: {
            'Authorization': 'Token '+ userToken
          },
      
        })
        // fetch("http://127.0.0.1:8000/totals?format=json")
        // fetch(process.env.REACT_APP_DATABASE_URL)
              .then((res) => {
                if (res.ok) {
                  return res.json();
                } else if(res.status==401){
                  console.log("Not Signed In")
                }else{
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

          {/* {!userToken&&<SimpleModal openByDefault={true}></SimpleModal>} */}

          {!userToken?(
            // if there isn't a user signed in, show sign-in
            <SimpleModal openByDefault={true}></SimpleModal>
          ):(
            totalError?(
              // if there's an error, show error
              <Alert severity="error">
              <AlertTitle>Something went horribly wrong</AlertTitle>
              {totalError.message}
            </Alert>
            ):(
              // normal flow
          //   )
          // )}

          // {totalError?
          // (
            
          //   <Alert severity="error">
          //     <AlertTitle>Something went horribly wrong</AlertTitle>
          //     {totalError.message}
          //   </Alert>
            

          // ):(
              <Grid container className={classes.masterGrid} direction="column" justify="space-around" alignItems="center" maxidth="lg" component="main">
                {/* Hero unit */}
                <Container maxwidth="false" className={classes.heroContent}>
                <Fab className={classes.fab} onClick={signOut} variant="extended">
                  <MeetingRoomIcon className={classes.extendedIcon} />
                  Sign Out
                  </Fab>
                {/* <Container maxWidth="sm" component="main" > */}
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Perpay Payment Metrics 
                  </Typography>


                  {/* <SimpleModal openByDefault={false}></SimpleModal> */}
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
                  <BreakdownTable userToken={userToken}></BreakdownTable>
                </Container>


              </Grid>
            ))}
            </React.Fragment>
            );
        }
    
// }
    

// Mainpage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Mainpage);





