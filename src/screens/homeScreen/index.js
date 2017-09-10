import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from './Home'
import Create from './Create'
import Setting from './Setting'

const HomeScreen = StackNavigator({
  Home: { screen: Home, path: 'Home' },
  Create: { screen: Create, path: 'Create' },
  Setting: { screen: Setting, path: 'Setting' },
}, {
  navigationOptions:{
    headerStyle: {
      backgroundColor: '#E21A43',
    },
    headerTitleStyle: {
      color: '#fff'
    },
    headerBackTitleStyle: {
      color: '#fff'
    }
  }
  // headerMode: 'none'
})

export default HomeScreen
