import React, {
  useEffect,
  useState
} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import fallbackUrl from '../mainpage/mainpage'





const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));





export default function SignUp(props) {
  const classes = useStyles();

  const [companyValue, setCompanyValue] = React.useState('');
  const [companyList, setCompanyList] = React.useState(["No Companies Found"])
  const [usernameValue, setUsernameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [openGood, setOpenGood] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorBody, setErrorBody] = useState("")

  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [companyError, setCompanyError] = useState(false)

  // const[validationErrors,setValidationErrors]=useState([])

  useEffect(() => {
        fetch((process.env.REACT_APP_BACKEND_URL||fallbackUrl) + "companies?format=json")
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error(res.status + " - " + res.statusText);
            }
          }).then(
            (result) => {

              setCompanyList(result)
              // setCompanyValue(companyList[0])


            },
            (e) => {
              console.log(e)
              console.log("error hit")
            }
          )
        }, [])




      const ValidateUsername = (() => {
        var shortUsername = "Username must be >4 chars"
        console.log(usernameValue.length)
        if (usernameValue.length < 4) {

          if (!validationErrors.includes(shortUsername)) {
            setValidationErrors(validationErrors => [...validationErrors, shortUsername])
            setUsernameError(true)
          }
        } else {
          setValidationErrors(validationErrors.filter(e => e !== shortUsername))
          setUsernameError(false)
          setOpenError(false)

        }
      })


      const ValidateEmail = (() => {
        var invalidEmail = "Email Address not Valid"
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(emailValue).toLowerCase())) {
          if (!validationErrors.includes(invalidEmail)) {
            setValidationErrors(validationErrors => [...validationErrors, invalidEmail])
            setEmailError(true)
          }
        } else {
          setValidationErrors(validationErrors.filter(e => e !== invalidEmail))
          setEmailError(false)
          setOpenError(false)
        }

      })


      const ValidatePassword = (() => {
        var shortPassword = "Password must be >8 chars"
        if (passwordValue.length < 8) {

          if (!validationErrors.includes(shortPassword)) {
            setValidationErrors(validationErrors => [...validationErrors, shortPassword])
            setPasswordError(true)
          }
        } else {
          setValidationErrors(validationErrors.filter(e => e !== shortPassword))
          setPasswordError(false)
        }
      })

      const ValidateConfirmPassword = (() => {
        var samePassword = "Passwords must match"
        if (passwordValue !== confirmPasswordValue) {
          if (!validationErrors.includes(samePassword)) {
            setValidationErrors(validationErrors => [...validationErrors, samePassword])
            setConfirmPasswordError(true)
          }
        } else {
          setValidationErrors(validationErrors.filter(e => e !== samePassword))
          setConfirmPasswordError(false)
        }
      })


      const ValidateCompany = (() => {
        var companyPick = "A company needs to be picked"
        if (!companyValue) {
          setValidationErrors(validationErrors.push(companyPick))
          setCompanyError(true)
        } else {
          setValidationErrors(validationErrors.filter(e => e !== companyPick))
          setCompanyError(false)
        }
      })

      const Validate = (() => {

        ValidateUsername()
        ValidateEmail()
        ValidatePassword()
        ValidateConfirmPassword()
        ValidateCompany()

      })








      const attemptSignup = (() => {

        Validate()
        if (validationErrors.length) {
          return
        }

        var data = {
          "username": usernameValue,
          "password": passwordValue,
          "email": emailValue,
          "company": companyValue,
        }

        // var data={
        //     "username":"newuserss",
        //     "password":"password",
        //     "email":"testemail@gmasidada.com",
        //     "company":1,
        // }
        console.log(data)

        fetch((process.env.REACT_APP_BACKEND_URL||fallbackUrl) + "signup/", {
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
              window.localStorage.setItem("userToken", result["token"])
              setOpenGood(true)


            }).catch(error => {

            error.json().then((body) => {
              console.log(body)

              if (body["email"]) {
                setErrorBody(body["email"])
                setEmailError(true)
                setOpenError(true)
              } else if (body["username"]) {
                setErrorBody(body["username"])
                setUsernameError(true)
                setOpenError(true)
              } else {
                console.log(error.body)
              }
            })
          })




      })



      const handleCompanyChange = (event) => {
        setCompanyValue(event.target.value);
      };

      const handleUsernameChange = ((e) => {
        setUsernameValue(e.target.value)
        ValidateUsername()
      })
      const handleEmailChange = ((e) => {
        setEmailValue(e.target.value)
        ValidateEmail()

      })

      const handlePasswordChange = ((e) => {
        setPasswordValue(e.target.value)
        ValidatePassword()
      })
      const handleConfirmPasswordChange = ((e) => {
        setConfirmPasswordValue(e.target.value)
        ValidateConfirmPassword()
      })


      function Alert(props) {
        return <MuiAlert elevation = {
          6
        }
        variant = "filled" {
          ...props
        }
        />;
      }

      const handleCloseGood = (event, reason) => {

        window.location.reload(false);

      };
      const handleCloseError = (event, reason) => {

        setOpenError(false);
      };




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleUsernameChange}
                variant="outlined"
                required
                error={usernameError}
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onBlur={handleUsernameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleEmailChange}
                onBlur={handleEmailChange}
                variant="outlined"
                required
                error={emailError}
                // error={validationErrorTypes.includes["Email"]}
                // error={validationErrorTypes.includes("email")?(true):(false)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handlePasswordChange}
                onBlur={handlePasswordChange}
                variant="outlined"
                required
                error={passwordError}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordChange}
                variant="outlined"
                error={confirmPasswordError}
                // helperText="Test"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                // autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Company *</InputLabel>
                <Select
                required
                error={companyError}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={companyValue}
                onChange={handleCompanyChange}
                // onBlur={handleCompanyChange}
                label="Company"
                >
                {companyList.map((column) => {
                    return (
                    <MenuItem value={column[0]}>{column[1]}</MenuItem>
                    );
                  })}

                </Select>
            </FormControl>
          </Grid>
          </Grid>
          {validationErrors.map((vError,vIndex) => {
                    return (
                    // <p key={"vIndex"+vIndex}>{vError}</p>
                    <Typography align="center" component="h6" color="error" key={vIndex}>{vError}</Typography>
                    )
                  })}
          {/* <p>{validationErrorTypes.includes("Email")}</p> */}
          <Button
            disabled={usernameError||passwordError||confirmPasswordError||emailError||companyError}
            // type="submit"
            onClick={attemptSignup}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        <Snackbar open={openGood} autoHideDuration={2500} onClose={handleCloseGood}>
          <Alert onClose={handleCloseGood} severity="success">
            Account Created! Signing you in...
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={10000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {errorBody}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}