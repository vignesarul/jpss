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
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 1 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                    <Text>{item.text}</Text>
                    <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody style={{alignItems: 'center'}}>
                  <Image style={{ resizeMode: 'cover' }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}