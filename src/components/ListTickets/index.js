import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Logo from 'Jpss/src/components/common/Logo'
import styles from 'Jpss/src/components/styles/styles'
import { Container, Content, List, ListItem, Text, Spinner, Badge, Button } from 'native-base';
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFab from 'Jpss/src/components/common/CustomFab'
import moment from 'moment';

export default class ListTickets extends Component {
  constructor() {
    super();
    this.state = {
      processing: true,
      items: []
    }
  }
  componentWillMount () {
    fetch('https://adclbq461l.execute-api.ap-south-1.amazonaws.com/prod/support', {
      method: 'POST',
      body: JSON.stringify({
        "clientid": this.props._this.state.loggedInUser.userId,
        "action": "GetTickets",
        "loginToken": this.props._this.state.loggedInUser.token
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result === 'success') {
          this.setState({processing: false, items: responseJson.tickets ? responseJson.tickets.ticket : [] });
        } else {
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

  viewTicket(_this, id) {
    _this.setState({currentPage: 'ViewTicket', ticketId: id});
  }

  render() {
    return (
        <Container>
          <CustomHeader title="List Ticket" _this={this.props._this}/>
          <Content>
            {this.state.processing ? (
              <Spinner color='green' />
            ) : (
              <List dataArray={this.state.items}
                    renderRow={(item) =>
                      <ListItem>
                        <Badge info style={{marginTop: 10}}>
                          <Text style={{ color: 'white' }}>#{item.tid}</Text>
                        </Badge>
                        <Button transparent onPress={()=>{this.viewTicket(this.props._this, item.id)}}>
                          <View>
                            <Text style={{color: 'black'}}>{item.subject}</Text>
                            <Text note>{moment(item.date).fromNow()}</Text>
                          </View>
                        </Button>
                      </ListItem>
                    }>
              </List>
            )}
          </Content>
          <CustomFab _this={this.props._this} />
          <CustomFooter />
        </Container>
    );
  }
}