import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Login from "./login"
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SignUp from './signup';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));



export default function SimpleModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    const handleToggle = () =>{
        setIsLogin(!isLogin)
    }

    useEffect(()=>{
        if(props.openByDefault){
            handleOpen()
        }
    },[])

    return (
      <div>
        
        {!props.openByDefault&& (
            <button type="button" onClick={handleOpen}>
            react-transition-group
        </button>)}



        <Modal
        disableBackdropClick={true}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          disableEscapeKeyDown
        >
          <Fade in={open}>
            <div className={classes.paper}>
              {/* <h2 id="transition-modal-title">Transition modal</h2> */}
              {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
                {/* {isLogin?(<div>Login</div>):(<div>Signup</div>)} */}
                {isLogin?(<Login></Login>):(<SignUp ></SignUp>)}
                <Grid container justify="center">
                    <Grid item>
                    <Link href="#" onClick={handleToggle} variant="body2">
                    {isLogin?(<p>Don't have an account? Sign Up</p>):(<p>Already have an account? Sign in</p>)}
                    </Link>
                    </Grid>
                </Grid>



              {/* <Button onClick={handleToggle}>Toggle Login</Button> */}
            </div>
          </Fade>
        </Modal>
      </div>
    );
}