import React, { Component } from 'react';
import { StyleSheet, Share, WebView } from 'react-native';
import { Container, Header, CardItem, Text, Button, Footer, Icon, FooterTab, View, Left, Body, Title } from 'native-base';


export default class MovieScreen extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      movie: [],
      videoId: this.props.navigation.state.params.videoId,
      tab: this.props.navigation.state.params.tab,
      loading: false,
    }
  }
  
  onShare = () => {
    Share.share({
      message: 'https://www.youtube.com/watch?v=' + this.state.videoId + ' \n Flapp - O App do Mengão! \n Baixe já o seu!!!',
      
    });
  }
  
  comeBack = () => {
    this.props.navigation.navigate('Main');
  }

  comeBack1 = (tab) => {
    this.props.navigation.navigate('HomeMenuSuperior',
      {
        tab: tab
      })
  }
  

  render() {
    return (
      <Container style={styles.container}>
        {console.log(this.props.navigation.state.params.tab)}
        <Header style={styles.header} />

        <WebView
          source={{ uri: 'https://www.youtube.com/embed/' + this.state.videoId }}
          style={{backgroundColor: 'black' }}
          allowfullscreen="true"
          
        />
  
        <Footer style={styles.footer} >
          <FooterTab style={styles.MenuInferior}>
            <Button onPress={this.comeBack} vertical>
              <Icon style={styles.icones} name="md-backspace" />
              <Text style={styles.TextoIcon}>Voltar</Text>
            </Button>


            <Button onPress={this.onShare} vertical>
              <Icon style={styles.icones} name="md-share" />
              <Text style={styles.TextoIcon}>Compartilhar</Text>

            </Button>

          </FooterTab>
        </Footer>

      </Container>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },

  header: {
    backgroundColor: "red",
  },

  MenuInferior: {
    backgroundColor: "white",
    color: "red"
  },

  TextoIcon: {
    color: "red"
  },

  icones: {
    color: "red"
  }, 
  
  footer:{
    height: 43
  }

});