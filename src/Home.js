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
            
            this.albumsArray = res.data.filter(x => x.userId == this.albumValue);
            this.setState({ albums : this.albumsArray});
        })
        
    }

    photoDisplay=(f)=>{
        let photoValue = f.target.value;
        axios.get('https://jsonplaceholder.typicode.com/photos/?albumId='+photoValue)
        .then(res=>{
            this.photoArray = res.data;
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
                    <h2 style={{textAlign: "left"}}> Choose the user: </h2>
                    <select class="form-control"  onClick={this.displayImage}>
                        <option></option>
                        {this.state.persons.map(persons=>
                            
                            <option key= {persons.id} value={persons.id}>{persons.name}</option>
                        )}
                        
                    </select>
                     <div>
                        <h2 style={{textAlign: "left"}} class="mt-4"> Click albums title to see their photos </h2>
                        {this.state.albums.map(albums=> 
                            
                            <div style={{textAlign : "left"}}>
                            <button class="btn btn-link" value={albums.id} onClick={this.photoDisplay}>
                            {albums.title}  </button>
                            
                            <div class="row">
                                {this.state.photos.map(x=>
                                albums.id == x.albumId ? 
                                    <div class="col col-md-4 mb-4" >
                                        <div>
                                            {x.title}
                                        </div>
                                        <img src={x.thumbnailUrl} style={{height: "150px", width : "150px"}}/>
                                        </div>
                                    
                                    : null 
                                    )}
                            </div>
                            
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