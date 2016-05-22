/**
 * Created by kevin on 16/1/30.
 */
import React from 'react'
import {
  View,
  Image,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
  } from 'react-native';

export default class Carousel extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };

    this._onAnimationEnd = this._onAnimationEnd.bind(this);
    this._layout = this._layout.bind(this);
  }

  _onAnimationEnd(e) {
    let activePage = Math.round(e.nativeEvent.contentOffset.x / this.state.width);

    if (this.props.onChangePage) {
      this.props.onChangePage(activePage);
    }
  }

  _layout({nativeEvent: {layout: {x, y, width, height }}}) {
    let skipWidth = this.props.activePage * width;
    this.refs.scrollView.scrollWithoutAnimationTo(0, skipWidth);
    this.setState({
      width: width,
      height: height,
    })
  }

  render() {
    const {
      photos,
      backgroundColor
      } = this.props;

    const {
      width, height
      } = this.state;

    if (photos) {
      var items = photos.map((item, index) => {
        return (
          <ScrollView
            key={index}
            style={{width: width, height: height}}
            maximumZoomScale={3.0}>
            <TouchableWithoutFeedback onPress={()=>this.props.close()}>
              <Image
                resizeMode="contain"
                source={{uri: item}}
                style={{backgroundColor: backgroundColor, width: width, height: height}}
              />
            </TouchableWithoutFeedback>
          </ScrollView>
        );
      })
    };
    return (
      <ScrollView
        onLayout={this._layout}
        ref="scrollView"
        pagingEnabled={true}
        horizontal={true}
        onMomentumScrollEnd={this._onAnimationEnd}
        style={[{flex: 1}, this.props.style]} >
          {items}
      </ScrollView>
    );
  }
}
