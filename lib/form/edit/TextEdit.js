/**
 * Created by kevin on 15/12/8.
 */
'use strict';
import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text
  } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 0,
    borderStyle: 'solid',
    borderBottomColor: '#c6c6c6',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'center'

  },
  row: {
    flexDirection: 'row',
  },
  title: {

  },
  titleEditing: {

  },
  input: {
    height: 20,

  },
  text: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

export default class TextEdit extends React.Component{
  constructor(props: any){
    super(props);
    this.state = {
      editing: false,
      value: this.props.value
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value
    });
  }


  render(){
    const titleStyles = [];
    const containerStyles = [style.container];

    if (this.state.editing){
      titleStyles.push(style.titleEditing);
      var input = (
        <TextInput autoFocus={true}
          style={style.input}
          value={this.state.value}
          onChangeText={this.props.onChangeText}
          onEndEditing={()=>this.setState({editing: false})}></TextInput>
      )
    }else{
      titleStyles.push(style.title);
      containerStyles.push(style.row);
      var text = (
        <TouchableOpacity style={style.text} onPress={()=>this.setState({editing: true})}>
          <Text>{this.state.value}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={containerStyles}>
        <Text style={titleStyles}>{this.props.title}</Text>
        {text}
        {input}
      </View>
    )
  }
}

TextEdit.propTypes = {
  value: React.PropTypes.string,
  title: React.PropTypes.string,
};

