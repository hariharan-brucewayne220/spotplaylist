import React ,{Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import queryString from 'query-string';
import HourCounter from './Counter/hourcounter';
import PlaylistCounter from './Counter/playlistcounter';
import Playlist from './Playlist/playlist';
import Filter from './Filter/Filter';
export const defaultStyle={
  color:'#fff'
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
       <HourCounter playlists={resultingplaylist}/>
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
              : 'https://spotifylist-backend.herokuapp.com//login' }
          }
          style={{padding: '20px', fontSize: '50px', marginTop: '20px'}}>Sign in with Spotify</button>
    
    }
     </div>
    )
  }
}



export default App;
