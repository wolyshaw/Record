import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import { appStore } from '../util'

const Loading = props => {
  return (
    <View
      style={ props.visible ? styles.show : styles.hidden }
    >
      <View style={{ padding: 20, borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, 0.7)', }}>
        <ActivityIndicator color="#fff"/>
      </View>
    </View>
  )
}

export default Loading


const styles = StyleSheet.create({
  show: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hidden: {
    display: 'none'
  }
})
