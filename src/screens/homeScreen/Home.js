import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
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

let query = new AV.Query('record')

const addZore = num => num < 10 ? '0' + num : num

const Images = props => {
  let { list = [] } = props
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start' ,
        flexGrow: 3,
        flexWrap: 'wrap'
      }}
    >
      {
        list.map(item => {
          return <Image key={ item.id } style={{ flex: 1, height: 60 }} source={{ uri: item.attributes.url }}/>
        })
      }
    </View>
  )
}

const NullList = props => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80
      }}
      onPress={ props.onPress }
    >
      <Image
        style={{ width: 80, height: 60, marginRight: 30 }}
        source={ require('../../../static/null.png') }
      />
      <Text style={{ lineHeight: 60 }}>还没有记录，立刻去添加</Text>
    </TouchableOpacity>
  )
}

class Home extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '记录',
    headerLeft: (
      <TouchableOpacity onPress={ () => navigation.navigate('Setting') }>
        <Image
          style={{ width: 20, height: 20, marginLeft: 10 }}
          source={ require('../../../static/setting.png') }
        />
      </TouchableOpacity>
    ),
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
    this.loadContents = this._loadContents.bind(this)
    this.loading = false
  }

  _loadContents() {
    this.loading = true
    // dispatch(loading({visible: true}))
    if (this.props.user) {
      query.include('images')
      query.find().then(r => {
        this.loading = false
        // dispatch(loading({visible: false}))
        this.setState({contents: r}, () => console.log(r))
      })
    }
  }

  componentWillMount() {
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
    AV.User.currentAsync().then(user => {
      dispatch(userinfo(user))
      this.loadContents()
    })
  }

  render() {
    let { contents = [] } = this.state
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          style={ styles.container }
          data={ contents }
          onRefresh={ this.loadContents }
          refreshing={ this.loading }
          keyExtractor={ item => item.id }
          ListEmptyComponent={ <NullList onPress={ () => this.props.navigation.navigate('Create') }/> }
          renderItem={ (item) => {
            let time = new Date(item.item.createdAt)
            let attributes = item.item.attributes || {}
            return (
              <View key={item.id} style={ styles.contents }>
                <View style={ styles.content }>
                  <Text style={ styles.data }>
                    {
                      `${addZore(time.getMonth() + 1)}/${addZore(time.getDate())}`
                    }
                    </Text>
                </View>
                {
                  attributes.images.length ? (
                    <View style={{ flex: 1 }}>
                      <Images list={ attributes.images }/>
                      <Text style={ styles.content }>{attributes.content}</Text>
                    </View>
                  ) : <Text style={ styles.content }>{attributes.content}</Text>
                }

              </View>
            )
          } }
        />
      </View>
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
