import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator
} from 'react-native'
import { appStore } from './util'
import HomeScreen from './screens/homeScreen'
import Login from './modals/Login'
import Loading from './components/Loading'
const mapStateToProps = (state, ownProps) => state

const HomeScreenContent = connect(mapStateToProps)(HomeScreen)

const Container = props => {
  return (
    <View style={{flex: 1}}>
      <HomeScreen/>
      <Login open={props.user}/>
      <Loading visible={props.loading.visible}/>
    </View>
  )
}

const ContainerContent = connect(mapStateToProps)(Container)

const Application = props => {
  return (
    <Provider store={appStore}>
      <ContainerContent/>
    </Provider>
  )
}

export default Application
