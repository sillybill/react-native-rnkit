/**
 * Created by kevin on 15/11/26.
 */
'use strict';

import React from 'react';
import t from 'tcomb-form-native';
import moment from 'moment';
import stylesheet from '../stylesheets/flat';
import templates from '../templates/flat';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  DatePickerAndroid,
} from 'react-native';

let Form = t.form.Form;
Form.templates = templates;
Form.stylesheet = stylesheet;

const style = StyleSheet.create({
  modal: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  dateBox: {
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    alignItems: 'center'

  },
  buttonBox: {
    alignItems: 'flex-end',
    backgroundColor: '#f3f3f3',
    alignSelf: 'stretch',
    borderColor: '#c7c6c6',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    color: '#ffffff'
  },
  picker: {}
});


export default class extends t.form.Component {

  constructor(props: any) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  async onPress(){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: moment(this.props.value, 'YYYY-MM-DD').toDate()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.onChange(moment({year, month, day}).format('YYYY-MM-DD'))
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }

  }

  getLocals() {
    let locals = super.getLocals();
    locals.help = this.props.options['help'];
    return locals;
  }

  render() {
    let locals = this.getLocals();
    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    var textboxStyle = stylesheet.textbox.normal;
    var helpBlockStyle = stylesheet.helpBlock.normal;
    var errorBlockStyle = stylesheet.errorBlock;
    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      textboxStyle = stylesheet.textbox.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    var error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;
    return (
      <View style={formGroupStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {label}
          <TouchableOpacity
            style={{flex: 2, justifyContent: 'center', alignItems: 'flex-end'}}
            onPress={this.onPress}>
            {
              this.props.value?
                <Text style={textboxStyle}>{this.state.value}</Text>
                :
                <Text style={[textboxStyle,{color:'#cbcbd0'}]}>点击选择日期</Text>

            }
          </TouchableOpacity>
        </View>
        {help}
        {error}
      </View>
    );
  }

}

