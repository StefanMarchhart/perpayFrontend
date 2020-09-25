import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Login from "./login"
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SignUp from './signup';



// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));


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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isLogin, setIsLogin] = React.useState(props.isLogin);


  const handleToggle= (value)=>{
      setIsLogin(value)
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
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
      >
        <Fade in={open}>
          {/* {isLogin?( <Login toggle={handleToggle()}></Login>):(<SignUp toggle={handleToggle()}></SignUp>)} */}
        </Fade>
      </Modal>
    </div>
  );
}