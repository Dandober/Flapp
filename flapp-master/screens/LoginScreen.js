import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import firebase from '../Firebase'
import { EvilIcons, Entypo } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class LoginScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			userInfo: null
		}

		//Olheiro FireBase
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.props.navigation.navigate('Main')
			}
		})
	}

	async loginWithFacebook() {

		const { type, token } = await Facebook.logInWithReadPermissionsAsync('755272374901231', { permissions: ['public_profile', 'email'] })
		if (type == 'success') {
			const credential = firebase.auth.FacebookAuthProvider.credential(token)
			const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id.name.picture.type(large)`);
			const userInfo = await response.json()
			this.setState({ userInfo })
			console.log(userInfo.id);

			firebase.auth().signInWithCredential(credential).catch((error) => {
				console.log(error)
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


	async loginAnonymous() {
		firebase.auth().signInAnonymously().catch(function (error) {
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
			<ImageBackground source={require('../assets/images/BG.png')} style={styles.container}>
				<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
					<View style={styles.geral}>
						<View>
							<Image
								style={{ width: wp('30%'), height: hp('16%'),  marginTop: hp('15%') }}
								source={require('../assets/images/Icone.png')}
							/>
						</View>

						<View style={styles.texto01}>
							<Text style={styles.auxText01}> Bem Vindo</Text>
						</View>

						<View style={styles.texto02}>
							<Text style={styles.auxText02}>Tenha na Palma de suas mãos as ultimas noticias, tabelas e calendário de jogos do Mengão!</Text>
						</View>


						<View style={styles.texto03}>
							<Text style={styles.axText03}>Faça login com sua Rede Social preferida:</Text>
						</View>


						<View style={{ flexDirection: 'row', justifyContent: "center", marginBottom: 80 }}>
							<View style={styles.button02}>

								<TouchableOpacity onPress={() => { alert("Disponível em breve!") }}>
									<Entypo name='google-' size={25} color="#EE0000" />
								</TouchableOpacity >

							</View>

							<View style={styles.button02}>

								<TouchableOpacity onPress={() => this.loginWithFacebook()}>
									<View style={{ flexDirection: 'row' }}>
										<EvilIcons name='sc-facebook' size={40} color="#4267b3" />
									</View>
								</TouchableOpacity >

							</View>

							{/* <View style={styles.button02}>

								<TouchableOpacity onPress={() => { alert("Disponível em breve!") }}>
									<View style={{ flexDirection: 'row' }}>
										<Entypo name='twitter' size={25} color="#08a0e9" />
									</View>
								</TouchableOpacity >

							</View> */}

							<View style={styles.button02}>

								<TouchableOpacity onPress={() => this.loginAnonymous()}>
									<View style={{ flexDirection: 'row' }}>
										<Entypo name='mask' size={25} color="grey" />
									</View>
								</TouchableOpacity >

							</View>
						</View>

						<View >
							<Text style={styles.spaceButtonLogin}>® Azimute Startup Ltda</Text>
						</View>
					</View>
				</View>

			</ImageBackground >
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green',
		alignItems: 'center',
		justifyContent: 'center'
	},


	texto01: {
		flex: 1,
		alignItems: 'center',
		marginTop: hp('3%'),
		textShadowColor: 'black',

	},
	auxText01: {
		color: '#fff',
		fontSize: hp('7%'),
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
		marginTop: hp('2%')

	},
	axText03: {
		color: '#fff',
		fontSize: hp('3%'),
		textAlign: "center",
		fontWeight: '700',
	},

	spaceButtonLogin: {
		marginBottom: hp('4%'),
		color: 'white'

	},
	button02: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 70, 
		height: 70,
		padding: 5,
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
		marginBottom: hp('4%'),
	}
})