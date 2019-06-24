import React ,{Component} from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default class Playlist extends Component{
 
  
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