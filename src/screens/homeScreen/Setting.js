import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  DatePickerIOS,
  ActionSheetIOS,
  TouchableOpacity
} from 'react-native'

import AV from 'leancloud-storage'
import { lean, dispatch } from '../../util'
import { userinfo, loading } from '../../actions/user'

export default class Setting extends Component {

  static navigationOptions = {
    title: '设置',
  }

  constructor(props) {
    super(...props)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    dispatch(loading({visible: true}))
    AV.User.currentAsync().then(user => {
      dispatch(userinfo(user))
      dispatch(loading({visible: false}))
      this.setState({ user })
    })
  }

  render() {
    let { user = {} } = this.state
    let { attributes = {} } = user
    return (
      <View style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollView>
          <View style={ styles.item }>
            <Text style={ styles.name }>用户名：</Text>
            <Text style={ styles.value }>{ attributes.username }</Text>
          </View>
          <View style={ styles.item }>
            <Text style={ styles.name }>邮箱：</Text>
            <Text style={ styles.value }>{ attributes.email }</Text>
          </View>
          <TouchableOpacity onPress={ () => {
              AV.User.logOut()
              dispatch(userinfo(null))
            } }>
            <View>
              <Text style={ styles.button }>退出登录</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    // height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .1)'
  },
  name: {
    width: 80,
    lineHeight: 40,
    fontSize: 14
  },
  value: {
    lineHeight: 40,
    fontSize: 14
  },
  button: {
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#E21A43',
    color: '#fff',
    textAlign: 'center',
    height: 40,
    lineHeight: 40,
    margin: 10
  }
})
