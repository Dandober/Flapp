import React, { Component } from 'react';
import { View, StyleSheet, Share, TouchableOpacity, Text} from 'react-native';
import { Container, Header, Button, Footer, Icon, FooterTab,} from 'native-base';
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded} from 'expo-ads-admob';

export default class ShowScreen extends Component {
  
  comeBack = () => {
    this.props.navigation.navigate('Main');
  }

  onShare = () => {
    Share.share({
      message:' https://play.google.com/store/apps/details?id=com.azimutedeveloper.flappdomengaoNew \n Flapp - O App do Mengão! \n Baixe já o seu!!! ' ,
    });
  }

  render() {
    return (
      <Container >
      <Header style={styles.header} />     
     
            <View style={styles.container}>

            <View style={{marginTop: 256, marginLeft:-7 }}><AdMob/></View>
            <View style={{marginBottom: 276, marginLeft: -7 }}><AdMob/></View>
            
            </View>
  
      <Footer  style={styles.footer}>
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

class AdMob extends React.Component {
  render() {
    return (
      <View style={{ marginLeft:14 }}>
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-9900590228093682/4425588727" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError} 
          />
      </View>
    );
  }
}

ShowScreen.navigationOptions = {
   title: 'Banner',
 };

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#cc2229',
     alignItems: 'center',
     justifyContent: 'center',
   },
   header: {
     backgroundColor: "#cc2229",
   },
 
   MenuInferior: {
    backgroundColor: "black",
    color: "white"
   },
 
   TextoIcon: {
     color: "white"
   },
   icones: {
     color: "red"
   },
   bottomBanner:{
     flex: 1,
     justifyContent: 'center',
     alignItems:'center',
    },

    footer:{
      height: 43
    }, 
 });
