import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { lean, dispatch } from '../util'
import { userinfo } from '../actions/user'
import AV from 'leancloud-storage'

export default class Login extends Component {
  constructor(props) {
    super(...props)
    this.state = {
      nice_name: '',
      password: ''
    }
    this.login = this._login.bind(this)
  }

  _login() {
    AV.User.logIn(this.state.nice_name, this.state.password)
      .then(user => dispatch(userinfo(user)), err => console.log(err))
  }

  render() {
    let { open } = this.props
    return (
      <View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={open === null}
          onRequestClose={() => {}}
        >
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50, marginBottom: 50}}>
          <Image style={{marginTop: 20}} source={ require('../../static/logo.png') }/>
        </View>
        <View style={ styles.item }>
          <Text style={ styles.name }>
            <Image style={{width: 20, height: 20}} source={ require('../../static/user.png') }/>
          </Text>
          <TextInput
            style={ styles.value }
            placeholder="昵称"
            autoCapitalize="none"
            value={ this.state.nice_name }
            onChangeText={ text => this.setState({ nice_name: text }) }
            returnKeyType="next"
            onSubmitEditing={ () => this.refs.password.focus() }
          />
        </View>
        <View style={ styles.item }>
          <Text style={ styles.name }>
            <Image style={{width: 20, height: 20}} source={ require('../../static/password.png') }/>
          </Text>
          <TextInput
            ref="password"
            style={ styles.value }
            secureTextEntry
            placeholder="密码"
            value={ this.state.password }
            onChangeText={ text => this.setState({ password: text }) }
            returnKeyType="send"
            onSubmitEditing={ this.login }
          />
        </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .1)'
  },
  name: {
    width: 60,
    lineHeight: 40,
    fontSize: 14
  },
  value: {
    lineHeight: 40,
    fontSize: 14,
    flex: 1
  },
})
