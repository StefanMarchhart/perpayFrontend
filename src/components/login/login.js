import React, {
  useState
} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import fallbackUrl from '../mainpage/mainpage'

function Alert(props) {
  return <MuiAlert elevation = {
    6
  }
  variant = "filled" {
    ...props
  }
  />;
}

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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Login(props) {
  const classes = useStyles();


  const [usernameValue, setusernameValue] = useState("")
  const [passwordValue, setpasswordValue] = useState("")
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorBody, setErrorBody] = React.useState("false");
  const [passwordError, setPasswordError] = React.useState(false);



  const handleClose = (event, reason) => {

    setOpen(false);
    setErrorBody("")
    // setPasswordError(false)
  }

  const postClose = (() => {
    setPasswordError(false)
  })

  // const[requestedToken,setRequestedToken] = useState("");


  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleUsernameChange = ((e) => {
    setusernameValue(e.target.value)
    handleClose()
  })

  const handlePasswordChange = ((e) => {
    setpasswordValue(e.target.value)
    handleClose()
  })

  const saveToken = ((token) => {
    if (rememberMe) {
      window.sessionStorage.setItem("userToken", token)

    } else {
      window.localStorage.setItem("userToken", token)
    }
    window.location.reload(false);

  })

  const attemptLogin = (() => {


    var data = {
      "username": usernameValue,
      "password": passwordValue,
    }
    console.log(data)

    fetch((process.env.REACT_APP_BACKEND_URL||fallbackUrl) + "api-token-auth/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 400) {
          throw res
        } else {
          throw new Error(res.status + " - " + res.statusText);
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

          if (e instanceof TypeError) {
            setPasswordError(false)
            setErrorBody("Network Error: Cannot Connect to Server")
            setOpen(true)
          }

          e.json().then((body) => {


            if (body["non_field_errors"]) {
              setErrorBody(body["non_field_errors"])
              setPasswordError(true)
              setOpen(true)
            } else if (body["password"] || body["username"]) {
              setErrorBody("Both fields are required")
              setPasswordError(true)
              setOpen(true)
            } else {
              console.log(e.body)
            }
          })

        }
      )


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
            error={passwordError}
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
            error={passwordError}
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
        <Snackbar onExited={postClose} anchorOrigin={passwordError?{vertical:'bottom',horizontal:'center'}:{vertical:'top',horizontal:'center'}}open={open} autoHideDuration={passwordError?6000:null} onClose={handleClose}>
          <Alert onClose={handleClose} severity={passwordError?"error":"info"}>
            {errorBody}
          </Alert>
        </Snackbar>   
        </form>
      </div>
    </Container>
  );
}