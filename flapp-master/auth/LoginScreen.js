import React from 'react'
import { MonoText } from '../components/StyledText'
import * as WebBrowser from 'expo-web-browser'
import * as Facebook from 'expo-facebook'
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native'
import firebase from '../Firebase'
import { EvilIcons, Entypo } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//import * as Google from 'expo-google-app-auth'

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadFace: false,
            loadAnon: false

        }
        console.disableYellowBox = true;
    }

    async handleHelpPress() {
        WebBrowser.openBrowserAsync(
            'https://azimutestartup.com')
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Main')
            } else {
                // .......................
            }
        })
    }

    // async loginWithGoogle() {
    //     try {
    //         const result = await Google.logInAsync({
    //             androidClientId: '124306057673-v0he8cam2a1ar4fiksr83bgu067tp3k9.apps.googleusercontent.com',
    //             iosClientId: '124306057673-5jkd5922ieboqji740909lcqiaftqgl7.apps.googleusercontent.com',

    //             scopes: ['profile', 'email'],
    //         });

    //         if (result.type === 'success') {
    //             this.props.navigation.navigate('Main');
    //         } else {
    //             return { cancelled: true };
    //         }
    //     } catch (e) {
    //         return { error: true };
    //     }
    // }


    //Aqui ativa o indicador Facebook
    loadFacebook() {
        if (this.state.loadFace) {
            return (<ActivityIndicator animating={true} size="large" color="#4267b3" />)

        } else {
            return (<EvilIcons name='sc-facebook' size={40} color="#4267b3" />)
        }
    }
    
        //Aqui ativa o indicador Anonimous
    loadAnonymous() {
        if (this.state.loadAnon) {
            return ( <ActivityIndicator animating={true} size="large" color="#4267b3" />)

        } else {
            return ( <Text style={styles.textButton01}>Entrar sem Login</Text>)
        }
    }



    async loginWithFacebook() {

        const { type, token } = await Facebook.logInWithReadPermissionsAsync('755272374901231', { permissions: ['public_profile', 'email'] })
        if (type == 'success') {
            this.setState({ loadFace: true }) 

            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id.name.picture.type(large)`);
            const userInfo = await response.json()
            this.setState({ userInfo })
            console.log(userInfo.id);

            firebase.auth().signInWithCredential(credential).catch((error) => {
                alert(error)
                this.setState({ loadFace: false })
            })
        }
    }




    async loginWithTwiter() {

        var provider = new firebase.auth.TwitterAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log(result.credential.accessToken);
            console.log(result.credential.secret);
            console.log(result.user);

        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
    }


     loginAnonymous=() =>{
          this.setState({ loadAnon: true })
        firebase.auth().signInAnonymously().catch(function (error) {
            this.setState({ loadAnon: false })
            console.log(error);
        });
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                console.log(user.isAnonymous);
                console.log(user.uid);

            } else {
                console.log(user)
            }
        });
    }

    info = () => {
        return (
            <View>
                <Text>{this.state.userInfo.id}</Text>
            </View>
        )
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.container}>

                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', width: wp('100%'), height: hp('100%') }}>
                    <View style={styles.geral}>

                        <View style={styles.texto01}>
                            <Text style={styles.auxText01}> Bem Vindo</Text>
                        </View>

                        <View style={{ width: wp('30%'), height: hp('20%'), paddingBottom: hp('35%') }}>

                            <Image
                                style={{ width: 110, height: 110, marginTop: hp('12%') }}
                                source={require('../assets/images/icon.png')}
                            />
                        </View>



                        {/* <View style={styles.texto02}>
							<Text style={styles.auxText02}>Tenha na Palma de suas mãos as ultimas noticias, tabelas e calendário de jogos do Mengão!</Text>
						</View> */}

                        <View style={styles.texto03}>

                            <Text style={styles.axText03}>Faça login com sua </Text>
                            <Text style={styles.axText03}>Rede Social preferida:</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: "center", marginBottom: hp('10%') }}>
                            <View style={styles.button02}>

                                <TouchableOpacity>
                                    <Entypo name='google-' size={25} color="#EE0000" />
                                </TouchableOpacity >

                            </View>

                            <View style={styles.button02}>

                                <TouchableOpacity onPress={() => this.loginWithFacebook()}>
                                    <View style={{ flexDirection: 'row', }}>
                                        {this.loadFacebook()}

                                    </View>
                                </TouchableOpacity >

                            </View>

                        </View>

                        <View style={styles.button01}>
                            <TouchableOpacity onPress={() => this.loginAnonymous()}>
                            {this.loadAnonymous()}
                               
                            </TouchableOpacity >
                        </View>

                        <View style={styles.Aux} >
                            <TouchableOpacity onPress={() => { this.handleHelpPress() }} >
                                <Text style={styles.spaceButtonLogin}>® Azimute Startup Ltda</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Aux: {
        marginBottom: hp('-5%')

    },

    texto01: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp('12%'),
        textShadowColor: 'black',

    },
    auxText01: {
        color: '#fff',
        fontSize: hp('6%'),
        fontWeight: '800'
    },

    texto02: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp('2%'),

    },
    auxText02: {
        color: '#fff',
        fontSize: hp('3%'),
        textAlign: "center",
        fontWeight: '700',
        padding: hp('1%')
    },

    texto03: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp('1%'),
        margin: wp('2%'),
        paddingBottom: wp('12%')

    },
    axText03: {
        color: '#fff',
        fontSize: hp('3%'),
        textAlign: "center",
        fontWeight: '400',
    },


    spaceButtonLogin: {
        marginBottom: hp('1%'),
        color: 'white'

    },
    button01: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('11%'),

    },
    textButton01: {
        fontSize: hp('3%'),
        color: 'white',
        fontWeight: '800',
        shadowColor: 'blue',
        borderColor: 'red'

    },
    button02: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        marginBottom: hp('-5%'),
        paddingLeft: 5,
        margin: 5,
        marginLeft: 9,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "#E5E8E8",
        backgroundColor: 'white'
    },
    geral: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('9%'),
    }
})


export default LoginScreen;