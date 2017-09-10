import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  DatePickerIOS,
  ActionSheetIOS,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { lean, dispatch } from '../../util'
import { userinfo, loading } from '../../actions/user'
import AV from 'leancloud-storage'

import Login from '../../modals/Login'

let query = new AV.Query('Contents')

class Home extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '记录',
    headerRight: (
      <TouchableOpacity onPress={ () => navigation.navigate('Create') }>
        <Image
          style={{ width: 20, height: 20, marginRight: 10 }}
          source={ require('../../../static/add.png') }
        />
      </TouchableOpacity>
    )
  })

  constructor(props) {
    super(...props)
    this.state = {
      contents: [],
      avatarSource: {}
    }
  }

  componentWillMount() {
    dispatch(loading({visible: true}))
//     var user = new AV.User();
// // 设置用户名
// user.setUsername('wolyshaw');
// // 设置密码
// user.setPassword('record');
// // 设置邮箱
// user.setEmail('shaw@xwlong.com');
// user.signUp().then(function (loginedUser) {
//     console.log(loginedUser);
// }, function (error) {
//   console.log(error)
// });
console.log(this.state)
    // AV.User.logOut()
    AV.User.currentAsync().then(user => {
      dispatch(userinfo(user))
      dispatch(loading({visible: false}))
      if (this.props.user) {
        query.find().then(r => this.setState({contents: r}, () => console.log(r)))
      }
    })
  }

  addZore = num => num < 10 ? '0' + num : num

  render() {
    return (
      <ScrollView style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
      <TouchableOpacity onPress={ () => console.log(1) }>
          <Text>dinsji</Text>
        </TouchableOpacity>
        {
          this.state.contents.map(item => {
            let time = new Date(item.createdAt)
            return (
              <View key={item.id} style={ styles.contents }>
                <View style={ styles.content }>
                  <Text style={ styles.data }>
                    {
                      `${this.addZore(time.getMonth() + 1)}/${this.addZore(time.getDay())}`
                    }
                    </Text>
                </View>
                <Text style={ styles.content }>{item.attributes.content}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => state

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  icon: {
    width: 20,
    height: 20
  },
  uploadAvatar: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  contents: {
    padding: 10,
    flexDirection: 'row',
  },
  content: {

  },
  data: {
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: '#E21A43',
    color: '#fff',
    borderRadius: 25,
    borderColor: '#E21A43',
    overflow: 'hidden',
    marginRight: 20
  },
  imagelist: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
