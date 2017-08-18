import React, { Component } from 'react';
import { View, } from 'react-native';
import { Button, Icon, Fab } from 'native-base';

export default class CustomHeader extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    }
  }
  render() {
    return (
      <View>
        <Fab active={this.state.active} direction="up" style={{ backgroundColor: '#3c8ef3' }} position="bottomRight" onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-settings" />

          <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props._this.setState({ currentPage: 'SubmitTicket' })}>
            <Icon name="ios-add-circle" />
          </Button>
          <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this.props._this.setState({ currentPage: 'ListTickets' })}>
            <Icon name="ios-list" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }} onPress={() => this.props._this.setState({ currentPage: 'Home' })}>
            <Icon name="md-home" />
          </Button>
        </Fab>
      </View>
    );
  }
}
