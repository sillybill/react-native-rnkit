/**
 * Created by kevin on 15/12/17.
 */
'use strict';

import React from 'react-native';
import Toast from 'react-native-toast'


const {
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  CameraRoll,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  View,
  Text,
} = React;

import Modal from '../Modal'
import Carousel from './Carousel'



module.exports = React.createClass({

  propTypes: {
    photos: React.PropTypes.array,
    actions: React.PropTypes.array
  },
  getInitialState() {
    return {
      show: false,
      activePage: 0
    };
  },

  handleChangePage(page) {
    this.setState({
      activePage: page
    }, () => {
      //after active page changed
    })

  },

  open(initialPage) {
    if (this.props.photos && this.props.photos.length > 0) {
      this.setState({
        show: true,
        activePage: initialPage || 0
      });
      if (StatusBar) {
        StatusBar.setHidden(true, 'fade');
      }
    } else {
      Toast.show('没有可浏览的照片')
    }
  },

  close() {
    this.setState({
      show: false
    });
    if (StatusBar) {
      StatusBar.setHidden(false, 'fade');
    }
  },

  saveAs(item) {
    let uri = this.props.photos[item];
    CameraRoll.saveImageWithTag(uri, () => {
      Toast.show('已成功地保存到本地相册');
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen != undefined) {
      if (nextProps.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  },

  render() {
    const {
      actions,
      photos
      } = this.props;

    if (!photos || photos.length == 0){
      return null;
    }


    if (actions) {
      var buttons = actions.map((action, key) => {
        return (
          <TouchableOpacity key={key} style={{padding: 3, margin: 5}} onPress={()=>action.func(this.state.activePage)}>
            <Text style={{color: '#ffffff'}}>{action.text}</Text>
          </TouchableOpacity>
        );
      });
    }

    return (
      <Modal
        visible={this.state.show}
        style={{
         top: 0,
         bottom: 0,
         right: 0,
         left: 0,
        }}>
        <View style={{flex: 1}}>
          <Carousel
            photos={photos}
            activePage={this.state.activePage}
            onChangePage={this.handleChangePage}
            backgroundColor="black"
            close={this.close}
          />
          <View
            style={styles.bottomView}>
            <View style={{padding: 3, margin: 5, alignSelf: 'flex-start'}}>
              <Text style={{color: '#ffffff'}}>{this.state.activePage+1}/{photos.length}</Text>
            </View>
            <TouchableOpacity
              style={{padding: 3, margin: 5}}
              onPress={()=>this.saveAs(this.state.activePage)}>
              <Text style={{color: '#ffffff'}}>保存到相册</Text>
            </TouchableOpacity>
            {buttons}
          </View>
        </View>
      </Modal>
    );
  }
});

var styles = StyleSheet.create({
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
