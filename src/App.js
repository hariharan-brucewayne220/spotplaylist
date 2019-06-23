import React ,{Component} from 'react';
import './App.css';

class Aggregate extends Component{
  render(){
    return(
      <div style={{width:"40%",display:'inline-block'}}>
        <h2 style={{color:'black'}}>Number Text</h2>
      </div>
    )
  }
}
class Filter extends Component{
  render(){
    return(
      <div>
        <input type="text"/>
        <h2 style={{color:'black'}}>Filter</h2>
      </div>
    )
  }
}
class Playlist extends Component{
  render(){
    return(
      <div style={{color:'black',width:'25%',float:'left'}}>
        <h3>Playlist Name</h3>
        <ul>
        <li>song 1</li>
        <li>song 2</li>
        <li>song 3</li>
        <li>song 4</li>
        </ul>
      </div>
    )
  }
}
class App extends Component{
  render(){
    let name='Hariharan'
    let blue="blue"
    let headerStyle={color:blue,'font-size':'50px'}
    return(
     <div className="App">
       <h1 style={headerStyle}>{name}</h1>
       <Aggregate/>
       <Aggregate/>
       <Filter/>
       <Playlist/>
       <Playlist/>
       <Playlist/>
       <Playlist/>
     </div>
    )
  }
}



export default App;
