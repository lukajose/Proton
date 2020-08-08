import axios from 'axios';
import {
    Avatar,
    Box,
    Button,
    Container,
    ThemeProvider,
    Grid,
    Link,
    makeStyles,
    TextField,
    Typography,
    createMuiTheme,
} from '@material-ui/core';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import React from 'react';
import { green } from '@material-ui/core/colors';
import '../axios'

const useStyles = makeStyles((theme)=> ({
        '@global': {
            body: {
                backgroundColor: '#00FA9A',

            },

        },
        card: {
            backgroundColor:theme.palette.background.paper,
            marginTop:theme.spacing(8),
            padding: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: theme.shape.borderRadius,
            
        }
    })
);



function RegisterPage({setAuth, ... props}) {
    // use current input
    const [values,setValues] = React.useState({
        name_first: '',
        name_last:'',
        email:'',
        password:''

    });
    const handleChange = name=> event => {
        setValues({...values,[name]:event.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();

        //quick check
        if(!values.email || !values.password) return;
        console.log('values:',{...values})
        // send data to backend
        axios.post('/auth/register', {... values})
            .then((response) => {
                console.log(response);
                const data = response.data;
                setAuth(data.token,data.u_id);
                props.history.push('/');
            })
            //in case of error
            .catch((err)=> {console.log('error register',err)});

    }

    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
          primary: green,
        },
      });

    return (
        <Container component= "main" maxWidth="sm">
            <Box boxShadow= {3} className= {classes.card}>
                <Avatar style={{backgroundColor:"black"}}>
                    <BlurLinearIcon style={{fontSize:30}}/> 
                </Avatar>               
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <ThemeProvider theme={theme}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name_first"
                        label="Firt name"
                        name="name_first"
                        type="text"
                        autoFocus
                        value={values.name_first}
                        onChange={handleChange('name_first')}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name_last"
                        label="Last name"
                        name="name_first"
                        type="text"
                        value={values.name_last}
                        onChange={handleChange('name_last')}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange('password')}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{backgroundColor:"#00b36e"}}>
                            Sign Up
                        </Button>
                    </ThemeProvider>
                    <Grid container>
                        <Grid item>
                            <br />
                            <Link href="/login" variant="body1" style={{color:"#00b36e"}}>
                                {'Already have an account? Login'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default RegisterPage;