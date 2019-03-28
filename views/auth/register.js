import React, {Component} from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Spinner }  from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet, Image, AsyncStorage, Alert, ImageBackground, View} from 'react-native';

export default class RegisterScreen extends Component{

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      lastname: '',
      username: '',
      password_confirmation: '',
      isRegistering:false,
    }
  }

  render() {
    return (
      <Container style={styles.container}>
          <Grid>
            <Content contentContainerStyle={styles.content}>
              <Col>
                <Form>
                  <Grid>
                      <Row style={{ justifyContent:'center' }}>
                          <Image
                            style={{ width:400,height:200, marginBottom:'20%' }}
                            source={{uri: 'https://cdn.freebiesupply.com/images/thumbs/2x/pokemon-logo-black-transparent.png'}}
                          />
                      </Row>
                      <Col>
                        <Item >
                          <Input
                          onChangeText={ (text)=>{ this.setState({ name: text }) } }
                          placeholder="Name" />
                        </Item>  
                        <Item>
                          <Input
                          onChangeText={ (text)=>{ this.setState({ lastname: text }) } }
                          placeholder="Last Name" />
                        </Item>
                        <Item>
                          <Input
                          onChangeText={ (text)=>{ this.setState({ username: text }) } }
                          placeholder="Username" />
                        </Item>
                        <Item>
                          <Input
                          onChangeText={ (text)=>{ this.setState({ email: text }) } }
                          placeholder="Email" />
                        </Item>
                        <Item>
                          <Input 
                          onChangeText={ (text)=>{ this.setState({ password: text }) } }
                          secureTextEntry={true}
                          placeholder="Password" />
                        </Item>
                        <Item>
                          <Input
                          onChangeText={ (text)=>{ this.setState({ password_confirmation: text }) } }
                          secureTextEntry={true}
                          placeholder="Confirm Password" />
                        </Item>  
                        {this.showButtons()}
                    </Col>
                  </Grid>
                </Form>
              </Col>
            </Content>
          </Grid>
      </Container>)
  }

  showButtons(){
    return this.state.isRegistering ? (
      <Row style={{ justifyContent:"center" }}>
        <Spinner color='white'/>
      </Row>
    ) :
    (
      <Row style={{ justifyContent:"center" }}>
        <Button style={{ marginTop:10 }} rounded onPress = { this.register }>
          <Text>Register</Text>
        </Button>          
      </Row>
    )
  }

  register = ()=>{
    this.setState({
      isRegistering:true,
    });
    fetch( uri + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.success == 1){
        Toast.show({
          text: "Succcesful Registry",
          buttonText: "Okay",
          duration: 3000, 
          position: 'top',
        })
        this.props.navigation.navigate('Login');
      }
      else{
          Toast.show({
            text: data.errors[0],
            buttonText: "Okay",
            duration: 3000, 
            position: 'top',
          })
          this.setState({
            isRegistering:false,
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
    //this.props.navigation.navigate('Main');
  }
}
const uri = 'https://calm-bayou-76443.herokuapp.com'
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#C50000',
  },
  content: {
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    height:'100%', 
    width:'100%',
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  button:{
    backgroundColor: 'steelblue',
  },
  input:{
    width:'50%',
    height:10,
  }
});