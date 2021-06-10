import React, { Component } from 'react';
import { Image, StyleSheet, Share } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Footer, Icon, Body, FooterTab, View, } from 'native-base';
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob';

export default class NewsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: this.props.navigation.state.params.url,
    };
  }

  onShare = () => {
    Share.share({
      message: this.state.uri + '\n Flapp - O App do Mengão! \n Baixe já o seu!!! ',
    });
  }

  convertDate = () => {
    var dt =   this.props.navigation.state.params.published;
    var dt_public = dt.substr(-29, 10);
    return dt_public;
  }

  comeBack = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <Container >
        <Header style={styles.header} />
        <Content >
          <Card style={styles.container}>

            <CardItem >
              <Body >
                <Text numberOfLines={5} style={styles.TextoTitulo}>{this.props.navigation.state.params.title || this.props.navigation.state.params.author}</Text>
              </Body>
            </CardItem>

            <CardItem cardBody>
              <Image source={{ uri: this.props.navigation.state.params.main_image || 'https://i.ibb.co/4tVqKdt/img-fundo-sem-noticia.png'  }} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>

            <CardItem>
              <Text style={styles.TextoSubTitulo}>Publicado por: {this.props.navigation.state.params.description}</Text>
              <Text style={styles.TextoSubTitulo1}>Em: {this.convertDate()}</Text>
            </CardItem>

            <CardItem>
                <AdMobBanner
                  style={styles.bottomBanner}
                  bannerSize="SmartBanner"
                  adUnitID="ca-app-pub-9900590228093682/4425588727" // Test ID, Replace with your-admob-unit-id
                  testDeviceID="EMULATOR"
                  didFailToReceiveAdWithError={this.bannerError} />              
            </CardItem>

            <CardItem style={styles.Texto}>
              <Text >{this.props.navigation.state.params.text}</Text>
            </CardItem>



            <CardItem >
            

              <Text style={styles.Texto} >{this.props.navigation.state.params.author}{/*Author é na vdd o texto da noticai*/ } </Text>
            </CardItem>


            <CardItem>
             <AdMobBanner
               style={styles.bottomBanner}
               bannerSize="SmartBanner"
               adUnitID="ca-app-pub-9900590228093682/4425588727" // Test ID, Replace with your-admob-unit-id
               testDeviceID="EMULATOR"
               didFailToReceiveAdWithError={this.bannerError} />           
            </CardItem>
            
          </Card>
        
        </Content>

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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: "red",
  },
  TextoTitulo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    fontWeight: '600',
    textTransform: 'uppercase',
    
  },
  TextoSubTitulo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: '#9c1a1f'
  },
  TextoSubTitulo1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: '#9c1a1f',
    marginLeft: 5

  },
  Texto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: -10,
    fontFamily: 'Roboto',
  
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
  TextoNoticias: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  footer:{
    height: 43
  }, 

});