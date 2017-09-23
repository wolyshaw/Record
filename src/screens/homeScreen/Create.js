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
import { lean, dispatch } from '../../util'
import { userinfo, loading } from '../../actions/user'
import ImagePicker from 'react-native-image-picker'
import Picker from 'react-native-picker'
import AV from 'leancloud-storage'
var photoOptions = {
  title:'请选择',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'选择相册',
  quality:0.75,
  allowsEditing:true,
  noData:false,
  storageOptions: {
    skipBackup: true,
    path:'images'
  }
}

let query = new AV.Query('_User')

export default class Create extends Component {
  static navigationOptions = {
    title: '创建新记录',
  }

  constructor(props) {
    super(...props)
    this.state = {
      list: [],
      contents: [],
      content: '',
      title: '',
      avatarSource: null,
      date: '请选择时间'
    }
    this.createItem = this._createItem.bind(this)
  }

  cameraAction = () =>{
    ImagePicker.showImagePicker(photoOptions, (response) => {

      if (response.didCancel) {
        alert(response.didCancel)
      } else if (response.error) {
        alert(response.error)
      } else if (response.customButton) {
        alert(response.customButton)
      } else {
        let source = { uri: response.uri }
          this.setState({
            avatarSource: source
          })
          let file = new AV.File(response.fileName, { blob: response })
          dispatch(loading({visible: true}))
          file.save().then(r => {
            dispatch(loading({visible: false}))
            this.state.list.push(r)
          }, err => alert(err))
        }
      })
    }

  showImageOption = (index) => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '删除',
        '取消'
      ],
      cancelButtonIndex: 1,
      title: '删除此张图片',
    }, (button) => {
      if (button === 0) {
        let { list } = this.state
        list.splice(index, 1)
        this.setState({list})
      }
    })
  }

  _createItem() {
    let { title, content, list } = this.state
    const record = AV.Object.extend('record')
    let Record = new record()
    Record.set('title', title)
    Record.set('content', content)
    Record.set('images', list)
    dispatch(loading({visible: true}))
    Record.save().then(r => {
      dispatch(loading({visible: false}))
      this.props.navigation.goBack()
    })
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollView>
          <View style={ styles.item }>
            <Text style={ styles.name }>
              <Image style={{width: 20, height: 20}} source={ require('../../../static/title.png') }/>
            </Text>
            <TextInput
              style={ styles.value }
              value={ this.state.title }
              placeholder="请输入主题"
              onChangeText={ text => this.setState({ title: text }) }
            />
          </View>
          <View style={ styles.item }>
            <Text style={ styles.name }>内容：</Text>
            <TextInput
              style={ styles.content }
              value={ this.state.content }
              placeholder="请输入内容"
              multiline
              onChangeText={ text => this.setState({ content: text }) }
            />
          </View>
          <View style={ styles.images }>
            {
              this.state.list.map((item, index) => (
                <TouchableOpacity key={item.fileName} style={styles.imagelist} onPress={() => this.showImageOption(index)}>
                  <Image source={{uri: item.uri}} style={styles.uploadAvatar}/>
                </TouchableOpacity>
              ))
            }
            <TouchableOpacity style={styles.addImage} onPress={this.cameraAction.bind(this)}>
              <Image style={ styles.addImage } source={require('../../../static/add_photos.png')}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={ this.createItem }
          >
            <Text style={ styles.button }>提交</Text>
          </TouchableOpacity>
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
    flex: 1,
    flexDirection: 'row',
    // height: 40,
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
  content: {
    lineHeight: 40,
    fontSize: 14,
    height: 80,
    flex: 1
  },
  chooseTime: {
    marginTop: 10,
    marginBottom: 10,
  },
  uploadAvatar: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  images: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30
  },
  imagelist: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  addImage: {
    width: 100,
    height: 100,
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
