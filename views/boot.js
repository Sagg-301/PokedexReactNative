import React, { Component } from 'react'; 
import {
  AsyncStorage,
  ImageBackground,
  StyleSheet
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Spinner
  } from "native-base";

export default class BootScreen extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    await AsyncStorage.clear();
    const user = await AsyncStorage.getItem('user');
    console.log(user);
    this.props.navigation.navigate(user ? 'Main' : 'Login');
  };

  render() {
    return (
    <Container style={styles.container}>
        <Content>
                  <Spinner color='white'/>
        </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#C50000'
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5
    }
  });