import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, reset } from 'redux-form';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
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
      console.log(data);
      Materialize.toast(`You have logged in as ${props.username}`, 4000);
      this.context.router.push('/');
    })
    .catch(() => {
      this.setState({ spinner: false, login: true});
    });
  }

  loadingSpinner() {
    if (this.state.login) {
      return (
        <h6 className="red-text text-darken-2">Credential Incorrect</h6>
      );
    }
    if (!this.state.spinner) {
      return;
    }
    return (
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    chrome.storage.local.get('username_MAL_95au', (data) => {
      if (data.username_MAL_95au != '') {
        this.context.router.push('/');
      }
    });
    //Warning from react-unknown-props, not a problem since it works but bad practice!
    const { fields: { username, password } , handleSubmit } = this.props;
    return(
      <div>
        <h5 className="halign-wrapper center-align landing">Hello there, to add to your list, login to MAL</h5>
        <div className="row">
          <form onSubmit={handleSubmit(this.loginHandler)} className="col s12">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input type="text" id="username" className="validate" {...username} />
              <label>Username</label>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input type="password" className="validate" {...password} />
              <label>Password</label>
            </div>
              <button type="submit" className="btn teal col s6 offset-s3">Submit</button>
              <Link to="/" className="btn red col s6 offset-s3 login_cancelbutton">Back</Link>
          </form>

        </div>
        <div className="disclaimer">
          {this.loadingSpinner()}
          <br />
          <p>*We do not support OAUTH Sign-in methods</p>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['username', 'password']
})(Login);
