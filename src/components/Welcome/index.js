import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Animated
} from 'react-native';
import Logo from 'Jpss/src/components/common/Logo'
import styles from 'Jpss/src/components/styles/styles'
import { Container, Content } from 'native-base';
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFab from 'Jpss/src/components/common/CustomFab'

export default class Welcome extends Component {
  constructor () {
    super()
    this.springValue = new Animated.Value(0.8)
  }
  spring () {

  }

  render() {
    const self = this;
    setTimeout(() => {self.props._this.setState({welcome: true})}, 2000);
    this.springValue.setValue(0.3);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 3
      }
    ).start();
    return (
        <Container>
            <View style={{
              flex:1,
              justifyContent: 'center',
              alignItems: 'center'}}>
              <Animated.Image
                style={{ alignSelf: 'center', transform: [{scale: this.springValue}] }}
                source={require('Jpss/src/img/logo.png')}/>
            </View>
        </Container>
    );
  }
}
