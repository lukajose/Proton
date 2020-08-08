import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  makeStyles,
  ThemeProvider,
  TextField,
  Typography,
  createMuiTheme,
} from '@material-ui/core';
import React from 'react';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import { green } from '@material-ui/core/colors';
import '../axios';



const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor:  '#00FA9A',
    },
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
  },
  textfield: {

  }
}));

function LoginPage({setAuth, ...props }) {
  
  function handleSubmit(event) {
    event.preventDefault();
    
    // Get user inputs (TODO:)
    const email = event.target[0].value;
    const password = event.target[2].value;

    // Quick validation
    if (!email || !password) return;
    
    // Send to backend
    axios.post('/auth/login',{ email, password })
      .then((response) => {
        console.log('response:',response);
        const data = response.data;
        // change this when server works
        setAuth(data.token, data.u_id);
        props.history.push('/');
      })
      .catch((err) => {console.log(err)});
  }

  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  return (
    <Container component="main" maxWidth="sm">
      <Box boxShadow={3} className={classes.card}>
        <Avatar style={{backgroundColor:"black"}}>
          <BlurCircularIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form  onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="text"
            autoFocus
          />
          <TextField
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
          <Button type="submit" fullWidth variant="contained" color="primary" style={{backgroundColor:"#00b36e"}}>
            Sign In
          </Button>
          </ThemeProvider>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <br />
              <Link href="/register" variant="body1" style={{color:"#00b36e"}}>
                {"Don't have an account? Register"}
              </Link>
            </Grid>
            <Grid item>
              <br />
              <Link href="/forgot_password" variant="body1" style={{color:"#00b36e"}}>
                {"Forgot password?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;