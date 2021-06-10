import { createSwitchNavigator, createAppContainer } from "react-navigation"
import React from 'react'
import { Share, BackHandler, StyleSheet, Text, View, FlatList, TouchableHighlight, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobBanner } from 'expo-ads-admob';
import { MonoText } from '../components/StyledText'
import { Icon } from 'native-base';

class FirstRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            loading: true
        }
        console.disableYellowBox = true;
    }
    componentWillMount() {

        firebase.database().ref('esportsWebhouse/001/posts').on('value', (snapshot) => {

            let state = this.state;
            state.lista = [];

            snapshot.forEach((childItem) => {

                if (true) {
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
                }
            });

            this.setState(state);
            this.setState({ loading: false })
        })
    }


    funEsportes = (title, main_image, description, author, content, url, published, numberAdmob, numberOfTab02, ) => {

        this.props.navigation.navigate('Screen02',

            {
                title: title,
                main_image: main_image,
                description: description,
                author: author,
                content: content,
                url: url,
                published: published,

            });


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
                        renderItem={({ item }) => <Api funEsportes={this.funEsportes} data={item} />}
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
                    this.props.funEsportes(this.props.data.title, this.props.data.main_image, this.props.data.author, this.props.data.text,
                        this.props.data.content, this.props.data.url, this.props.data.published)
                }} underlayColor="blue" >

                    <ImageBackground resizeMode="cover" source={{ uri: this.props.data.main_image || 'https://i.ibb.co/4tVqKdt/img-fundo-sem-noticia.png' }} style={{ height: 200 }}>

                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', paddingLeft: 10, paddingBottom: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                            <Text numberOfLines={2} style={{ fontSize: 32, color: '#FFFFFF', fontWeight: '800', marginBottom: 55, textTransform: 'uppercase' }}>{this.props.data.title || this.props.data.text}

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
    },
     
    icones: {
        marginLeft: 5

    },
    iconesc: {
        marginLeft: -20
    }
});

class SecondRoute extends React.Component {

    onBackPress = () => {


        this.props.navigation.navigate('Screen01')

        return true;
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    goToFirstRoute = _ => {
        this.props.navigation.navigate('Screen01')
    }

    convertDate = () => {

        let dt = this.props.navigation.state.params.published;
        let dt_public = dt.substr(-29, 10);
        let split = dt_public.split('-')
        data_formatada = split[2] + "/" + split[1] + "/" + split[0];
        return data_formatada
    }

    showTime = () => {
        let time = this.props.navigation.state.params.published
        let timeNow = time.substr(11, 5)
        return timeNow
    }

    onShare = () => {
        Share.share({
            message: this.props.navigation.state.params.url + '\n Flapp - O App do Mengão! \n Baixe já o seu!!! ',
        });
    }

    render() {
        const url = 'https://i.ibb.co/4tVqKdt/img-fundo-sem-noticia.png'
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <ScrollView style={{ marginHorizontal: wp('1%') }}>

                    <View style={{ textAlign: "justify", marginRight: wp('5%'), marginTop: hp('2%') }}>

                        <Text style={{ fontSize: 32, fontWeight: '500', marginHorizontal: wp('3%'), marginRight: wp('3%') }}>
                            {this.props.navigation.state.params.title.toUpperCase()}</Text>

                    </View>

                    <View style={{ resizeMode: 'cover', marginTop: 15 }}>
                        <Image source={{ uri: this.props.navigation.state.params.main_image || url }}
                            style={{ height: 220, width: wp('100%') }} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ marginLeft: wp('2%m'), marginTop: 5 }}>
                            <Text style={{ fontStyle: 'italic' }}> Publicado por {this.props.navigation.state.params.description}</Text>
                        </View>

                        <View style={{ marginLeft: wp('2%m'), marginTop: 5 }}>
                            <Text style={{ fontStyle: 'italic' }}>em {this.convertDate()}</Text>
                        </View>

                        <View style={{ marginLeft: wp('2%m'), marginTop: 5 }}>
                            <Text style={{ fontStyle: 'italic' }}>às {this.showTime()} h</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 15, marginHorizontal: wp('4%') }} >
                        <AdMobBanner
                            style={styles.bottomBanner}
                            bannerSize="SmartBanner"
                            adUnitID="ca-app-pub-9900590228093682/4425588727" // Test ID, Replace with your-admob-unit-id
                            testDeviceID="EMULATOR"
                            didFailToReceiveAdWithError={this.bannerError} />
                    </View>



                    <View style={{  marginTop: 10 , paddingHorizontal:wp('3%'), paddingRight:wp('12%'), textAlign: 'justify' }}>

                        <MonoText style={{ fontSize: 18, }} >{this.props.navigation.state.params.author.replace(/(?:\r\n|\r|\n|\")/g, "\n \n")}
                            {/*Author é na vdd o texto da noticai*/} </MonoText>

                    </View>


                    <View style={{ marginTop: 15, marginHorizontal: wp('4%') }} >
                        <AdMobBanner
                            style={styles.bottomBanner}
                            bannerSize="SmartBanner"
                            adUnitID="ca-app-pub-9900590228093682/2410754732" // Test ID, Replace with your-admob-unit-id
                            testDeviceID="EMULATOR"
                            didFailToReceiveAdWithError={this.bannerError} />
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: wp('10%'), marginTop: hp('3%') }}>
                        <View>

                            <TouchableOpacity onPress={this.goToFirstRoute}>
                                <Icon style={styles.icones} name="md-backspace" />
                                <Text>Voltar</Text>
                            </TouchableOpacity>

                        </View>


                        <View style={{ marginLeft: wp('60%') }}>
                            <TouchableOpacity onPress={() => { this.onShare() }}>
                                <Icon name='md-share' />
                                <Text style={{ marginLeft: -30 }}>Compartilhar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const AppNavigator = createSwitchNavigator({

    Screen01: FirstRoute,
    Screen02: SecondRoute

});

export default createAppContainer(AppNavigator);