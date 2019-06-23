import React ,{Component} from 'react';
import './App.css';


let defaultStyle={
  color:'#fff'
}
let fakeServerData={
  user:{
    name:'hari',
    playlists:[
      {name:'My favourites',
    songs:[{name:'arerey manasa',duration:1000},{name: 'va va penne',duration:2000},{name: 'get it down',duration:5000}]},
    {name:'sunday sundae',
    songs:[{name:'this is me',duration:8000},{name: 'laughing',duration:7000},{name: 'jake',duration:1000}]},
    {name:'alien',
    songs:[{name:'baby',duration:8000},{name: 'laughing gas',duration:7000},{name: 'killing joke',duration:1000}]},
    {name:'Playlist -hell yeah',
    songs:[{name:'baby',duration:8000},{name: 'laughing gas',duration:7000},{name: 'killing joke',duration:1000}]}
    ]}
}

class PlaylistCounter extends Component{
  render(){
    return(
      <div style={{...defaultStyle,width:"40%",display:'inline-block'}}>
        <h2>{this.props.playlists&&this.props.playlists.length} playlists</h2>
      </div>
    )
  }
}

class HoursCounter extends Component{
  render(){
     
    let allSongs=this.props.playlists.reduce((songs,eachPlaylist)=>{
         return songs.concat(eachPlaylist.songs)
    },[])
    let totalDuration=allSongs.reduce((sum,eachsong)=>{
      return sum+=eachsong.duration
    },0)
    return(
      <div style={{...defaultStyle,width:"40%",display:'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component{
  render(){
    return(
      <div>
        <input type="text" onChange={event=>this.props.onTextchange(event.target.value)}/>
        <h2 >Filter</h2>
      </div>
    )
  }
}
class Playlist extends Component{
 
  
  render(){
    return(
      <div style={{...defaultStyle,width:'25%',float:'left'}}>
        <h3>{this.props.playlist&&this.props.playlist.name}</h3>
        <ul>
        {this.props.playlist.songs.map(song=>{
        return <li>{song.name} </li>
       })}
        </ul>
       
      </div>
    )
  }
}
class App extends Component{
  state={
    serverData:{},
    filterString:''
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({serverData:fakeServerData});
    },1000
    );
         
}


  render(){
    let resultingplaylist = this.state.serverData.user ? this.state.serverData.user.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
  ) : []
    
    let headerStyle={...defaultStyle,'font-size':'50px'}
    
    return(
     <div className="App">
      {this.state.serverData.user?
      <div>
      <h1 style={headerStyle}>{this.state.serverData.user.name}'s</h1>
      <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
       <HoursCounter playlists={this.state.serverData.user.playlists}/>
       <Filter onTextchange={text=>{
         this.setState({filterString:text})
       }}/>
       {
         resultingplaylist.map(playlist=>{
          return <Playlist playlist={playlist}/>
         })
       }
       
       
       </div>:<h1>Loading...</h1>
    
    }
     </div>
    )
  }
}



export default App;
