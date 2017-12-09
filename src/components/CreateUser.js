import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql } from 'react-apollo'

class CreateUser extends React.Component {

  constructor(props) {
    super()

    this.state = {
      email: '',
      password: '',
      name: '',
      emailSubscription: false,
    }
  }

  render () {

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          {this.state.name && this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.createUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

    createUser = async () => {
    const { email, password, name } = this.state

    try {
      const response = await this.props.signupUserMutation({variables: {email, password, name}})
      localStorage.setItem('graphcoolToken', response.data.signupUser.token)
      this.props.history.push('/')
    } catch (e) {
      console.error('An error occured: ', e)
      this.props.history.push('/')
    }

  }

}

const SIGNUP_EMAIL_USER = gql`
  mutation SignupUser($email: String!, $password: String!, $name: String) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

export default graphql(SIGNUP_EMAIL_USER, {name: 'signupUserMutation'})(withRouter(CreateUser))
