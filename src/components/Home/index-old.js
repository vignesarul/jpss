import React, { Component } from 'react';
import {  Animated, Dimensions, Image } from 'react-native';
import styles from 'Jpss/src/components/styles/styles'
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
import { Container, Content, Button, Text, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Left, Body} from 'native-base';
const {height, width} = Dimensions.get('window');
import CustomFab from 'Jpss/src/components/common/CustomFab'
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('Jpss/src/img/adv/1.jpg'),
  }, {
    text: 'Card One',
    name: 'One',
    image: require('Jpss/src/img/adv/2.jpg'),
  }
];

export default class Home extends Component {
  constructor() {
    super();
    this.layer = {
      opacity: new Animated.Value(1),
      top: new Animated.Value(0),
    };
  }
  render() {
    const self = this;
    Animated.timing(self.layer.opacity, { duration: 1000, toValue: 0}).start(() => {
      Animated.timing(self.layer.top, { duration: 1, toValue: height}).start();
    });

    return (
      <Container>
        <CustomHeader title="Home - Jpss"  _this={this.props._this} />
        <Content>
          <View>
            <Button style={{margin: 10}} block success onPress={()=>{this.props._this.updatePage('SubmitTicket')}}>
              <Text>Submit new Ticket</Text>
            </Button>
            <Button style={{margin: 10}} block success onPress={()=>{this.props._this.updatePage('ListTickets')}}>
              <Text>View Tickets</Text>
            </Button>
          </View>
        </Content>
        <Animated.View style={{
          position: "absolute",
          zIndex:2,
          top: this.layer.top,
          width: width,
          height: height,
          backgroundColor:'#2091fa',
          opacity: this.layer.opacity}}>
          <Text> Testing</Text>
        </Animated.View>
        <CustomFab _this={this.props._this} />
        <CustomFooter />
      </Container>
    );
  }
}