/**
 * Created by kevin on 15/12/17.
 */
'use strict';
import React from 'react-native'
import Dimensions from 'Dimensions'
const {
  StyleSheet,
  StatusBarIOS,
  Image,
  Modal,
  ScrollView,
  CameraRoll,
  TouchableOpacity,
  AlertIOS,
  TouchableWithoutFeedback,
  View,
  Text,
  } = React;

class Carousel extends React.Component{
  constructor(props: any){
    super(props);
    this.state = {
      width: 0,
      height: 0
    };

    this.saveAs = this.saveAs.bind(this);
    this._onAnimationEnd = this._onAnimationEnd.bind(this);
    this._layout = this._layout.bind(this);
  }

  saveAs(item){
    let uri = this.props.photos[item];
    CameraRoll.saveImageWithTag(uri, ()=>{
      AlertIOS.alert('提示', '已成功地保存到本地相册');
    });
  }

  _onAnimationEnd(e) {
    var activePage = e.nativeEvent.contentOffset.x / this.state.width;

    if (this.props.onChangePage) {
      this.props.onChangePage(activePage);
    }

  }

  _layout({nativeEvent: {layout: {x, y, width, height}}}){
    let skipWidth = this.props.activePage * width;
    this.refs.scrollView.scrollWithoutAnimationTo(0, skipWidth);
    this.setState({
      width: width,
      height: height,
    })
  }


  render(){
    const {
      photos,
      actions,
      backgroundColor} = this.props;
    const {width, height} = this.state;
    if (photos){
      var items = photos.map((item, index)=>{
        return (
          <ScrollView
            maximumZoomScale={3.0}
          >
            <TouchableWithoutFeedback onPress={()=>this.props.close()}>
              <Image resizeMode="contain" source={{uri: item}} style={{backgroundColor: backgroundColor, width: width, height: height}}/>
            </TouchableWithoutFeedback>
          </ScrollView>
        )
      })
    };
    if (actions){
      var buttons = actions.map((action)=>{
        return (
          <TouchableOpacity style={{padding: 3, margin: 5}} onPress={()=>action.func(this.props.activePage)}>
            <Text style={{color: '#ffffff'}}>{action.text}</Text>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View style={{flex: 1}} onLayout={this._layout}>
        <ScrollView
          ref="scrollView"
          pagingEnabled={true}
          horizontal={true}
          onMomentumScrollEnd={this._onAnimationEnd}
          style={this.props.style}
        >
          {items}
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'transparent', position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <View style={{padding: 3, margin: 5, alignSelf: 'flex-start'}}>
            <Text style={{color: '#ffffff'}}>{this.props.activePage+1}/{photos.length}</Text>
          </View>
          <TouchableOpacity style={{padding: 3, margin: 5}} onPress={()=>this.saveAs(this.props.activePage)}>
            <Text style={{color: '#ffffff'}}>保存到相册</Text>
          </TouchableOpacity>
          {buttons}
        </View>
      </View>

    )

  }

}

module.exports = React.createClass({
  propTypes: {
    photos: React.PropTypes.array(React.PropTypes.string),
    actions: React.PropTypes.array(React.PropTypes.object)
  },
  getInitialState(){
    return {
      show: false,
      activePage: 0
    };
  },

  handleChangePage(page){
    this.setState({
      activePage: page
    }, ()=>{
      //after active page changed
    })

  },

  open(initialPage){
    if (this.props.photos && this.props.photos.length > 0){
      this.setState({
        show: true,
        activePage: initialPage || 0
      });
      StatusBarIOS.setHidden(true, 'fade');
    }
    else {
      AlertIOS.alert('提示', '没有照片')
    }
  },

  close(){
    this.setState({
      show: false
    });
    StatusBarIOS.setHidden(false, 'fade');
  },

  componentWillReceiveProps(nextProps){
    if (nextProps.isOpen != undefined){
      if (nextProps.isOpen){
        this.open();
      }else{
        this.close();
      }
    }
  },



  render(){
    return (
      <Modal visible={this.state.show} >
        <Carousel {...this.props} activePage={this.state.activePage} onChangePage={this.handleChangePage} backgroundColor="black" close={this.close}/>
      </Modal>
    )
  }
});
