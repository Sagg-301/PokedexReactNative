import React, { Component } from "react";
import { StyleSheet, Image, Alert, ImageBackground, AsyncStorage, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Item,
  Input,
  Spinner
} from "native-base";
import {Grid, Row, Col} from 'react-native-easy-grid';

/**
 * Component that contains a everything to compose a pokemon card
 */
class PokemonCard extends Component {
  render() {
    return (
              <Card style={{ width:'90%' }}>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.number}.png`
                      }}
                    />
                    <Body>
                      <Text> #{('00'+this.props.number).slice(-3)} { capitalizeFirstLetter(this.props.data.name) }</Text>
                      <Text note>Pokedex</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody button onPress={()=>{this.props.navigation.navigate('Details',{pokemon_url: this.props.data.url})}}>
                  <Image
                    source={{
                      uri: `https://img.pokemondb.net/artwork/large/${this.props.data.name}.jpg`
                    }}
                    style={{ height: 200, width: 200, flex: 1,  }}
                  />
                </CardItem>
              </Card>
    );
  }
}

class SearchPokemon extends Component{
  render(){
    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>)
  }
}

export default class MainScreen extends Component {


  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null, 
      offset: 0
    };
  }

  
  render() {
    // this.loadingPokemon();
    let content = this.loadContent(this.props.navigation)
    let buttons = <Grid>
                    <Row>
                      { offset > 0 ? (<Button
                      onPress={
                        ()=>{
                          this.setState({
                            isLoading:true,
                          })
                          this.loadingPokemon(this.state.data.previous);
                          offset = offset - 20;
                        }
                      }
                      style={{ margin:10 }} light>
                      <Icon name='arrow-back' />
                      </Button>) : null}
                      <Button
                      onPress={
                        ()=>{
                          this.setState({
                            isLoading:true,
                          })
                          this.loadingPokemon(this.state.data.next);
                          offset = offset + 20;
                        }
                      } 
                      style={{ margin:10 }} light>
                        <Icon name='arrow-forward' />
                      </Button>
                    </Row>
                  </Grid>;
    return (
        <Container style={styles.container}> 
          <Content contentContainerStyle={{ fex:1, flexDirection:'column',alignItems:'center', }}>
            {
              content
            }
            {
               this.state.isLoading ? null:buttons
            }
          </Content>
        </Container>
    );
  }

  componentDidMount(){
    this.loadingPokemon("https://pokeapi.co/api/v2/pokemon/");
  }

  /**
   * Load the content if is not loading it
   * @param {} navigation 
   */
  loadContent(navigation){
    
    if(this.state.isLoading){
      return (<Spinner color='white' />);
    }

    cards = this.state.data.results.map(function(pokemon,index) {
      return (<PokemonCard navigation={navigation} data={ pokemon } number={ offset + index + 1 } key={index}/>);
      })
      
    return cards;
  }

  /**
   * Load the list of Pokemon
   * @param {*} url 
   */
  loadingPokemon(url){
    fetch(
      url
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson,
        });
      })
      .catch(error => {
        Alert.alert("There was an error loading the list of pokemon");
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

var offset = 0;

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#C50000',
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
});
