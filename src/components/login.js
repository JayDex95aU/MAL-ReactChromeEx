import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, reset } from 'redux-form';
import axios from 'axios';
import noty from 'noty';

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.state = { spinner: false, login: false };
  }

  static contextTypes = {
    router: PropTypes.object
  }

  loginHandler(props) {
    this.setState({ spinner: true, login: false });
    const ROOT_URL = "https://myanimelist.net/api"

    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/account/verify_credentials.xml`,
      auth: {
        username: props.username,
        password: props.password
      }
    }).then((data) => {
      chrome.storage.local.set({'username_MAL_95au': props.username});
      chrome.storage.local.set({'password_MAL_95au': props.password});
      this.setState({ spinner: false });

      noty({
        text: `<h5>Login</h5><p>Welcome ${props.username}</p>`,
        layout: 'bottomLeft',
        theme: 'relax',
        type: 'information',
        timeout: 1500,
        closeWith: ['hover']
      });

      this.context.router.push('/');
    })
    .catch(() => {
      this.setState({ spinner: false, login: true});
    });
  }

  errorHandler() {
    if (this.state.login == true) {
      return(
        <div className="ui negative message">
          <div className="header center aligned ui">
            Credentials Incorrect
          </div>
        </div>
      );
    }
  }

  render() {
    const { fields: { username, password } , handleSubmit } = this.props;
    return(
      <div className="loginPadding">

        <form onSubmit={handleSubmit(this.loginHandler)} className="ui form">
          <div className="ui grid field">
            <div className="three wide column middle aligned">
              <i className="circular large teal users icon"></i>
            </div>
            <div className="twelve wide column">
              <label>Username</label>
              <input type="text" name="username" placeholder="MAL Username" {...username} />
            </div>
          </div>

          <div className="ui grid field">
            <div className="three wide column middle aligned">
              <i className="circular large teal keyboard icon"></i>
            </div>
            <div className="twelve wide column">
              <label>Password</label>
              <input type="password" name="password" placeholder="*******" {...password} />
            </div>
          </div>

          <div className="ui grid centered">

            <Link to="/" className="ui button red">
              <i className="angle left icon"></i>
              Back
            </Link>

            <button className={`ui button teal ${this.state.spinner ? 'loading' : ''}`} type="submit">
              <i className="dashboard icon"></i>
              Sign in
            </button>
          </div>

          <br />
        </form>

        {this.errorHandler()}

        <div className="ui horizontal divider">
          Or
        </div>
        <br />
        <div className="ui grid centered row">

          <div onClick={() => {
              chrome.tabs.create({url: "https://myanimelist.net/register.php?from=%2F"});
            }} className="ui teal labeled icon button">
            Sign up to MAL
            <i className="add icon"></i>
          </div>

        </div>

      </div>
    );
  }
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['username', 'password']
})(Login);
