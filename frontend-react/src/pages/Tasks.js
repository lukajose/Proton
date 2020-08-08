import React, {useState,useEffect} from 'react'
import axios from 'axios'
import LineChartD3 from '../components/graphs/LineChartD3'
import { Set } from 'core-js'

const Tasks = () => {
    // all tasks from user
    const [tasks,SetTasks] = useState(null)
    //aggregated tasks by day
    const [tasksAgg,SetTasksAgg] = useState(null)
    const [refresh,SetRefresh] = useState(false)
    const [refreshAgg,SetRefreshAgg] = useState(false)

    const mapTasks = (tasks) => tasks.map(task =>(
            <tr>
            <td>{task.task_id}</td>
            <td>{task.user_id}</td>
            <td>{task.task}</td>
            <td>{task.hours_taken}</td>
            <td>{task.date_completed}</td>
            </tr>
    ));
    var i = 0
    const dataLineFormat = (data) => data.map((task)=> {return {
            
            id:i++,
            name:'bla',
            date:task.date,
            value:task.total_hours
        }})


    useEffect(() => {
        //const res_data = GET_USERS()
        const promises = [axios({
            url:'/tasks/completed?u_id=1',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(res => {
            SetTasks(res.data.tasks)
            console.log('first promise:',res.data.tasks)
            SetRefresh(true)
        }),
        axios({
            url:'/tasks/completed/byday?u_id=1',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(res => {
            console.log('second promise:',res.data.tasks)
            SetTasksAgg(res.data.tasks)
            SetRefreshAgg(true)
        })]
        // console.log('pro:',promises)
        // Promise.all(promises,(values)=>{SetRefresh(true)
        //     console.log('it gets inside promise all')
        // })
        
        

    },[])
    
    return (
        <div className="main-tasks">
            {refreshAgg && <LineChartD3 data={dataLineFormat(tasksAgg)}/>}
            <div>
                <table className="t01" style={{width:"100%"}}>
                    <tr>
                    <th>task_id</th>
                    <th>user_id</th>
                    <th>task</th> 
                    <th>hours_taken</th>
                    <th>date_completed</th>
                    </tr>
                    {refresh && tasks && mapTasks(tasks)}
                </table>
            </div>
        </div>
    )
}

export default Tasks
