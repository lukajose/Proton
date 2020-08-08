import React, {useState} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import {AuthProvider} from './AuthContext';
import ProtectedRoute from './components/protectedRoute';
import DashBoard from './pages/DashBoard';
import Analytics from './pages/Analytics'
import './axios';
import AllUsers from './pages/AllUsers'
import Tasks from './pages/Tasks'
import Header from './Header';
import Sidebar from './components/Sidebar';



function App () {
    const [authDetails,setAuthDetails] = React.useState(
        localStorage.getItem('token')
    );

    function setAuth(token,u_id) {
        localStorage.setItem('token',token);
        localStorage.setItem('u_id',u_id);
        setAuthDetails(token);
    }
    const [width,SetWidth] = useState(0);
    const OpenSideBar = (width)=> {
        SetWidth(250);
    }
    const CloseBar = () => {
        SetWidth(0);

    }

    return (
        <AuthProvider value={authDetails}>
            <Router>
                <Switch>
                    <Route exact path="/login" render={(props)=>{
                        return <LoginPage {...props} setAuth={setAuth}/>;
                    }}/>
                    <Route exact path="/register" render={(props)=>{
                        return <RegisterPage {...props} setAuth={setAuth}/>;
                    }}/>
                </Switch>
            </Router>
            
            <Router>
            <Header  OpenSideBar={OpenSideBar}/>
            <Sidebar  width={width} CloseBar={CloseBar}/>
                <Switch>
                    <ProtectedRoute exact path="/" component={DashBoard}/>
                    <ProtectedRoute exact path="/analytics" component={Analytics}/>
                    <ProtectedRoute exact path="/allusers" component={AllUsers}/>
                    <ProtectedRoute exact path="/tasks" component={Tasks}/>

                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;


