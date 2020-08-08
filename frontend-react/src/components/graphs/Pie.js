import React, {useEffect} from 'react'
import Pie_D3 from './Pie_D3.js'

function Pie({data,width,height}) {
    
    useEffect(()=>{
        // call pie function from d3
        Pie_D3(data)
    },[data])
    //style={{width:"auto",overflow:"hidden",height:"1000px"}}
    return (
        <div id="pie"></div>
    );
}

export default Pie;

