import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Spinner, Toast, Text, Fab, Icon } from 'native-base';
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
import CustomFab from 'Jpss/src/components/common/CustomFab'

class TicketForm extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      message: '',
      processing: false
    }
  }
  createTicket(_this) {
    this.setState({processing: true});
    fetch('https://adclbq461l.execute-api.ap-south-1.amazonaws.com/prod/support', {
      method: 'POST',
      body: JSON.stringify({
        "subject": this.state.subject,
        "message": this.state.message,
        "clientid": _this.state.loggedInUser.userId,
        "action": "OpenTicket",
        "loginToken": _this.state.loggedInUser.token
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.result === 'success') {
        Toast.show({
          text: 'Ticket Created',
          position: 'bottom',
          buttonText: 'Okay'
        });
        _this.setState({currentPage: 'Home'});
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
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Subject</Label>
            <Input onChange={(event) => { this.setState({ subject: event.nativeEvent.text }) }} />
          </Item>
          <Item floatingLabel last>
            <Label>Message</Label>
            <Input multiline ={true} numberOfLines={4} style={{height: 170}} onChange={(event) => { this.setState({ message: event.nativeEvent.text }) }} />
          </Item>
        </Form>
        {this.state.processing ? (
          <Spinner color='green' />
        ) : (
          <Button block success onPress={()=>{this.createTicket(this.props._this)}}>
            <Text>Create</Text>
          </Button>
        )}
      </Content>

    );
  }
}

export default class SubmitTicket extends Component {
  render() {
    return (
      <Container>
        <CustomHeader title="Submit Ticket" _this={this.props._this}/>
        <TicketForm _this={this.props._this} />
        <CustomFab _this={this.props._this} />
        <CustomFooter />
      </Container>
    );
  }
}