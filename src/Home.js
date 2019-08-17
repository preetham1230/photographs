import React, { Component } from 'react';
import axios from 'axios';
class Home extends Component {
    state = {
        persons: [],
        albums:[],
        photos:[]
      }


      constructor(props) {
        super(props);
        this.personsArray =[];
        this.albumsArray = [];
        this.photoArray=[];
        this.albumValue = 0;
      }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            this.personsArray = res.data;
            this.setState({ persons : res.data });
            console.log("data",this.state.persons);
          })
      
    }

    displayImage=(e)=>{
        this.albumValue = e.target.value;
        console.log(e.target.value);
        axios.get('https://jsonplaceholder.typicode.com/albums')
        .then(res=>{
            this.albumsArray = res.data.filter( x=> x.userId == this.albumValue);
            this.setState({ albums : this.albumsArray});
        })
    }

    photoDisplay=(f)=>{
        let photoValue = f.target.value;
        console.log("Hello",photoValue);
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(res=>{
            this.photoArray=res.data.filter( y=> y.albumId == photoValue );
            this.setState({ photos : this.photoArray});
        })
    }

    render() {
        return (

            <div style ={{ height: '50px'}}>
                <div style ={{backgroundColor: 'black', color:'white', height:'50px', fontSize: '30px',
                 marginBottom: '40px'}}>
                    Album App
                </div>
                <div className="container">
                    <label> Choose the user: </label>
                    <select class="form-control"  onClick={this.displayImage}>
                        {this.state.persons.map(persons=>
                            <option key= {persons.id} value={persons.id}>{persons.name}</option>
                        )}
                        
                    </select>
                     <div>
                        <label> Albums Title: </label>
                        {this.state.albums.map(albums=> 
                            <div style={{textAlign : "left"}}>
                            <button class="btn btn-link" value={albums.id} onClick={this.photoDisplay}>
                            {albums.title}  </button>
                            {this.albumValue == albums.id ?
                            <div class="row">
                                {this.state.photos.map(x=>
                                    <div class="col col-md-4">
                                        {x.title}
                                        <image src={x.thumbnailUrl} style={{height: "100px", width : "100px"}}/>
                                    </div>
                                    )}
                            </div>
                            : null }
                            </div>
                        ) }
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default Home;