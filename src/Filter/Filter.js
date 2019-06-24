import React ,{Component} from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class Filter extends Component{
    render(){
      return(
        <div style={{textAlign:"left",marginLeft:"2.5%"}}>
          <h2 >Search..</h2>
          <input style={{width:"400px"}} type="text" onChange={event=>this.props.onTextchange(event.target.value)}/>
          
        </div>
      )
    }
  }