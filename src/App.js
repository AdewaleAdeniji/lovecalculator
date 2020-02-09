import React,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';
import msg from './msg.json';

class  App extends Component {
  constructor(props){
  super(props);
  this.state = {
    firstname : '',
    secondname : '',
    lovescore : 0,
    loading:false,
  }
  this.handleStart = this.handleStart.bind(this);
  this.next = this.next.bind(this);
  this.handleLoad = this.handleLoad.bind(this);
  this.done = this.done.bind(this);
  this.handleOff = this.handleOff.bind(this);
}
componentDidMount(){
  //console.log("mounted");
 

}
done(e){
  var percentage = e;
  var g = parseInt(percentage/10);
  var ms = msg[g].Message;
  this.setState({loading:false});
   Swal.fire({
    background:'#fff',
    icon:'success',
    title:e+'%',
    text:this.state.firstname+'  ~~~ '+this.state.secondname,
    footer:ms,
    showConfirmButton:true,
    confirmButtonColor:'red',
    confirmButtonText:'Great',
  customClass: {
  container: 'swalmodal',
  
}
  })

  console.log(e);
}
handleOff(){
  var letters = '1abcdefghijklmnopqrstuvwxyz';
  var arrs = letters.split("");
  var sum1 =0;
  var sum2 = 0;
  try{

  let firstname = ((this.state.firstname).toLowerCase()).split("").slice(0,5);
  let s2 = ((this.state.secondname).toLowerCase()).split("").slice(0,5);
  if(this.state.firstname==this.state.secondname){
    Swal.fire({
      text:'Names must not be the same',
      showConfirmButton:false,
      timer:2000,
      timerProgressBar:true,
    })
    .then((r)=>{
      this.handleStart();
    })
  }
  else {
  firstname.forEach((item,index)=>{
    let find = arrs.indexOf(item);
    if(find>0){
    sum1 = sum1 + find;
    }
    //console.log(sum1);
  });
  s2.forEach((item,index)=>{
    let find = arrs.indexOf(item);
     if(find>0){
    sum2 = sum2 + find;
  }
    //console.log(sum1);
  });
  var add = sum1+sum2;
  if(add>99){
    this.done(99);
  }
  else {
    this.done(add);
  }
}
}
catch(err){
  this.handleStart();
  //console.log(sum1);
}
}
handleStart(){
  Swal.fire({
    icon:'question',
    text:'Enter the Male\'s Name',
    input:'text',
    backdrop:'#1a1a1a',
    inputAttributes:{
      required:true,
      minLength:3,
      inputPlaceholder:'Enter the Male\'s Name',
    },
    confirmButtonText:'Next',
    confirmButtonColor:'#1a1a1a',
    validationMessage:'Please Enter a valid Name',
  })
  .then((result)=>{
    if(result){
   // console.log(result.value);
    //console.log(typeof(result.value));
    if(result.value===undefined){
     // console.log(result.value);

    }
    else {
      this.setState({firstname:result.value});
      this.next();
    }
  }
    else {
       Swal.insertQueueStep({
          icon: 'error',
          title: 'Please Enter a valid Name',
          timer:1000,
          allowOutsideClick:false,
          allowEscapeKey:false,
          showCancelButton:false,
          showCloseButton:false,
        })
       .then((r)=>{
        this.handleStart();
       })
      
    }
   // console.log(result);
    })

}
next(){
 Swal.fire({
 icon: 'question',
  input: 'text',
  text:'Enter the Female\'s Name',
  inputAttributes: {
    autocapitalize: 'off',
    required:true,
    minLength:3,
    inputPlaceholder:'Enter the Female\'s Name',
  },

  confirmButtonColor:'#1a1a1a',
          allowEscapeKey:false,
          showCancelButton:false,
          showCloseButton:false,
  validationMessage:"Enter a valid Name",
  confirmButtonText: 'Calculate Love',
  showLoaderOnConfirm: true,
  backdrop:'#1a1a1a',
  preConfirm: (secondname) => {
    this.setState({secondname:secondname});
    this.setState({loading:true});
    this.handleLoad();
  return fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${this.state.firstname}&sname=${this.state.secondname}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key": "7e5292312dmshc8e56f5d5cd0247p173560jsn746be435caa6"
        }
      })
      .then(response => {
        
        this.setState({loading:false});
        return response.json()
      })
      .then((r)=>{
       this.done(r.percentage);
        //console.log(r);
      })
      .catch(error => {
        this.setState({loading:false});
    //     Swal.fire({
    //   text:'Request Failed,Please try again',
    //   timer:2000,
    //   timerProgressBar:true,
    //   showConfirmButton:false,
    // })
    this.handleOff();
      })
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.value) {
    console.log(result.value);
  }
})
}
handleLoad(){
  if(this.state.loading){
    Swal.fire({
      text:'Loading',
      showConfirmButton:false,
     // allowOutsideClick:false,
          allowEscapeKey:false,
          showCancelButton:false,
          showCloseButton:false,
    })
    .then((r)=>{
      if(this.state.loading){
        this.handleLoad();
      }
    })
  }

}
  render(){
  return (
    <div className="App">
    <nav>
      <span className="lovelogo"> Love Calculator</span>
      <button className="lovebtn"  onClick={this.handleStart}>Calculate</button>

    </nav>
      <header className="App-header">
        
        <p>
          Calculate the love strength between individuals 
        </p>
        <a
          className="App-link"
          href="#"
          onClick={this.handleStart}
          rel="noopener noreferrer"
        >
         Get Started 
        </a>
      </header>
       <footer>
      &copy; CopyRight reserved.This web app was made with love by <a href="https://bit.ly/feranmidev" 
      target="_blank" rel="noopener noreferrer">DevFeranmi</a>
      </footer>
    </div>
  );
}

}

export default App;
