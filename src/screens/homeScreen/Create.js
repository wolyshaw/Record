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
import { lean, APP_ID, APP_KEY } from '../../util'
import ImagePicker from 'react-native-image-picker'
import Picker from 'react-native-picker'
import AV from 'leancloud-storage'
console.log(lean)
// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// })
var photoOptions = {
    //底部弹出框选项
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
      avatarSource: null
    }
  }

  _submit(e) {
    e.preventDefault()
  }

  cameraAction = () =>{

    ImagePicker.showImagePicker(photoOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.state.list.push(response)
        let source = { uri: response.uri };
          this.setState({
            avatarSource: source
          });
          let data = new FormData()
          data.append()
          let file = new AV.File(response.fileName, { blob: response });
          file.save().then(r => {
            console.log(r)
          }, err => console.log(err))
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

  _createDateData() {
    let date = [],
      time = new Date()
    for(let i = time.getFullYear(); i < time.getFullYear() + 10; i++) {
        let month = []
        for(let j = 1;j<13;j++) {
            let day = []
            if(j === 2) {
                for(let k=1;k<29;k++) {
                    day.push(k+'日')
                }
                if(i%4 === 0) {
                    day.push(29+'日')
                }
            } else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}) {
                for(let k=1;k<32;k++){
                    day.push(k+'日')
                }
            } else {
                for(let k=1;k<31;k++) {
                    day.push(k+'日')
                }
            }
            let _month = {}
            _month[j+'月'] = day
            month.push(_month)
        }
        let _date = {}
        _date[i+'年'] = month
        date.push(_date)
    }
    return date
}

_showDatePicker() {
    Picker.init({
        pickerData: this._createDateData(),
        pickerToolBarFontSize: 16,
        pickerFontSize: 16,
        pickerTitleText: '请选择时间',
        pickerConfirmBtnText: '确定',
        pickerCancelBtnText: '取消',
        pickerBg: [255, 255 ,255, 1],
        pickerFontColor: [0, 0 ,0, 1],
        onPickerConfirm: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
        },
        onPickerCancel: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
        },
        onPickerSelect: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
        }
    });
    Picker.show();
}

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollView>
          <View style={ styles.item }>
            <Text style={ styles.name }>主题：</Text>
            <TextInput style={ styles.value } placeholder="请输入主题最多不超过三个"/>
          </View>
          <TouchableOpacity style={ styles.chooseTime } onPress={ this._showDatePicker.bind(this) }>
            <Text>请选择时间</Text>
          </TouchableOpacity>
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
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 14
  },
  chooseTime: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10
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
    paddingRight: 10
  },
  imagelist: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  addImage: {
    width: 100,
    height: 100,
  }
})
