import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class App extends Component {
  render() {
    console.log(this.props.post);
    return(
      <div className="test">
        <h1>Hello World 1</h1>
        <Link to="test" className="btn btn-danger">Test</Link>
        <a className="btn" href="https://myanimelist.net/sns/login/google?from=%2Fmodules.php%3Fgo%3Dapi">Google+</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.post };
}

export default connect(mapStateToProps)(App);
