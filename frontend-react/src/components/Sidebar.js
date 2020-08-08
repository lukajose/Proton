import React, {useState,Fragment} from 'react'
import {Link} from 'react-router-dom'
import '../CSS/sidebar.css'
import { fontSize } from '@material-ui/system'
const Sidebar = ({width,CloseBar}) => {
    return (
        <Fragment>
            <div id="mySidebar" class="sidebar" style={{width}}>
                <a href="javascript:void(0)" class="closebtn" onClick={CloseBar} style={{borderBottom:"none"}}>x</a>
                {/* <a href="#">Tasks</a>
                <a href="#">Analytics</a>
                <a href="#">Networks</a> */}
                <span className="proton" style={{color:"white" ,fontSize:"30px"}}><i class="fas fa-atom"></i> Proton</span>
                <Link to='/tasks'>Tasks</Link>
                <Link to='/analytics'>Analytics</Link>
                <Link to='/networks'>Networks</Link>
                <Link to='/allusers'>AllUsers</Link>
            </div>
        </Fragment>
    )
}

export default Sidebar;
