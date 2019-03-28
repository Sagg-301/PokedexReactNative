import React, {Component} from 'react';
import { Body, Container, Header, Content, Form, Item, Input, Button, Text, Toast, Spinner }  from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet, Image, AsyncStorage, Alert, ImageBackground} from 'react-native';
import AppStorage from '../../storage';

export default class LoginScreen extends Component{

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoginIn: false,
    }
  }

  render() {
    return (
      <Container>
          <Grid>
            <Content contentContainerStyle={styles.container}>
                <Row style={{ justifyContent:"center" }}>
                    <Form>
                      <Grid>
                        <Row style={{ justifyContent:"center", paddingTop:'10%', }}>
                          <Image
                            style={{ width:400,height:200, marginBottom:'20%' }}
                            source={{uri: 'https://cdn.freebiesupply.com/images/thumbs/2x/pokemon-logo-black-transparent.png'}}
                          />
                        </Row>
                        <Col style={{ justifyContent:"center", marginTop:'20%' }}>
                          <Item>
                            <Input
                            onChangeText={ (text)=>{ this.setState({ email: text }) } }
                            placeholder="Email" />
                          </Item>
                          <Item>
                            <Input 
                            onChangeText={ (text)=>{ this.setState({ password: text }) } }
                            placeholder="Password"
                            secureTextEntry={true} />
                          </Item>
                        </Col>
                          {this.showButtons()}
                      </Grid>
                    </Form>
                  </Row>
            </Content>
          </Grid>
      </Container>)
  }

  showButtons(){
    return this.state.isLoginIn ? (
      <Row style={{ justifyContent:"center" }}>
        <Spinner color='white'/>
      </Row>
    ) :
    (
      <Row style={{ justifyContent:"center" }}>
        <Button rounded onPress = { this.login }>
          <Text>Login</Text>
        </Button>
        <Button light rounded onPress = { this.register }>
          <Text>Register</Text>
        </Button>          
      </Row>
    )
  }

  register = ()=>{
    this.props.navigation.navigate('Register');
  }
  
  login = ()=>{
    this.setState({
      isLoginIn:true
    });
    fetch( uri + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.success == 1){
          async () => {
            try {
              await AsyncStorage.setItem('user', data);
            } catch (error) {
              Alert.alert('There was an error saving the data');
            }
          };
          this.props.navigation.navigate('Main');
      }
      else{
          Toast.show({
            text: data.errors[0],
            buttonText: "Okay",
            duration: 3000, 
            position: 'top',
          })
          this.setState({
            isLoginIn:false
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
const uri = 'https://calm-bayou-76443.herokuapp.com'
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'#C50000'
  },
  button:{
    backgroundColor: 'steelblue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});