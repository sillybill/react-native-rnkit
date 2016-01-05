/**
 * Created by kevin on 15/11/26.
 */
'use strict';
import React from 'react-native'
import t from 'tcomb-form-native'
const {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
  } = React;

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  edit: {
    flexDirection: 'row',
  },
  thumb: {
    height: 20,
    width: 20,
    marginRight: 8
  },
  seg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 21,
  }
});

export default class extends t.form.Component{
  constructor(props: any){
    super(props);
    this.state.value = this.state.value || 'F';
  }

  render(){
    let locals = this.getLocals();
    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    var helpBlockStyle = stylesheet.helpBlock.normal;
    var errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    var error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

    if ('M' === this.state.value){
      var muri = 'IconSelectCircle';
      var furi = 'IconUnselectCircle';
    }else{
      var furi = 'IconSelectCircle';
      var muri = 'IconUnselectCircle';
    }
    return (
      <View style={formGroupStyle}>
        <View style={{flexDirection: 'row'}}>
        {label}
        <View style={style.edit}>
          <TouchableOpacity style={[style.seg]} onPress={()=>this.onChange('M')}>
            <Image source={{uri: muri, static: true}} style={style.thumb} resizeMode="contain"/>
            <Text>男</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.seg]} onPress={()=>this.onChange('F')}>
            <Image source={{uri: furi, static: true}} style={style.thumb} resizeMode="contain"/>
            <Text>女</Text>
          </TouchableOpacity>
        </View>
        </View>
        {help}
        {error}
      </View>
    );
  }

}