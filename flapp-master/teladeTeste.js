import React, { Component } from 'react';
 
import { Image, StyleSheet, Share } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Footer, Icon, Body, FooterTab, } from 'native-base';
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob';

export default class NewsScreen extends Component {
  onShare = () => {
    Share.share({
      message:'\n Flapp - O App do Mengão! \n Baixe já o seu!!! ',
    });
  }

  convertDate1 = () => {
     var dt_exclusao =  "2019-10-20T17:41:00.000+03:00"
    var year = dt_exclusao.substr(-29, 10);
    var auxMonth = dt_exclusao.substr(-2, 7);
    var month = auxMonth.substr(5, 2);
    var auxDay = dt_exclusao.substr(-29, 10);
    var day = auxDay.substr(8, 2); 
    return day+ '/'+month+'/'+year;
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
                <Text style={styles.TextoTitulo}></Text>
              </Body>
            </CardItem>

            <CardItem cardBody>
              <Image source={{ }} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>

            <CardItem>
              <Text style={styles.TextoSubTitulo}>Publicado por :</Text>
            </CardItem>

            <CardItem>
              <Text style={styles.TextoSubTitulo}>Fonte : </Text>
            </CardItem>

            <CardItem style={styles.TextoNoticias}>
              <Text >{this.convertDate1()} </Text>
            </CardItem>


            <CardItem>
              <Text style={styles.TextoSubTitulo}>Noticia : </Text>
            </CardItem>

            <CardItem style={styles.TextoNoticias}>
              <Text ></Text>
            </CardItem>

          </Card>
        </Content>

        <Footer >
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
    fontSize: 28,
    fontWeight: '600',
  },
  TextoSubTitulo: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    fontSize: 12,
  },

  MenuInferior: {
    backgroundColor: "red",
    color: "white"
  },

  TextoIcon: {
    color: "white"
  },
  icones: {
    color: "white"
  },
  TextoNoticias: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  }

});