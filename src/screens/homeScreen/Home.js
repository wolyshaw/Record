import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { lean } from '../../util'
import AV from 'leancloud-storage'

let query = new AV.Query('_User')

export default class Home extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
        <View style={ styles.header }>
          <View></View>
          <Text style={ styles.title }>记录</Text>
          <TouchableOpacity onPress={ () => this.props.navigation.navigate('Create')}>
            <Image style={ styles.icon } source={ require('../../../static/add.png') }/>
          </TouchableOpacity>
        </View>
        <ScrollView>

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
  }
})
