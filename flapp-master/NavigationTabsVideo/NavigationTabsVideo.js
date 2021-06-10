import { createSwitchNavigator, createAppContainer } from "react-navigation"
import React from 'react'
import { Platform, BackHandler, StyleSheet, Text, View, FlatList, TouchableHighlight, ImageBackground, Share } from 'react-native';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview'
import { AdMobInterstitial } from 'expo-ads-admob';

import { Icon } from 'native-base';
import { TouchableOpacity } from "react-native-gesture-handler";

class FirstRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            loading: true
        }
        console.disableYellowBox = true;
    }

    componentDidMount = () => {
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
            this.setState({ loading: false })
        })

    }

    funFlaTv = (id) => {
        this.props.navigation.navigate('Screen02', { id: id })
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
                        renderItem={({ item }) => <DadosApi funFlaTv={this.funFlaTv} data={item} />}
                    />

                </View>
            );
        }
    }
}

class DadosApi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photoRandom: ''
        }
    }

    componentWillMount = () => {

        const jsonData = [
            "https://firebasestorage.googleapis.com/v0/b/flapp-appdomengao.appspot.com/o/5d7d64f86c231.jpeg?alt=media&token=e941348f-b9ab-4e3f-afcf-ea8170588df8",
            "https://firebasestorage.googleapis.com/v0/b/flapp-appdomengao.appspot.com/o/Jjqo8NY.png?alt=media&token=6baeff99-a788-4154-85df-cd2596c94b4c",
            "https://firebasestorage.googleapis.com/v0/b/flapp-appdomengao.appspot.com/o/embarqueflamengo03.jpg?alt=media&token=cca2942f-f083-42ef-8a77-2fc516f52ffa",
            "https://firebasestorage.googleapis.com/v0/b/flapp-appdomengao.appspot.com/o/jogadores-do-flamengo-comemoram-com-gabigol-apos-jogador-empatar-para-o-flamengo-1574546168660_v2_1920x1278-1024x585.jpg?alt=media&token=d2fe4268-59cb-4443-b4ad-f9d841303826",
            "https://firebasestorage.googleapis.com/v0/b/flapp-appdomengao.appspot.com/o/xfotao.png.pagespeed.ic.sLP3VIKWqR.jpg?alt=media&token=a4f5e0d6-b883-43d5-9f33-0a4c3147840a",
        ]
        const values = Object.values(jsonData)
        const randomValue = values[Math.floor(Math.random() * values.length)];
        this.setState({ photoRandom: randomValue });
        console.log(this.state.photoRandom)
    }

    render() {
        return (

            <TouchableHighlight onPress={() => {
                this.props.funFlaTv(this.props.data.id)
            }}
                underlayColor="blue" >

                <ImageBackground resizeMode="cover" source={{ uri: this.props.data.main_image || this.state.photoRandom  }} style={{ height: 220 }}>
       
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

                        <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 25, color: '#FFFFFF', textTransform: 'uppercase', fontWeight: '800', marginBottom: 30, margin: 5 }}>{this.props.data.title.replace(/&quot;/g, " ")}</Text>
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class SecondRoute extends React.Component {

    onBackPress = () => {


        this.props.navigation.navigate('Screen01')

        return true;
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }


    async adMobInterstitial() {
        AdMobInterstitial.setAdUnitID('ca-app-pub-9900590228093682/4270631310'); // Test ID, Replace with your-admob-unit-id
        AdMobInterstitial.setTestDeviceID('EMULATOR');
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
    }

    componentWillMount() {
        this.adMobInterstitial()
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }


    goToFirstRoute = _ => {
        this.props.navigation.navigate('Screen01')
    }

    onShare = () => {
        Share.share({
            message: 'https://www.youtube.com/watch?v=' + this.props.navigation.state.params.id + ' \n Flapp - O App do Mengão! \n Baixe já o seu!!!',

        });
    }


    render() {
        return (

            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <WebView
                    source={{ uri: 'https://www.youtube.com/embed/' + this.props.navigation.state.params.id }}
                    style={{ backgroundColor: 'black' }} />

                <View style={{ flexDirection: 'row', marginHorizontal: wp('3%'), marginTop: hp('2%') }}>
                    <View>
                        <TouchableOpacity onPress={this.goToFirstRoute}>
                            <Icon style={{ marginLeft: wp('12c%') }} name="md-backspace" />
                            <Text style={{ marginLeft: wp('10%') }}>Voltar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginLeft: wp('50%') }}>
                        <TouchableOpacity onPress={() => { this.onShare() }}>
                            <Icon style={{ marginLeft: wp('8%') }} name='md-share' />
                            <Text style={{ marginRight: wp('2%') }}>Compartilhar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )


    }
}


const AppNavigator = createSwitchNavigator({

    Screen01: FirstRoute,
    Screen02: SecondRoute

});

export default createAppContainer(AppNavigator);

