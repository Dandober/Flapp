import React, { Component } from 'react';
import { Container, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import SportMenuSuperior from './SportMenuSuperior';
import FlaTvMenuSuperior from './FlaTvMenuSuperior';
import NoticiasMenuSuperior from './NoticiasMenuSuperior';
import firebase from '../Firebase'

var tabNavigation = 0;

export default class HomeMenuSuperior extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabNavigation: 0,  

    }
  }

  // componentWillMount() {
  //   this.readPage()
  // }

  
  // readPage = () => {
  //   const TabNavigation = 0;
  //   this.setState({ TabNavigation: this.state.tabNavigation })
  //   return TabNavigation;
  // }

  render() {

    return (
      <Container style={styles.super}>
        <Text style={styles.optionsTitleText}></Text>

        <Tabs initialPage={0} onChangeTab={({ i, ref, from }) => 
        //this.setState({ currentTab: i })}>
          
          { console.log(i) }
   
        
       } >

          <Tab heading={<TabHeading style={styles.tabHeadingNoticias}><Icon style={styles.noticias} name="md-clipboard" /><Text style={styles.tabHeading}> Noticias</Text></TabHeading>}>

            <NoticiasMenuSuperior fun={this.props.fun} />

          </Tab>

          <Tab heading={<TabHeading style={styles.tabHeadingFlatv}><Icon style={styles.flatv} name="md-tv" /><Text style={styles.tabHeading}>Videos</Text ></TabHeading>}>
            <FlaTvMenuSuperior funFlaTv={this.props.funFlaTv} />
          </Tab>

          <Tab heading={<TabHeading style={styles.tabHeadingEsports}><Icon style={styles.esports} name="md-heart-half" /><Text style={styles.tabHeading}> E-sports</Text></TabHeading>}>

            <SportMenuSuperior funEsportes={this.props.funEsportes} />

          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: "red",
  },
  super: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticias: {
    backgroundColor: "#cc2229",
    color: 'white',
    fontSize: 25
  },
  flatv: {
    backgroundColor: "#e6272e",
    color: 'white',
    fontSize: 25
  },
  esports: {
    backgroundColor: "#ff2a33",
    color: 'white',
    fontSize: 25
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 12,
    backgroundColor: "white"
  },
  tabHeadingNoticias: {
    backgroundColor: "#cc2229"
  },
  tabHeading: {
    color: "white"
  },
  tabHeadingFlatv: {
    backgroundColor: "#e6272e"
  },
  tabHeadingEsports: {
    backgroundColor: "#ff2a33"
  }
});