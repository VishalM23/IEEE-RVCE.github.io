import React from "react";
import {
  Paper,
  TextField,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(8)
  },
  button: {
    color: "#00629B",
  }
}));

export default function Signin() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    ieeeid: "",
    password: "",
    ieeeidValid: true,
    passwordValid: true,
    showPassword: false,
    authFail: false,
    networkError: false,
    incorrectInfo: false,
  });

  function validateValues(prop, value) {
    console.log(prop)
    if (prop === "ieeeid") {
      const re = /^\d{10}$/;
      return re.test(String(value).toLowerCase());
    } else {
      const re = /^.{8,}$/;
      return re.test(String(value).toLowerCase());
    }
  }

  // Handle changes on text and updates value
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      [prop + "Valid"]: validateValues(prop, event.target.value),
    });
  };

  /**
   *
   * @param {React.MouseEvent<HTMLInputElement, MouseEvent>} event
   */
  const onSubmitSignIn = async (event) => {
    if(values.ieeeidValid && values.passwordValid){
      await axios.post("http://forseti-full.herokuapp.com/api/auth", {
        uid: values.ieeeid,
        pwd: values.password
      })
      .then(res => {
        if(res.data.ok === true && res.data.auth === true)
        {
          localStorage.setItem('atoken', res.data.atoken)
        }
        else {
          setValues({...values, ieeeidValid: false, passwordValid: false, authFail: true})
        }
      })
      .catch(err => {
        console.error(`Axios request failed: ${err}`)
        setValues({...values, ieeeidValid: false, passwordValid: false, networkError: true})
      })
    }
    else{
      setValues({
        ...values,
        incorrectInfo: !values.ieeeidValid && !values.passwordValid,
      })
    }
  };

  // Handling show and hide password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // So that the usual mouse down activity doesn't happen
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Handle closing of snackbars
  const handleClose = (prop) => (event, reason) => {
    if(reason === 'clickaway')
      return;
    setValues({...values, [prop]:false})
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Sign in</Typography>
        <br />
        <div>
          <TextField
            id="ieeeid"
            label="IEEE ID"
            type="number"
            placeholder="Enter your IEEE ID"
            variant="outlined"
            fullWidth
            error={!values.ieeeidValid}
            onChange={handleChange("ieeeid")}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <br />
        <div>
          <TextField
            id="standard-adornment-password"
            label="Password"
            placeholder="Enter your password"
            error={!values.passwordValid}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            fullWidth
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            variant="outlined"
            onChange={handleChange("password")}
          />
        </div>
        <br />
        <Snackbar open={values.incorrectInfo} autoHideDuration={6000} onClose={handleClose('incorrectInfo')}>
          <Alert elevation={6} variant="filled" onClose={handleClose('incorrectInfo')} severity="error">Incorrect Information entered</Alert>
        </Snackbar>
        <Snackbar open={values.authFail} autoHideDuration={6000} onClose={handleClose('authFail')}>
          <Alert elevation={6} variant="filled" onClose={handleClose('authFail')} severity="error">Invalid username or password</Alert>
        </Snackbar>
        <Snackbar open={values.networkError} autoHideDuration={6000} onClose={handleClose('networkError')}>
          <Alert elevation={6} variant="filled" onClose={handleClose('networkError')} severity="error">Failed connecting to server</Alert>
        </Snackbar>
        <div>
          <Button variant="outlined" color="inherit" className={classes.button} onClick={onSubmitSignIn}>
            Submit
          </Button>
        </div>
      </Paper>
    </Container>
  );
}