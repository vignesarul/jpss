import React, { Component } from 'react';
import {
  Image,
  View
} from 'react-native';
import styles from 'Jpss/src/components/styles/styles'

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.logo}>
        <Image source={require('Jpss/src/img/logo.png')}/>
      </View>
    );
  }
}