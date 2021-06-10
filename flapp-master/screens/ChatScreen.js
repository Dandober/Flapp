import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../ChatComponents/reducers';
import Blog from '../ChatComponents/Blogs';
import Post from '../ChatComponents/Post';
import firebase from '../Firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

export default class ChatScreen extends React.Component {


//função verifica se usuario está logado com alguma rede social
  verifation = () => {
    var user = firebase.auth().currentUser; 
    var name;

    if (user != null) { 
      name = user.displayName;
 
      if(name != null){ 

       // alert("Pode")
        
      }else{
          return (
            <View style={styles.textAlert}>
                    <Text style={styles.textUpAnimation}>Favor faça login com sua rede social para habilitar esta opção.</Text>
                    <View style={styles.animation}>
                        <LottieView source={require('../Json/textNotification.json')} autoPlay loop />
                    </View>
                </View>
              //alert("NAo pode")
          );
      }
    }
  }


  render() {

    const state = createStore(reducers, {}, applyMiddleware(ReduxThunk))

      return (
        <Provider store={state}>
          <Blog />
          <Post />
          {this.verifation()}
        </Provider>
      );
    
  }

}


ChatScreen.navigationOptions = {
  title: 'Chat do Mengão',
  headerStyle: {
    backgroundColor: 'red',
  },

  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 100
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    backgroundColor: '#cc2229',
    width: wp('60%'),
    height: hp('60%'),
    marginBottom: 20


},

  textAlert:{
    height:hp("80%"), 
    width:wp("100%"), 
    position: 'absolute',
    backgroundColor: '#cc2229',
    alignItems: 'center',
    justifyContent: 'center'

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
},
  
});