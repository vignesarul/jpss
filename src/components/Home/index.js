import React, { Component } from 'react';
import {  Animated, Dimensions, Image } from 'react-native';
import styles from 'Jpss/src/components/styles/styles'
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
import { Container, Content, Button, Text, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Left, Body} from 'native-base';
const {height, width} = Dimensions.get('window');
import CustomFab from 'Jpss/src/components/common/CustomFab'
import Communications from 'react-native-communications';
const cards = [
  {
    text: 'Card One',
    name: 'Budget Friendly Hosting!',
    image: require('Jpss/src/img/adv/1.jpg'),
    icon: 'ios-cart',
  }, {
    text: 'Card One',
    name: 'Hot selling. Grab Now..',
    image: require('Jpss/src/img/adv/2.jpg'),
    icon: 'ios-flame',
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
        <View style={{flex:2, marginHorizontal:10}}>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3}}>
                <CardItem cardBody style={{alignItems: 'center'}}>
                  <Image style={{ resizeMode: 'contain'}} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name={item.icon} style={{ color: '#ED4A6A' }} />
                  <Button transparent style={{height:20}} onPress={() => Communications.web('http://jpcloudhost.com/', true)}><Text>{item.name}</Text></Button>
                </CardItem>
              </Card>
            }
          />
        </View>
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