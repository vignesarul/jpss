import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid
} from 'react-native';
import SubmitTicket from 'Jpss/src/components/SubmitTicket'
import Login from 'Jpss/src/components/Login'
import Home from 'Jpss/src/components/Home'
import ListTickets from 'Jpss/src/components/ListTickets'
import ViewTicket from 'Jpss/src/components/ViewTicket'
import ReplyTicket from 'Jpss/src/components/ReplyTicket'
import Welcome from 'Jpss/src/components/Welcome'
import Realm from 'realm';

class Jpss extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'Home',
      loggedInUser: {},
      ticketId: 0,
      exit: false,
      exitTimeOut: false,
      welcome:false
    }
  }
  updatePage( name ) {
    this.setState({ currentPage: name })
  }

  goBack() {
    const self = this;
    if(this.state.currentPage === 'SubmitTicket') this.setState({currentPage: 'Home'});
    else if(this.state.currentPage === 'ListTickets') this.setState({currentPage: 'Home'});
    else if(this.state.currentPage === 'ViewTicket') this.setState({currentPage: 'ListTickets'});
    else if(this.state.currentPage === 'ReplyTicket') this.setState({currentPage: 'ViewTicket'});
    else if(this.state.currentPage === 'Home') {
      if(this.state.exit) {
        clearTimeout(this.exitTimeOut);
        return false;
      } else {
        this.setState({exit: true});
        this.exitTimeOut = setTimeout(() => {self.setState({exit: false})}, 2000)
      }
    }
    return true;
  }

  componentWillMount () {
    const self = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      return self.goBack();
    });

    if(!this.state.loggedInUser.token) {
      let realm = new Realm({ schema: [{name: 'users', properties: {token: 'string', userId: 'string', email: 'string', loginTime: 'string'}}] });
      let users = realm.objects('users');
      let loggedInUser = users.sorted('loginTime', { ascending: false });
      if(loggedInUser[0]) this.setState({loggedInUser: loggedInUser[0]});
    }
  }
  render() {
    if(!this.state.welcome) return <Welcome _this={this}/>
    if (Object.keys(this.state.loggedInUser).length === 0) {
      return (
        <Login _this={this}/>
      );
    }
    if (this.state.currentPage === 'Home') {
      return (
        <Home _this={this}/>
      );
    } else if (this.state.currentPage === 'SubmitTicket') {
      return <SubmitTicket _this={this} />;
    } else if (this.state.currentPage === 'ListTickets') {
      return <ListTickets _this={this} />;
    } else if (this.state.currentPage === 'ViewTicket') {
      return <ViewTicket _this={this} />;
    } else if (this.state.currentPage === 'ReplyTicket') {
      return <ReplyTicket _this={this} />;
    }
  }
}

AppRegistry.registerComponent('Jpss', () => Jpss);
