import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Container, Content, Text, Spinner, Body, Card, CardItem, Left, Icon, Button } from 'native-base';
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFab from 'Jpss/src/components/common/CustomFab'

export default class ViewTicket extends Component {
  constructor() {
    super();
    this.state = {
      processing: true,
      replies: []
    }
  }

  componentWillMount () {
    fetch('https://adclbq461l.execute-api.ap-south-1.amazonaws.com/prod/support', {
      method: 'POST',
      body: JSON.stringify({
        "ticketid": this.props._this.state.ticketId,
        "action": "GetTicket",
        "loginToken": this.props._this.state.loggedInUser.token
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result === 'success') {
          this.setState({processing: false, replies: responseJson.replies.reply });
        } else {
          this.props._this.setState({currentPage: 'Home'})
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const cards = this.state.replies.map((reply) => {
      return (<Card style={{ flex: 0 }} key={reply.date}>
        <CardItem style={ reply.admin? { backgroundColor:'#bcdaff' }: { backgroundColor:'#e3f4fe' }}>
          <Left>
            <Icon name={reply.admin? 'ios-ribbon' : 'person'} />
            <Body>
            <Text>{reply.admin? reply.admin.toUpperCase() : reply.name.toUpperCase()}</Text>
            <Text note>{reply.date}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem  style={ reply.admin? { backgroundColor:'#bcdaff' }: { backgroundColor:'#e3f4fe' }}>
          <Body>
          <Text>
            {reply.message}
          </Text>
          </Body>
        </CardItem>
      </Card>)
    });
    return (
      <Container>
        <CustomHeader title="View Ticket" _this={this.props._this}/>
        <Content>
          {this.state.processing ? (
            <Spinner color='green' />
          ) : (
            <View>
              {cards}
              <Button block success onPress={()=>{this.props._this.setState({currentPage: 'ReplyTicket'})}} >
                <Text>Add Reply</Text>
              </Button>
            </View>
            )}
        </Content>
        <CustomFab _this={this.props._this} />
        <CustomFooter />
      </Container>
    );
  }
}