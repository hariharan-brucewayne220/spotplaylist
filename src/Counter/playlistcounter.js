import React ,{Component} from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default class PlaylistCounter extends Component{
    render(){
      return(
        <div style={{width:"100px",padding:"20px",display:'inline-block',marginRight:"40%"}}>
          <h2>{this.props.playlists&&this.props.playlists.length} playlists</h2>
        </div>
      )
    }
  }

