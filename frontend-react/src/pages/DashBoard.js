import Header from '../Header';
import TodoList from '../TodoList';
import React from 'react';


import {useState,Fragment} from 'react'
const DashBoardPage =  () => {

    
        return (
            <Fragment>
                {/* <Header OpenSideBar={OpenSideBar}/>
                <Sidebar 
                    width={width}
                    CloseBar={CloseBar}
                /> */}
                <TodoList/>
            </Fragment>
        );
}

export default DashBoardPage;