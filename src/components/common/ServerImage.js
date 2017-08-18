import React, { Component } from 'react';
import {
  Image
} from 'react-native';
import styles from 'Jpss/src/components/styles/styles'

export default class ServerImage extends Component {
  render() {
    return (
      <Image style={styles.bottomImage}
             source={require('Jpss/src/img/server.png')}
      />
    );
  }
}