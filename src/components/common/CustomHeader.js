import React, { Component } from 'react';
import { View, } from 'react-native';
import { Button, Text, Header, Left, Body, Title, Icon, Right } from 'native-base';
import Communications from 'react-native-communications';
import Realm from 'realm';

export default class CustomHeader extends Component {
  logout(_this) {
    let realm = new Realm({ schema: [{name: 'users', properties: {token: 'string', userId: 'string', email: 'string', loginTime: 'string'}}] });
    let users = realm.objects('users');
    realm.write(() => {
      realm.delete(users.sorted('loginTime', { ascending: false }));
    });

    _this.setState({loggedInUser: {}})
  }
  render() {
    return (
      <View>
        <Header style={{backgroundColor:'#3c8ef3'}}>
          <Left>
            <Button transparent onPress={()=>{this.props._this.goBack()}}>
              <Icon name='md-arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <Button transparent  onPress={()=>{this.logout(this.props._this)}}>
              <Icon name='ios-log-out' />
            </Button>
            <Button transparent onPress={() => Communications.phonecall('+918608602888', true)}>
              <Icon name='md-call' />
            </Button>
          </Right>
        </Header>
      </View>
    );
  }
}