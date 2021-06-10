import React from 'react'
import TabView from '../navigationTabViewApi/TabView';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import firebase from '../Firebase';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Email: null,
      UserFirebase: null,
      TokenExpo: null
    }
    console.disableYellowBox = true;
  }

  componentDidMount = () => {
    this.registerForPushNotification();
  }

  registerForPushNotification = async () => {
    //Checa se á permission
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalSatatus = status;

    //Se existir...
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalSatatus = status;
    }
    // Se nao existir ...
    if (finalSatatus !== 'granted') { return; }

    //Pegar token
    let token = await Notifications.getExpoPushTokenAsync();
    //console.log(token);

    //Enviar Token ao firebase
    let user = firebase.auth().currentUser;
    this.setState({ UserFirebase: user.uid });
    this.setState({ Name: user.displayName })
    this.setState({ Email: user.email })
    this.setState({ TokenExpo: token })

    firebase.database().ref("users").push({
      IdUser: this.state.UserFirebase,
      Name: this.state.Name,
      Email: this.state.Email,
      ExpoPushToken: this.state.TokenExpo,
    })

  }


  render() {
    return <TabView />
  }
}

export default HomeScreen

HomeScreen.navigationOptions = {

  headerTitle: null,
  headerStyle: {
    backgroundColor: '#cc2229',
    height: 0,
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

