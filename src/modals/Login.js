import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
// import { lean } from '../../util'
import AV from 'leancloud-storage'

export default class Login extends Component {
  constructor(props) {
    super(...props)
  }

  render() {
    let { open } = this.props
    console.log(open)
    return (
      <View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={!!open}
          onRequestClose={() => {alert('Modal has been closed.')}}
        >
        <Text>登录</Text>
        </Modal>
      </View>
    )
  }
}
