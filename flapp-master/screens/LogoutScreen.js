import React from 'react'
import {View, StyleSheet, Button, Linking, Image, Modal } from 'react-native'
import firebase from '../Firebase';
import { Text } from 'native-base';

export default class LogoutScreen extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			name: '',
			uri: '',

		}

    }
    

    

	componentWillMount = () => {

		firebase.auth().onAuthStateChanged((user) => {

			let name

			if (user != null) {

				name = user.displayName,
					uri = user.photoURL + "?height=400"

			}
			this.setState({ name })
			this.setState({ uri })

		})

    }
    

    sair = () => {  
        firebase.auth().signOut();
        alert('Deslogado com sucesso!');
        this.props.navigation.navigate('Login')
    }

    render() {
        return (           
            
            <View style={styles.container}>
            <Image
                style={styles.imgProfile}
                source={{ uri: this.state.uri }}
            />
            <Text  style={{color: 'white'}}>{this.state.name}</Text>
                <Text style={{color: 'white'}}>Desenvolvido por:</Text>
                <Text style={{color: 'white'}}>Azimute Startup</Text>
                <Text style={{color: 'red', fontSize: 20, marginBottom: 100}} onPress={() => Linking.openURL('https://azimutestartup.com/')}>AzimuteStartup.com</Text>
                <Button style={styles.btn} title="Click para sair!" onPress={this.sair}></Button>
            </View>
        );
    }
}

LogoutScreen.navigationOptions = {
    title: "App do Mengão",
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
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red', 
        backgroundColor: 'black'
    },
    btn:{
        backgroundColor: 'red',
        marginTop: 50
    },
 
        box01: {
            alignItems: 'center',
            color: '#F65354'
        },
        box02: {
            alignItems: 'center',
            marginTop: 16
        },
      
        imgProfile: {
    
            width: 165,
            height: 165,
            borderRadius: 100,
            borderWidth: 6,
            borderColor: '#DDDDDD',
            justifyContent: 'center',
        },
        box03: {
            alignItems: 'center',
        },
        box04: {
    
            backgroundColor: '#F65354',
            width: 318,
            height: 48,
            borderRadius: 100,
            borderWidth: 0,
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
        },
    
    });
