import React from 'react'
import {View, StyleSheet, Button, Linking } from 'react-native'
import firebase from '../Firebase';
import { Text } from 'native-base';

export default class LogoutScreen extends React.Component {
    sair = () => {  
        firebase.auth().signOut();
        alert('Deslogado com sucesso!');
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            
            <View style={styles.container}>
                <Text style={{color: 'white'}}>Desenvolvido por:</Text>
                <Text style={{color: 'white'}}>Azimute Startup</Text>
                <Text style={{color: 'red', fontSize: 20, marginBottom: 100}} onPress={() => Linking.openURL('https://azimutestartup.com/')}>AzimuteStartup.com</Text>
                <Button style={styles.btn} title="Click para sair!" onPress={this.sair}></Button>
            </View>
        )
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
    }
})