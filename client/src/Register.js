import React, {Component} from 'react';
import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
//
const initialUser = {
  username: '',
  password: '',
}


export default class Register extends Component {
  constructor(props) {
    super(props)
      this.state = {
        user: {...initialUser},
        message: '',
      }

  }

  inputHandler = (event) => {
    const {name, value} = event.target
    this.setState({user: {...this.state.user, [name]: value}})

  }

  submitHandler = (event) => {
    event.preventDefault()
    axios.post('http://localhost:9000/api/users', this.state.user)
    .then(res => {
      if(res.status === 201) {
        console.log(res)
        this.setState({message: 'Registration successful', user: {...initialUser}})
      } else {
        throw new Error();
      }

    })
    .catch(err => {
      this.setState({
        message: 'Registration failed',
        user: {...initialUser}
      })

    })

  }

  render() {
    return(
        <div>
        Register
          <form onSubmit={this.submitHandler}>
            <label htmlFor='username'>Username</label>
            <input type='text' 
              id='username' 
              name='username' 
              value={this.state.user.username} 
              onChange={this.inputHandler} />
            <input type='password' 
              id='password' 
              name='password' 
              value={this.state.user.password} 
              onChange={this.inputHandler}/>
            <button>Submit</button>
          </form>

          {this.state.message ? <h4>{this.state.message}</h4> : undefined }
        </div>
        )
  }
}
