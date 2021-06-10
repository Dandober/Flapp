import React, { Component } from 'react'
import { View, WebView, ActivityIndicator, Text, StyleSheet, BackHandler } from 'react-native';
import LottieView from 'lottie-react-native'
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

let urlGoole = 'https://www.google.com/search?q=partidas+flamengo+brasileir%C3%A3o+2019&oq=partidas+&aqs=chrome.0.69i59j0l3j69i57j0.2911j1j7&sourceid=chrome&ie=UTF-8#sie=t;/m/019lty;2;/m/0fnk7q;mt;fp;1;;'

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      stateUrl: true,
    };
  }

  onBackPress = () => {

    this.props.navigation.navigate('Main')

    return true;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  goBack = () => {
    this.props.navigation.navigate('Show')
  };


  hideSpinner = () => {
    this.setState({ visible: false });
  }
  showSpinner = () => {
    this.setState({ visible: true });
  }

  showWebView = () => {

    if (this.state.stateUrl) {
      return (
        <WebView
          onLoadStart={() => (this.showSpinner())}
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1 }}
          source={{ uri: urlGoole }}
          style={{ marginTop: -152 }}

          onNavigationStateChange={(nav) => {
            if (nav.url !== urlGoole) {
              this.setState({ stateUrl: false })
            }
          }}

        />
      )
    } else {
      {this.goBack()}
    }

  }

  render() {
    return (

      <View style={{ flex: 1 }}>

        {this.showWebView()}

        {this.state.visible && (

          <View style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: '#cc2229',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={styles.textUpAnimation}>Carregando Calendário, aguarde...</Text>

            <View style={{
              width: wp('100%'),
              height: hp('100%'),
            }}>
              <View style={styles.animation}>
                <LottieView source={require('../Json/Nowloading.json')} autoPlay loop />
              </View>
            </View>
          </View>


        )}
      </View>
    );
  }
}

class AdMob extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 1, zIndex: 0, marginLeft: 19, backgroundColor: '#cc2229' }}>

        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="largeBanner"
          adUnitID="ca-app-pub-9900590228093682/4535221167" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError} />


      </View>
    );
  }
}

CalendarScreen.navigationOptions = {
  title: "Table",
  headerTitle: <AdMob />,
  headerStyle: {
    backgroundColor: '#cc2229',
    height: 100,
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cc2229',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    backgroundColor: '#cc2229',
    width: wp('60%'),
    height: hp('60%'),
    marginBottom: 20,
    marginLeft: wp('20%')

  },
  textUpAnimation: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 26,
    fontWeight: '400',
    marginTop: 30,
    fontFamily: 'Roboto',
    padding: 10,
  }
});