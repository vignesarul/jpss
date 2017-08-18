import React, { Component } from 'react';
import {
  View,
  Alert,
  Image,
  TextInput,
  Animated,
  Dimensions
} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Spinner, Toast, Text} from 'native-base';
import Logo from 'Jpss/src/components/common/Logo';
import styles from 'Jpss/src/components/styles/styles';
import Realm from 'realm';
import CustomHeader from 'Jpss/src/components/common/CustomHeader'
import CustomFooter from 'Jpss/src/components/common/CustomFooter'
const {height, width} = Dimensions.get('window');

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      processing: false
    };
    this.screen = {
      springValue: new Animated.Value(0.3),
      opacity: new Animated.Value(0),
    };
  }
  doLogin(_this) {
    this.setState({processing: true});
    fetch('https://adclbq461l.execute-api.ap-south-1.amazonaws.com/prod/support', {
      method: 'POST',
      body: JSON.stringify({
        "email": this.state.email,
        "password2": this.state.password,
        "action": "ValidateLogin"
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result === 'success') {
          let realm = new Realm({ schema: [{name: 'users', properties: {token: 'string', userId: 'string', email: 'string', loginTime: 'string'}}] });
          realm.write(() => {
            realm.create('users', {token: responseJson.token, userId: responseJson.userid, email: this.state.email, loginTime: Date.now() + ''});
          });
          let users = realm.objects('users');
          let loggedInUser = users.filtered('email = "' + this.state.email + '"').sorted('loginTime', { ascending: false });
          const self = this;
          Animated.timing(this.screen.opacity, { duration: 1, toValue: 1}).start(() => {
            Animated.spring(self.screen.springValue, { toValue: parseInt(height*width*6/10000), tension: 1, }).start();
            console.log(height, width);
            setTimeout(()=>{_this.setState({loggedInUser: loggedInUser[0]});}, 100)
          })
        } else {
          Toast.show({
            text: responseJson.message,
            position: 'bottom',
            buttonText: 'Okay'
          });
          this.setState({processing: false});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <Container>
        <CustomHeader title="Welcome - Login" _this={this.props._this}/>
        <Content>
          <View style={styles.logo}>
            <Image source={require('Jpss/src/img/Clouds.png')} style={{width: 206, height: 151}}/>
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChange={(event) => { this.setState({ email: event.nativeEvent.text }) }} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChange={(event) => { this.setState({ password: event.nativeEvent.text }) }} />
            </Item>
          </Form>
          {this.state.processing ? (
              <Spinner color='green' />
          ) : (
            <View style={{padding:30, alignItems: 'center'}}>
              <Button rounded success style={{alignSelf:'center'}} onPress={()=>{this.doLogin(this.props._this)}}>
                <Text style={{paddingHorizontal:70, paddingVertical:10}}>Login</Text>
              </Button>
            </View>
          )}

        </Content>
        {this.state.processing ? (
        <View style={{alignItems: "center"}}>
          <Animated.View style={{
            position: "absolute",
            zIndex:3,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor:'#2091fa',
            opacity: this.screen.opacity,
            transform: [{scale: this.screen.springValue}]}} />
        </View>
          ) : (<View />) }
        <CustomFooter />
      </Container>
    );
  }
}

export default class Login extends Component {
  render() {
    return (
      <LoginForm _this={this.props._this}/>
    );
  }
}