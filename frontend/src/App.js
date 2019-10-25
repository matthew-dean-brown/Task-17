import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      webs:[],
      id: '',
      title: '',
      description:'',
      url:''
    }
  }
  componentDidMount(){
    fetch('/api', { method:"get", headers: {"Content-Type": "application/json" }})
      .then(res => res.json())
      .then(webs => this.setState({ webs }))
  }

  post = e =>{
    let id = this.state.id;
    let title = this.state.title;
    let description = this.state.description;
    let URL = this.state.URL;
    var option = {
      method:"get",
      headers: {"Content-Type": "application/json" }
    }

    fetch(`/api?id=${id}&title=${title}&description=${description}&URL=${URL}`,{
      method:'post'
    })
    .then(() => {
      fetch('/api', option)
      .then(res => res.json())
      .then(webs => this.setState({webs}))
    });

    this.setState({
      id:'',
      title:'',
      description:'',
      URL:''
    });
  }

  put = e =>{
    let id = this.state.id;
    let title = this.state.title;
    let description = this.state.description;
    var option = {
      method:"get",
      headers: {"Content-Type": "application/json" }
    }

    fetch(`/api?id=${id}&title=${title}&description=${description}&URL=${URL}`,{
      method:'put'
    })
    .then(() => {
      fetch('/api', option)
      .then(res => res.json())
      .then(webs => this.setState({webs}))
    });

    this.setState({
      id:'',
      title:'',
      description:'',
      URL:''
    });
  }

  delete = e =>{
    let id = this.state.id;
    fetch(`/api?id=${id}`,{
    method:'delete'
    })
  }

  render(){
  console.log(this.state.webs)
  return (
    <div className="App">      
      <div id="background"></div>
      <form>
          <h1>Enter your web project below</h1>
          <br/><br/>
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Url</th>
          </tr>
        <tr>
          <td><input type='text' onChange={e => this.setState({id:e.target.value})}/></td>
          <td><input type='text' onChange={e => this.setState({title:e.target.value})} /></td>
          <td><input type='text' onChange={e => this.setState({description:e.target.value})} /></td>
          <td><input type='text' onChange={e => this.setState({URL:e.target.value})} /></td>
        </tr>
        </table>
        <br/>
        <button onClick={this.post}>Add</button>
        <button onClick={this.put}>Edit</button>
        <button onClick={this.delete}>Delete</button>
      </form>
      <div class='webProjects'>
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Url</th>
          </tr>
            {this.state.webs.map(web =>
            <tr>
              <td>{web.id}</td>
              <td>{web.title}</td>
              <td>{web.description}</td>
              <td>{web.URL}</td>
            </tr>
              )}
        </table>
      </div>
    </div>
  );
}}

export default App;