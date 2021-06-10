//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { getBlogs, deleteBlog } from '../ChatComponents/action';
import { connect } from 'react-redux'
import _ from 'lodash';
import LottieView from 'lottie-react-native';

console.disableYellowBox = true;


class Blogs extends Component {

    componentDidMount() {
        this.props.getBlogs()
    }


    render() {

        return (
            <View style={styles.container}>

                {
                    this.props.loadingReducer ? <LottieView source={require('../Json/textNotification.json')} autoPlay loop /> :

                        <FlatList style={{ width: '100%' }}
                            data={this.props.listOfBlogs}
                            keyExtractor={(item) => item.key}
                            ref={ref => (this.scrollView = ref)} 
                            onContentSizeChange={() => {  
                            this.scrollView.scrollToEnd({ animated: true, index: -20 }, 200); }} 
                            renderItem={({ item }) => {
                                // Aqui filtra palavras chaves...
                                if(item.content.indexOf("fdp")!= -1 || 
                                   item.content.indexOf("Fdp")!= -1 ||
                                   item.content.indexOf("puta")!= -1 ||
                                   item.content.indexOf("Puta")!= -1 ||
                                   item.content.indexOf("cu")!= -1 ||
                                   item.content.indexOf("Cu")!= -1 ||
                                   item.content.indexOf("buceta")!= -1 ||
                                   item.content.indexOf("Buceta")!= -1 ||
                                   item.content.indexOf("pau")!= -1 ||
                                   item.content.indexOf("Pau")!= -1){
                                    return(
                                        //Se tiver alguma das palavras chaves...
                                        <View  style={styles.msgNotify}>
                                            <Text style={{ fontSize: 12, lineHeight: 15, color: '#fff', marginHorizontal: 10, alignItems:'center' }}>Estamos em Familia, não use palavrões!</Text>
                                            <Image style={styles.imgRobo} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/flapp-appdomengao.appspot.com/o/roboFla.jpg?alt=media&token=06ed04cd-53ea-4f27-9ac0-07a305b74e57" }} />
                                        </View>
                                    )
                                }else{
                                return (
                                    //Se não tiver...
                                    <View style={styles.msg}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={styles.imgProfile} source={{ uri: item.uri }} />

                                            <Text style={{ fontSize: 15, lineHeight: 30,fontWeight: 'bold', color: '#fff' }} >  {item.name}   </Text>
                                            <Text style={{ fontSize: 12,lineHeight: 30, color: '#fff' }}>Enviado em - {item.dt}  </Text>

                                        </View>

                                        <Text style={{ fontSize: 14, lineHeight: 15, color: '#fff', marginHorizontal: 10, marginLeft: 30 }}>{item.content}</Text>

                                    </View>
                                )
                            }
                            }}
                        />
                }

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5
    },

    imgProfile: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },
    imgRobo: {
        width: 15,
        height: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
    msg: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#575FCF',
        padding: 10,
        margin: 2
    },
    msgNotify: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#575FCF',
        padding: 5,
        margin: 2,
        flexDirection: 'row',
        justifyContent:'center'
    }
});

function mapStateToProps(state) {

    const listOfBlogs = _.map(state.blogsList.blogsList, (val, key) => {
        return {
            ...val,
            key: key
        }
    })

    return {
        listOfBlogs,
        loadingReducer: state.loadingReducer.loadingReducer

    }
}



export default connect(mapStateToProps, { getBlogs, deleteBlog })(Blogs);