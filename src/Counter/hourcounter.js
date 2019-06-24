import React ,{Component} from 'react';
import '../App.css';

export default class HoursCounter extends Component{
    render(){
       
      let allSongs=this.props.playlists.reduce((songs,eachPlaylist)=>{
           return songs.concat(eachPlaylist.songs)
      },[])
      let totalDuration=allSongs.reduce((sum,eachsong)=>{
        return sum+=eachsong.duration
      },0)
      return(
        <div style={{width:"100px",marginLeft:"40%",display:'inline-block'}}>
          <h2>{(totalDuration/3600).toFixed(2)} hours</h2>
        </div>
      )
    }
  }