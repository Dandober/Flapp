import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../auth/LoginScreen';
import ShowScreen from '../screens/ShowScreen';


export default createAppContainer(
  createSwitchNavigator({

    Login: LoginScreen,
    Main: MainTabNavigator,
    Show: ShowScreen,

  },

    {
      initialRouteName: 'Login'
    }

  )
);


