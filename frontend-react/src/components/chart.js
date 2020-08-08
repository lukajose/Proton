import React, {Component} from "react";
import {Bar,Pie} from 'react-chartjs-2';
import { positions } from "@material-ui/system";
//{Bar,Line,Pie}

class Chart extends Component {

    render() {
        return (
            <div className = "BarChart">
                <Bar data={
                    {
                        labels: this.props.ChartData.labels,
                        datasets:[{
                            label:'Total Hours',
                            data:this.props.ChartData.data,
                            backgroundColor:'#ccffcc',
                        }],
                    }
                
                } 
                    width={50}
                    height={30}
                    options={
                        {
                            legend: {
                              display: true,
                              labelString: 'Hours Today'
                            },
                            scales: {
                              yAxes: [{
                                ticks: {
                                   beginAtZero:true,
                                   stepSize:1,
                                 }
                               }]
                            }
                        }
                    }
                />
            </div>
        );

    }
}

export default Chart;


