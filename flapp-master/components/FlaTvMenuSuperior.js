import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableHighlight, ImageBackground } from 'react-native';
import {Icon} from 'native-base';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 

export default class FlaTvMenuSuperior extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      lista: [],

      //chave flapp em 10/10/2019
      //uri: 'https://www.googleapis.com/youtube/v3/search?q=flamengo&part=snippet&order=date&key=AIzaSyAp_BChCsYaufld1G8DktypJTk6Yc_sWXs&maxResults=50'
    }
    console.disableYellowBox = true;
  }

  
  componentDidMount=() => {
    firebase.database().ref('apiYoutube/001/items').on('value', (snapshot) => {
      let state = this.state;
      state.lista = [];

      snapshot.forEach((childItem) => {

        state.lista.push({

          key: childItem.key,

          title: childItem.val().snippet.title,
          main_image: childItem.val().snippet.thumbnails.medium.url,
          id: childItem.val().id.videoId,

        });
      });

      this.setState(state);
      this.setState({loading: false})
    })

  }

  render() {

    if (this.state.loading) {
      return (
        <View style={styles.container}>
            <Text style={styles.textUpAnimation}>Localizando vídeos, aguarde...</Text>
            <View style={styles.animation}>
           <LottieView source={require('../Json/Nowloading.json')} autoPlay loop />
        </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>

          <FlatList
            data={this.state.lista}
            renderItem={({ item }) => <DadosApi funFlaTv={this.props.funFlaTv} data={item} />}  
            />

        </View>
      );
    }    
  }
}


class DadosApi extends React.Component {
  render() {
    return (

      <TouchableHighlight onPress={() => {
        this.props.funFlaTv(this.props.data.id, tab= 1)
      }}
        underlayColor="blue" >

        <ImageBackground resizeMode="cover" source={{ uri: this.props.data.main_image }} style={style={ width: wp('100%'),height: hp('32%')}}>
       
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>   

           <Text numberOfLines={2} style={{textAlign:'center', fontSize: wp('6%'), color: '#FFFFFF', textTransform: 'uppercase', fontWeight: '800',  marginBottom: 30 }}>{this.props.data.title}</Text>
           <Icon style={styles.icones} name="md-play" />

            </View>

        </ImageBackground>
      </TouchableHighlight>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cc2229',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icones: {
    color: 'white',
    fontSize: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('45%'),
    marginBottom: hp('10%'),
    opacity: 0.7,

  },
  animation: {
    backgroundColor: '#cc2229',
    width: wp('60%'),
    height: hp('60%'),
    marginBottom: 20

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