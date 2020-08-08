import React, {Component} from 'react';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this)
  }

  

  getStyle = (item) => {
    return {textDecoration: item.completed? 'line-through':'none'};
  }



  createTasks(item){
    return (<li style={this.getStyle(item)}>
              {item.text}
              <span>
                <CheckIcon onClick= {() => this.completed(item.key)}
                                        key= {item.key}/>
                <EditIcon onClick= {() => this.rename(item.key)}
                            key={item.key+1}/>
                <DeleteIcon onClick= {() => this.delete(item.key)}
                            key={item.key+2} />
              </span>
            </li>

          )
  }

  delete(key) {
    this.props.delete(key);
  }

  rename(key) {
    this.props.edit(key);
  }

  completed(key) {
    this.props.completed(key);
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
         {listItems}
      </ul>

    );
  }
}

export default TodoItems;
