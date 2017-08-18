import React, { Component } from 'react';
import {
  View,
  Button
} from 'react-native';
import styles from 'Jpss/src/components/styles/styles'

export default class CustomButton extends Component {
  render() {
    return (
      <View style={styles.button}>
        <Button
          color={this.props.color || '#5ec300'}
          onPress={this.props.action}
          title={this.props.title}
          accessibilityLabel={this.props.label}
        />
      </View>
    );
  }
}
