import React, { Component } from 'react';
import { View, } from 'react-native';
import { Button, Text, Footer, FooterTab } from 'native-base';

export default class CustomFooter extends Component {
    render() {
    return (
      <View>
        <Footer style={{height:30}} >
          <FooterTab style={{backgroundColor:'#3c8ef3'}}>
            <Button>
              <Text style={{fontSize:14, color:'#FFF'}}>Powered by JP Software Solutions</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}