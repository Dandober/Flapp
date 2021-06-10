import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,FlatList,TouchableHighlight,ImageBackground} from 'react-native';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class NoticiasMenuSuperior extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      loading: true
    }
  }

  componentWillMount() {
    
    firebase.database().ref('newsWebhose/001/posts').on('value', (snapshot) => {
      let state = this.state;
      state.lista = [];

      snapshot.forEach((childItem) => {

        state.lista.push({

          key: childItem.key,

          title: childItem.val().title,
          main_image: childItem.val().thread.main_image,
          author: childItem.val().author,
          text: childItem.val().text,
          content: childItem.val().content,
          url: childItem.val().url,
          published: childItem.val().published,

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
           <Text style={styles.textUpAnimation}>Localizando notícias, aguarde...</Text>
           <View style={styles.animation}>
           <LottieView source={require('../Json/Nowloading.json')} autoPlay loop />
        </View>
        </View>
      );
    } else {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.lista}
          renderItem={({ item }) => <Api fun={this.props.fun} data={item} />} 
          keyExtractor={item => item.title}
          />
      </View>
    );
  }
}
}

class Api extends React.Component {
  render() {

    return (
      <View style={styles.container}>

<TouchableHighlight onPress={() => {
          this.props.fun(this.props.data.title, this.props.data.main_image, this.props.data.author, this.props.data.text,
            this.props.data.content, this.props.data.url , this.props.data.published)
        }} underlayColor="blue" >

          <ImageBackground resizeMode="cover" source={{ uri: this.props.data.main_image || 'https://i.ibb.co/4tVqKdt/img-fundo-sem-noticia.png'  }} style={{ width: wp('100%'),height: hp('32%'),}}>
          
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', paddingLeft: 10, paddingBottom: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
              <Text  numberOfLines={2} style={{ fontSize: wp('9%'), color: '#FFFFFF', fontWeight: '800', marginBottom: 55, textTransform: 'uppercase' }}>{this.props.data.title || this.props.data.text}
  
              </Text>
            </View>

          </ImageBackground>

        </TouchableHighlight>
        </View>
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