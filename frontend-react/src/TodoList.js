import React, {Component} from "react";
import TodoItems from './TodoItems';
import "./TodoList.css";
import Timer from './Timer.js';
import Chart from './components/chart';
import Pie from './components/graphs/Pie'
import POST_TASK from './utils/API_OPERATIONS'


class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {items:[], search:[],startTimer:false,taskId:1,currentKey:0}
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renameItem = this.renameItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.SendTask = this.SendTask.bind(this);
  }

  changeTimer() {
    this.setState({startTimer:!this.state.startTimer}); 
    //this.startTimer = !this.startTimer;
    console.log('timer is now: ',this.state.startTimer);
  }
  

  addItem(e) {
    //if new item then add to items list
    if (this._inputElement !== "") {
      // Start timer
      //new element to add
      let taskId = this.state.taskId;
      const key = Date.now();
      var item = {
        text: this._inputElement.value, // text to store from input box
        key: key, // get the time now as id
        completed: false, // to format style later when task completed
        hours:0, // hours spent on this task
        TaskId:('T'+ taskId), // To format the bars instead of displaying the whole description
      };

      
      if(item.text !== "" && this.state.startTimer === false) { // avoid empty tasks
        
        //Update Search state
        var newS = this.state.search; // check if search is NOT empty to update state
        if(!this.isSearchEmpty(this.state.search)) {
          newS = newS.concat(item) // include to update state when searching
        }
        
        //Add element to both initial list and search state
        this.setState((prevState)=> ({
          //get the last previous state add new item, update search item if needed
          items:prevState.items.concat(item),
          search:newS,
          taskId: taskId+= 1,
          currentKey:key,
        }));
        // Also update timer to start when added
        this.changeTimer();
      }

      //finally set the string to empty
      this._inputElement.value = ""
      e.preventDefault(); // avoid default option
      
    }
  }
  //filters items and returns everything except the item with that key
  deleteItem(key) {
    if(this.state.startTimer === false) {
       //filter condition
      function delete_filter(item) {
        return (item.key !== key);
      }
      const filteredItems = this.state.items.filter(delete_filter);
      var newS = this.state.search;
      if(!this.isSearchEmpty(this.state.search)) {
        newS = this.state.search.filter(delete_filter) // include to update state when searching
      }
      
      this.setState({
        items:filteredItems,
        search:newS
      })

    }
   
  }

  cancelClock(key) {
      //filter condition
      function delete_filter(item) {
        return (item.key !== key);
      }
      const filteredItems = this.state.items.filter(delete_filter);
      var newS = this.state.search;
      if(!this.isSearchEmpty(this.state.search)) {
        newS = this.state.search.filter(delete_filter) // include to update state when searching
      }
      
      this.setState({
        items:filteredItems,
        search:newS
      })

  }

  // when click prompt will ask for new message and rename that item
  renameItem(key) {
    var message = prompt("Rename to do task");
    // if key is equal to what we look for rename the task with new message.
    function Rename(item) {
      if (item.key===key){
        return item.text=message;
      }
    }
    const items = this.state.items;
    items.map(Rename);
    this.setState({
      items:items
    })
  }
  //gets the key and marks the task as completed will change the style when boolean is true
  markCompleted(key) {
    const items = this.state.items;

    function findKey(item){
      if(item.key === key) {
        return item.completed = !item.completed;
      }
    }
    items.map(findKey);
    this.setState({
      items:items
    })
  }

  isSearchEmpty(Ar) {
    return (Array.isArray(Ar) && Ar.length)? false : true;
  }
  searchItem(e) { 
    // current list hold original version
    let newL = []; // new list holds filtered version
    let currentL = this.state.search;
    if(e.target.value !== "") {
      if(this.isSearchEmpty(this.state.search)) {
        currentL = this.state.items; //save initial state
      }
      //Search filter based on input
      function check_search(item) {
        const str_check = item.text.toLowerCase();
        return (str_check.includes(e.target.value));
      }
      //apply filter

      newL = currentL.filter(check_search);
    } else {
      //we want to display original list if search is empty if not then search result
      let searchA = this.state.search;
      (Array.isArray(searchA) && searchA.length)? newL = this.state.search : newL = this.state.items; // condition to check what to update
      currentL = []
    }
    this.setState({
      items:newL,
      search:currentL // update the state
    })
  }

  AddTaskHours(hours,key) {
    // Find key, then add hours
    function AddHours(item) {
      if (item.key===key) {
        item.hours += hours
      }
    }
    const items = this.state.items;
    console.log(items)
    items.map(AddHours);
    this.setState({items:items});

  }

  getCharData() {
    //get list of items
    const items = this.state.items;
    let labels,data;
    
    if(items.length > 0) {
      labels = new Array(items.length);
      data = new Array(items.length);
      for(let i = 0; i < items.length; i++) {
        labels[i] = items[i].text;
        data[i] = items[i].hours; 
      } 
      
    } else {
        labels = new Array('Add tasks to start displaying your hours!');
        data = [0];
      }
    
    var ChartData = {
      labels:labels,
      data:data,
    }

    return ChartData;
    

  }

  getPieData(items) {
    console.log('items:',items)
    if(items.length === 1 && items[0].hours === 0) {
      return {empty:100};
    } else {
      let data = {}
      for(let i = 0; i < items.length; i++) {
        data[items[i].text] = items[i].hours; 
      } 
      return data;
    }
  }
  SendTask(task_key,hours) {
    // needs to be changed when we have users
    const u_id = "1";
    // send info to db
    const items = this.state.items;
    //find the task description
    const task = items.find(item => item.key === task_key);
    console.log('task in f:',task)
    POST_TASK(u_id,task.text,hours);

  }
  
  render() {
    return (
      <div className= "todoListMain">
        <Timer starter = {this.state.startTimer}
                  changeTimer = {()=>this.changeTimer()}
                  addHours={(hours,key)=>this.AddTaskHours(hours,key)}
                  current={this.state.currentKey}
                  cancelItem={this.cancelClock}
                  SendTask={this.SendTask}

          />
        <div className="container"  style={{display:"flex"}}>
          <div className="tasks">
            <div className="input-box-todo">
              <form onSubmit={this.addItem}>
                <input
                  ref={ (a) => this._inputElement = a }
                  placeholder="Enter to do ...">
                </input>
              </form>               
            </div>
            <div className = 'input-box-search'>
              <input placeholder="Task to search .." onChange={this.searchItem}></input>
            </div>
            <TodoItems entries={this.state.items}
                    delete={this.deleteItem}
                    edit={this.renameItem}
                    completed= {this.markCompleted}/>
          </div>
            {/* <form>
                <legend>Graph type</legend>
                  <p> 
                    <select id= "myList" className ="dropdown-selector">
                      <option value='bar'>Bar Chart</option>
                      <option value='line'>Line Chart</option>
                      <option value='pie'>Pie Chart</option>
                    </select>
                  </p>
              </form> */}
              {/* <Chart ChartData = {this.getCharData()}
              AllData = {this.state.items}
              /> */}
              <Pie data={this.getPieData(this.state.items)}/>
        </div>
      </div>
    );
  }
}

export default TodoList;
