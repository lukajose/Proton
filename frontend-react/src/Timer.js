import React, {Component} from "react";
import "./Timer.css"
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';


class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours:1,
            minutes:0,
            seconds:0,
            TotalHours:0,
        }
        this.changeTimer = this.changeTimer.bind(this);
        this.UpdateTimeHours = this.UpdateTimeHours.bind(this);
        this.UpdateTimeMinutes = this.UpdateTimeMinutes.bind(this);
        this.UpdateTimeSeconds = this.UpdateTimeSeconds.bind(this);
        this._inputHours= null;
        this._inputMinutes = null;
        this._inputSeconds = null;
    }

    //Given any input from the input boxes transform seconds to minutes and minutes to hours
    transformTime() {
        let {hours, minutes,seconds} = this.state;
        // Keep checking everytime updates occur
        if (seconds > 60 || minutes > 60) { // avoid infinite loop 
            while (seconds > 60 || minutes > 60) {
                if (seconds > 60) {
                    seconds -= 60;
                    // Convert string to int to calculate proper conversion
                    minutes = minutes + 1;
                }
                if (minutes > 60) {
                    minutes -= 60;
                    // same as above
                    hours = hours+ 1;
                }
            }
            this.setState({
                        hours:hours,
                        minutes:minutes,
                        seconds:seconds
                    });

        }
        
    }

    checkTimer() {
        
        return this.props.starter;
    }

    getHours(hours,minutes,seconds) {
        console.log('Starth:',hours,'min:',minutes,'sec:',seconds);
        const Hminutes = minutes/60;
        const Hseconds = (seconds/60)/60;
        hours += Hminutes + Hseconds;
        // get all minutes and seconds in hours
        console.log('h:',hours,'min:',minutes,'sec:',seconds);
        return hours;
    }

    



    componentDidUpdate(prevProps) {

        // if change in state and timer is activated start coundown
        if((prevProps.starter !== this.props.starter) && (this.checkTimer() === true)) {
            const { hours,minutes, seconds } = this.state;
            // Store total hours completed before starting countdown
            const TotalHours = this.getHours(hours,minutes,seconds);
            this.setState({TotalHours:TotalHours});
            this.myInterval = setInterval(
                () => {
                const { hours,minutes, seconds } = this.state;
                // if seconds are greater than 0 keep decrementing
                if (seconds > 0) { 
                    this.setState(({ seconds }) => ({
                        // keep decrementing seconds until seconds is 0.
                        seconds: seconds - 1
                    }))
                }
                // check if minutes still need to decrement
                else {
                    if (minutes === 0) {
                        if(hours === 0) {
                            clearInterval(this.myInterval);
                            this.setState({
                                hours:1,
                                minutes:0,
                                seconds:0,
                            });
                            //update hours in item
                            this.props.addHours(this.state.TotalHours,this.props.current);
                            // return the time back to edit mode. (change the boolean in parent node).
                            this.changeTimer();
                            // send info to the db
                            this.props.SendTask(this.props.current,this.state.TotalHours)
                            
                        } else {
                            // keep decrementing hours
                            this.setState(({hours}) => ({
                                minutes:59,
                                seconds:59,
                                hours:hours-1
                            }))

                        }
                    } else {
                        // keep decrementing minutes leave hours as it is.
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                    }
                } 
            }, 1000);
    
        }
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }


    

    UpdateTimeHours(e) {
        if ( (e.target.value !== "" )  && (!isNaN(e.target.value) ) ) {
            // set new state
            this.setState({hours:parseInt(e.target.value)});
            this.transformTime();
        }        

    }

    UpdateTimeMinutes(e) {
        console.log('e:',e.target.value);
        if ( (e.target.value !== "" )  && (!isNaN(e.target.value) ) ) {
            // set new state
            this.setState({minutes:parseInt(e.target.value)});
            this.transformTime();
        }        

    }

    UpdateTimeSeconds(e) {
        if ( (e.target.value !== "" )  && (!isNaN(e.target.value) ) ) {
            // set new state
            this.setState({seconds:parseInt(e.target.value)});
            this.transformTime();
        }        

    }

    changeTimer() {
        this.props.changeTimer();
    }

    timeFormat(time) {
        if(time < 10) {
            time = '0' + time;
        }
        return time;
    }

    //If cancel gets clicked change stop timer and delete last added item.
    cancelItemCountdown() {
        
        this.changeTimer();
    }
    
    render () {
        //this.updateTime();
        //this.transformTime();
        
        const hours = this.timeFormat(this.state.hours);
        const minutes = this.timeFormat(this.state.minutes);
        const seconds = this.timeFormat(this.state.seconds);
        // if TodoList indicates not to start keep displaying the edit timer.
        if (this.checkTimer() === false) {
            return (
                <div className="timer-editor">
                    <table>
                        <tbody>
                            <tr className = "text-timer">
                                <th>Hours</th>
                                <th>Minutes</th>
                                <th>Seconds</th>
                            </tr>
                        </tbody>
                        <tbody>
                        <tr className="input-timer">
                                <td>
                                    <input
                                    //ref={ (a) => this._inputHours = a} 
                                        placeholder={hours}
                                        onChange={this.UpdateTimeHours}
                                    >
                                    </input>
                                </td>
                                <td>
                                    <input 
                                        //ref={ (a) => this._inputMinutes = a}
                                        placeholder={minutes}
                                        onChange={this.UpdateTimeMinutes}
                                    >

                                    </input>
                                </td>
                                <td>
                                    <input
                                    //ref= { (a) => this._inputSeconds = a}
                                        placeholder={seconds}
                                        onChange={this.UpdateTimeSeconds}
                                    >
                                    </input>
                                </td>
                                <td><AccessAlarmIcon/></td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
                
            );
        } else { // display timer countdown
            
            return (
                    <div className='timer-countdown'>
                        <p className="timer-countdown-text">{hours+ ':'+minutes + ':' + seconds} <AccessAlarmIcon/>
                            <div>
                                <form onSubmit={this.cancelItemCountdown}>
                                    <button type="submit" className='cancel-button'>Cancel</button>
                                </form>
                            </div>
                            
                        </p>
                        
                    </div> 
            );
        }
    }
}
export default Timer;