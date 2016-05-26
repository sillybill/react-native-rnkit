/**
 * Created by kevin on 16/1/30.
 */
import React from 'react'

import {
  View,
  ViewPagerAndroid,
  StyleSheet,
  TouchableOpacity,
  Text,
  } from 'react-native';

import Image from 'react-native-image-zoom'

export default class Carousel extends React.Component{
  constructor(props: any){
    super(props)
  }

  render(){
    if (this.props.photos && this.props.photos.length > 0){
      var photos = this.props.photos.map((item, index)=>{
          return (
            <View key={index} style={{flex: 1}}>
              <Image source={{
                uri: item,
                thumbnail: item
                }}
                     resizeMode="contain"
                     style={style.image}/>
            </View>
          )
        })
    }
    return (
      <View style={{flex: 1}}>
        <ViewPagerAndroid
          style={style.container}
          initialPage={this.props.activePage}
          onPageSelected={e=>this.props.onChangePage(e.nativeEvent.position)}>
          {
            photos
          }
        </ViewPagerAndroid>
        <TouchableOpacity style={style.button} onPress={this.props.close}>
          <Text style={style.buttonText}>关闭</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,

  },
  buttonText: {
    fontSize: 22,
    color: '#fff'
  }
})