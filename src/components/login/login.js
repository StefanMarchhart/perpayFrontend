import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// [theme.breakpoints.down('xs')]: {
//     width: 300,
//   },
//   [theme.breakpoints.up('md')]: {
//     width: 400,
//   },







const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    //   backgroundColor: theme.palette.background.paper,
    //   border: '2px solid #000',
    //   boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Login(props) {
  const classes = useStyles();


    const[usernameValue,setusernameValue]=useState("")
    const[passwordValue,setpasswordValue]=useState("")
    const[rememberMe,setRememberMe] = useState(false);
    // const[requestedToken,setRequestedToken] = useState("");


    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
      };

    const handleUsernameChange=((e)=>{
        console.log(e)
        setusernameValue(e.target.value)
    })

    const handlePasswordChange=((e)=>{
        setpasswordValue(e.target.value)
    })



    const attemptLogin=(()=>{


        var data={
            "username":usernameValue,
            "password":passwordValue,
        }
        console.log(data)
    
        fetch("http://127.0.0.1:8000/api-token-auth/",{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          
            })
            // fetch("http://127.0.0.1:8000/totals?format=json")
            // fetch(process.env.REACT_APP_DATABASE_URL)
                  .then((res) => {
                    if (res.ok) {
                      return res.json();
                    } else {
                      throw new Error(res.status+" - "+res.statusText);
                    }
                  }).then(
                    (result) => {
                        console.log(result)
                        // setRequestedToken(result)
                        saveToken(result["token"])
                    },
                    (e) => {
                    //   setTotalError(e)
                      console.log(e)
                      console.log("error hit")
                    //   setIsLoading(false)
                    }
                  )
    
              
    })




    const saveToken=((token)=>{
        if(rememberMe){
            window.sessionStorage.setItem("userToken",token)

        }else{
            window.localStorage.setItem("userToken",token)
        }
        window.location.reload(false);

    })








  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={handleUsernameChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleRememberMeChange} value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            // type="submit"
            fullWidth
            onClick={attemptLogin}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>       
        </form>
      </div>
    </Container>
  );
}