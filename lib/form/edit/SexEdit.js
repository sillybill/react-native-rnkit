/**
 * Created by kevin on 15/11/26.
 */
'use strict';
import React from 'react-native'
import t from 'tcomb-form-native'
import stylesheet from '../stylesheets/flat'
import templates from '../templates/flat'
const {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
  } = React;

let Form = t.form.Form;
Form.templates = templates;
Form.stylesheet = stylesheet;

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  edit: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  thumb: {
    height: 20,
    width: 20,
    marginRight: 8
  },
  seg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 21,
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
    var textboxStyle = stylesheet.textbox.normal;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    var error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
      <View style={[formGroupStyle, {height: 44}]}>
        <View style={{flexDirection: 'row', height: 24, alignItems: 'center'}}>
        {label}
          <View style={[style.edit]}>
            <TouchableOpacity style={[style.seg]} onPress={()=>this.onChange('M')}>
              {
                this.state.value === 'M' ?
                <Image source={require('./../img/IconSelectCircle.png')} style={style.thumb} resizeMode="contain"/>
                : <Image source={require('./../img/IconUnselectCircle.png')} style={style.thumb} resizeMode="contain"/>
              }
              <Text>男</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[style.seg]} onPress={()=>this.onChange('F')}>
              {
                this.state.value === 'M' ?
                <Image source={require('./../img/IconUnselectCircle.png')} style={style.thumb} resizeMode="contain"/>
                : <Image source={require('./../img/IconSelectCircle.png')} style={style.thumb} resizeMode="contain"/>
              }
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