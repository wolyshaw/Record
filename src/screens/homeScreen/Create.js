import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { lean } from '../../util'
import AV from 'leancloud-storage'

let query = new AV.Query('_User')

export default class Create extends Component {

  _submit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
        <View style={ styles.header }>
          <TouchableOpacity onPress={ () => this.props.navigation.goBack()}>
            <Image style={ styles.icon } source={ require('../../../static/back.png') }/>
          </TouchableOpacity>
          <Text style={ styles.title }>创建新记录</Text>
          <View></View>
        </View>
        <ScrollView>
          <View style={ styles.item }>
            <Text style={ styles.name }>主题：</Text>
            <TextInput style={ styles.value } placeholder="请输入主题最多不超过三个"/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  header: {
    backgroundColor: '#E21A43',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  icon: {
    width: 20,
    height: 20
  },
  list: {},
  item: {
    flex: 1
  },
  name: {
    flexGrow: 1
  },
  value: {
    flexGrow: 5
  }
})
