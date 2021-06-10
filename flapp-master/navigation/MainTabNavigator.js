import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogoutScreen from '../auth/LogoutScreen';
import ChatScreen from '../screens/ChatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Notícias',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}

      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Tabelas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Calendários',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

SettingsStack.path = '';

//Botao Chat
const ChatStack = createStackNavigator(
  {
    Chat: ChatScreen,
  },
  config
);

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',

  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
  ),
};

ChatStack.path = '';
//Fim Chat

//botão Sair
const LogoutStack = createStackNavigator(
  {
    Logout: LogoutScreen,
  },
  config
);

LogoutStack.navigationOptions = {
  tabBarLabel: 'Sair',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'} />
  ),
};

LogoutStack.path = '';
// //Fim Sair

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  ChatStack,
  LogoutStack,
},
  {
    tabBarOptions: {
      activeTintColor: '#ffffff',
      labelStyle: {
        fontSize: 12,
        fontWeight: '300'
      },
      style: {
        backgroundColor: '#000000',

      },
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
