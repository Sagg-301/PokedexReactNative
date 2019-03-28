import React, {Component} from 'react';
import { Spinner, Container, Header, Content, List, ListItem, Input, Button, Text, Toast, Icon, Right, Left }  from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet, Image, AsyncStorage, Alert, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';


/**
 * Componen with all the details of a pokemon
 */
class Details extends Component{
    render(){
        return(
            <Grid> 
            <Row size={30}>
                <ImageBackground
                style={{ width:'100%',height:'100%', }}
                source={{
                    uri: `https://img.pokemondb.net/artwork/large/${this.props.pokemon.name}.jpg`
                  }}
                >
                
                <LinearGradient colors={['gray', 'black', 'black']} style={styles.linearGradient}>
                    <Row size={10}>
                        <Button onPress={ ()=>{this.props.navigation.navigate('Main')} } transparent>
                            <Icon name="arrow-back" style={{ color:'white' }}/>
                        </Button>
                    </Row>
                    <Row size={90} style={{ flex:1, justifyContent:'flex-end' }}>
                        <Text style={{ color:'white',marginRight:'10%' }}>{capitalizeFirstLetter(this.props.pokemon.name)}</Text>
                    </Row>
                
                </LinearGradient>
                </ImageBackground>
            </Row>
            
            <Row size={70} style={{ backgroundColor:'white', width:'100%' }}>
            <Content>
            <Col>
                    <List>
                        <ListItem itemHeader first>
                            <Text>General Information</Text>
                        </ListItem>
                        <ListItem >
                            <Text>Sprites: </Text>
                            <Image 
                                source={{ 
                                    uri:this.props.pokemon.sprites.front_default
                                 }}
                                style={{ height:100,width:100 }}
                                 />
                            <Image 
                                source={{ 
                                    uri:this.props.pokemon.sprites.front_shiny
                                 }}
                                style={{ height:100,width:100 }}
                                 />
                            <Image 
                                source={{ 
                                    uri:this.props.pokemon.sprites.back_default
                                 }}
                                style={{ height:100,width:100 }}
                                 />
                            <Image 
                                source={{ 
                                    uri:this.props.pokemon.sprites.back_shiny
                                 }}
                                style={{ height:100,width:100 }}
                                 />
                        </ListItem>
                        <ListItem >
                            <Text> Types : </Text>
                            { this.props.pokemon.types.map((type) => {
                                return (<Text>{type.type.name} </Text>);
                            }) }
                        </ListItem>
                        <ListItem >
                            <Text> Height :  { this.props.pokemon.height }</Text>
                        </ListItem>
                        <ListItem >
                            <Text> Weight :  { this.props.pokemon.weight }</Text>
                        </ListItem>
                        <ListItem itemHeader>
                            <Text>Stats :</Text>  
                        </ListItem>
                        { this.props.pokemon.stats.map((stat) => {
                                return (<ListItem><Text>{capitalizeFirstLetter(stat.stat.name) + ' : ' + stat.base_stat}</Text></ListItem>);
                            }) }
                    </List>
                </Col>
            </Content>
                
            </Row>
            </Grid>);
    }
}

export default class DetailScreen extends Component{

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        this.state = {
        isLoading:true,
        pokemon:null,
        }
    }

    render() {
        return (
        <Container style={styles.container}>
            <Content contentContainerStyle={styles.container}>
                { this.loadContent(this.props.navigation) }
            </Content>
        </Container>)
    }

    componentDidMount(){
        this.loadingPokemon(this.props.navigation.getParam('pokemon_url',''));
    }

    /**
     * Load the content depending if the pokemon finished loading
     * @param {*} navigation 
     */
    loadContent(navigation){
    
        if(this.state.isLoading){
          return (<Spinner color='white' style={{ alignSelf:'center' }} />);
        }
    
        return (<Details key={this.state.pokemon.name} navigation={navigation} pokemon={ this.state.pokemon }/>);
      }

    /**
     * Load the selected pokemon
     * @param {*} pokemon_url 
     */
    loadingPokemon(pokemon_url){
        fetch(
          pokemon_url
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              isLoading: false,
              pokemon: responseJson
            });
          })
          .catch(error => {
            Alert.alert("There was an error loading the pokemon");
          });
      }
}

/**
 * Function to capitalize first letter of a string
 * @param {*} string 
 */
function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1).replace('-',' ')
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#C50000'
  },
  
  linearGradient: {
    flex: 1,
    width:'100%',
    height:'100%',
    opacity: 0.7
  },
  textStyle:{
      margin:20,
  }
});