import React, { Component } from 'react';
import {
  View,
  Alert,
  TextInput
} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Spinner, Toast, Text} from 'native-base';
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFab from 'Jpss/src/components/common/CustomFab'

class TicketForm extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      processing: false
    }
  }
  addReply(_this) {
    this.setState({processing: true});
    console.log({
      "ticketid": _this.state.ticketId,
      "message": this.state.message,
      "clientid": _this.state.loggedInUser.userId,
      "action": "AddTicketReply",
      "loginToken": _this.state.loggedInUser.token
    })
    fetch('https://adclbq461l.execute-api.ap-south-1.amazonaws.com/prod/support', {
      method: 'POST',
      body: JSON.stringify({
        "ticketid": _this.state.ticketId,
        "message": this.state.message,
        "clientid": _this.state.loggedInUser.userId,
        "action": "AddTicketReply",
        "loginToken": _this.state.loggedInUser.token
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.result === 'success') {
        Toast.show({
          text: 'Reply Added',
          position: 'bottom',
          buttonText: 'Okay'
        });
        _this.setState({currentPage: 'ViewTicket'});
      } else {
        this.setState({processing: false});
        Toast.show({
          text: responseJson.message,
          position: 'bottom',
          buttonText: 'Okay'
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel last>
            <Label>Message</Label>
            <Input multiline ={true} numberOfLines={4} style={{height: 170}} onChange={(event) => { this.setState({ message: event.nativeEvent.text }) }} />
          </Item>
        </Form>
        {this.state.processing ? (
          <Spinner color='green' />
        ) : (
          <Button block success onPress={()=>{this.addReply(this.props._this)}}>
            <Text>Reply</Text>
          </Button>
        )}
      </Content>
    </Container>
    );
  }
}

export default class ReplyTicket extends Component {
  render() {
    return (
      <Container>
        <CustomHeader title="Reply Ticket" _this={this.props._this}/>
        <Content>
          <TicketForm _this={this.props._this} />
        </Content>
        <CustomFab _this={this.props._this} />
        <CustomFooter />
      </Container>
    );
  }
}