import React ,{Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import queryString from 'query-string';

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
      <div style={{...defaultStyle,width:"100px",padding:"20px",display:'inline-block',marginRight:"40%"}}>
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
      <div style={{...defaultStyle,width:"100px",marginLeft:"40%",display:'inline-block'}}>
        <h2>{(totalDuration/3600).toFixed(2)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component{
  render(){
    return(
      <div style={{textAlign:"left",marginLeft:"2.5%"}}>
        <h2 >Search..</h2>
        <input style={{width:"400px"}} type="text" onChange={event=>this.props.onTextchange(event.target.value)}/>
        
      </div>
    )
  }
}
class Playlist extends Component{
 
  
  render(){
    return(
      
/* 
      <div style={{...defaultStyle,width:'25%',float:'left',border:'1px solid black'}}>
        <img className="img-thumbnail" alt='' src={this.props.playlist.imageurl} style={{width:"150px"}}/>
        <h3>{this.props.playlist.name}</h3>
        <ul >
        {this.props.playlist.songs.map(song=>{
        return (<li >{song.name} </li>)
       })}
        </ul>
       
      </div>  */


      <div className="card" style={{width:"300px",height:"550px",margin:"50px",float:"left"}}>
  <img className="card-img-top" src={this.props.playlist.imageurl} alt=""/>
  <div className="card-body">
    <h4 className="card-title">{this.props.playlist.name}</h4>
    <ul className="card-text">
    {this.props.playlist.songs.map(song=>{
        return (<li >{song.name} </li>)
       })}</ul>
    <a href="#" className="btn btn-success">Play </a>
  </div>
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
    let parsed = queryString.parse(window.location.search);
    console.log(parsed)
    let accessToken=parsed.access_token
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(playlistData=>{
      let playlists=playlistData.items
      console.log(playlistData.items)
      let trackDataPromises=playlists.map(playlist=>{
        let responsePromise=fetch(playlist.tracks.href,{
        headers: {'Authorization': 'Bearer ' + accessToken}
      })
      let trackDataPromise=responsePromise
      .then(response=>response.json())
      return trackDataPromise
    })
    let allTrackDataPromises=Promise.all(trackDataPromises)
    let playlistPromise=allTrackDataPromises.then(trackDatas=>{
      trackDatas.forEach((trackData,i)=>{
        playlists[i].trackDatas=trackData.items.map(item => item.track)
        .map(trackData => ({
          name: trackData.name,
          duration: trackData.duration_ms / 1000
        }))
      })
      return playlists
    })
    return playlistPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        console.log(item.trackDatas)
        return {
          name: item.name,
          songs: item.trackDatas.slice(0,3),
          imageurl:item.images[0].url,
          id:item.id
        }
    })
    }))

  
}


  render(){
    let resultingplaylist = this.state.user && 
    this.state.playlists 
      ? this.state.playlists.filter(playlist => {
        let matchesPlaylist= playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
          let matchesSong= playlist.songs.find(song=>song.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
      return matchesPlaylist||matchesSong
      }
        ) 
      : []
    
    let headerStyle={...defaultStyle,fontSize:'50px',margin:"10px"}
    
    return(
     <div className="App">
      
      {this.state.user?
      <div>
      <h1 style={headerStyle}>{this.state.user.name}'s</h1>
     
      <PlaylistCounter playlists={resultingplaylist}/>
       <HoursCounter playlists={resultingplaylist}/>
       <Filter onTextchange={text=>{
         this.setState({filterString:text})
       }}/>
       {
         resultingplaylist.map(playlist=>{
          return <Playlist key={playlist.id} playlist={playlist}/>
         })
       }
      
       
       
       </div>:<button className="btn btn-success" onClick={() => {
            window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login' 
              : 'https://better-playlists-backend.herokuapp.com/login' }
          }
          style={{padding: '20px', fontSize: '50px', marginTop: '20px'}}>Sign in with Spotify</button>
    
    }
     </div>
    )
  }
}



export default App;
