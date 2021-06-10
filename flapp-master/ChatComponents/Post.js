//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard  } from 'react-native';
import {postBlogs} from '../ChatComponents/action'
import {connect} from 'react-redux'
import firebase from '../Firebase'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// create a component
class Post extends Component {
  state={
      photoURL: '',
      anonimo: '',
      uri: "",
      name:"",
      content:"",
      dt: ""
  }

  DataHora = ()=> {
    var dt = new Date();
    var dia = dt.getDate();
    if (dia< 10) {
        dia  = "0" + dia;
    }
    var mes = dt.getMonth()+ 1;
    if (mes < 10) {
        mes  = "0" + mes;
    }
    var hora = dt.getHours();
    if ( hora < 10) {
        hora  = "0" + hora;
    }
    var minuto = dt.getMinutes();
    if (minuto < 10) {
        minuto  = "0" + minuto;
    }
    var dataAtual = hora + ":" + minuto + " - "+dia+ "/"+mes;
    
    this.state.dt = dataAtual
    return this.state.dt
}

componentWillMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
        let name

        if (user != null) {

            name = user.displayName,
                uri = user.photoURL

        }
        this.setState({ name })
        this.setState({ uri })
    })
    this.DataHora()
    this.setState({ anonimo: 'Anônimo' })
    this.setState({ photoURL: 'https://www.cenariomt.com.br/wp-content/uploads/2019/09/Flamengo.jpg' })
  
}

  submit = () =>{
      this.props.postBlogs( this.state.uri ,this.state.name, this.state.content, this.state.dt)
      this.setState({
          uri: this.state.uri || this.state.photoURL,
          name: this.state.name || this.state.anonimo,
          content:'',
          dt: this.DataHora()
      })
  }


    render() {
        return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={100} behavior={"padding"}>
        <TextInput 
        multiline={true}
        numberOfLines={3}
        maxLength={250}
        autoCorrect= {true}
     
        style={{height: hp('7%'), width: wp('82%'),  borderColor:'gray', borderWidth:1, borderRadius: 10, textAlign: 'center'}} 
        placeholder="Sua Mensagem" 
        onChangeText={content => this.setState({content})} value={this.state.content} />

      <TouchableOpacity style={styles.btn} onPress={this.submit}>
			<View><Text style={styles.textBtn}>Enviar</Text></View> 
		</TouchableOpacity >
    
    </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    btn: {
        justifyContent: 'center',
		alignItems: 'center',
		width: wp('16%'), 
		height: hp('7%'),
		borderWidth: 1,
        borderRadius: 10,
		borderColor: "#E5E8E8",
        backgroundColor: 'blue',
    },
    
    textBtn:{
        color:'white'
    }
});

export default connect(null, {postBlogs})(Post);