import axios from 'axios'


const GET_USERS = async () => {
    try {
        const response = await axios({
            url:'/test',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Encoding':'gzip, deflate, br'
            },
        })
        return response.data
    } catch(err) {
        console.log(err)
        return null;
    }
}


const POST_TASK = (u_id,task,hours_taken) => {
    console.log(`task:${task}`)
    try {
        axios({
            url:'/tasks/completed',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                u_id,
                task,
                hours_taken
            }
        }).then((res)=>console.log(res.data))
    } catch(err) {
        // wait 5 seconds and try again
        setTimeout(()=> {
            POST_TASK(u_id,task,hours_taken)
        },5000)
    }
}

//export default GET_USERS;
export default POST_TASK;