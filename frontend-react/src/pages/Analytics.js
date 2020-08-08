import React,{Fragment,useState,useEffect} from 'react'
import '../CSS/spinner.css'


const Analytics = () => {


    return (
        <div className="analytics-main">
            <div style={{textAlign:"center"}}>
                <h1>This is under Development</h1>
            </div>
            <div class="trinity-rings-spinner" style={{marginLeft:"50%",marginRight:"50%"}}>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <div class="atom-spinner" style={{marginLeft:"50%",marginRight:"50%"}}>
                <div class="spinner-inner">
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-circle">
                    &#9679;
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
