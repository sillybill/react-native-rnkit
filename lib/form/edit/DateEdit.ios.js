/**
 * Created by kevin on 15/11/26.
 */
'use strict';

import React from 'react-native';
import t from 'tcomb-form-native';
import moment from 'moment';
import stylesheet from '../stylesheets/flat'
import templates from '../templates/flat'


const {
  StyleSheet,
  View,
  Modal,
  DatePickerIOS,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text
} = React;

let Form = t.form.Form;
Form.templates = templates;
Form.stylesheet = stylesheet;


export default class extends t.form.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      date: this.props.value,
    };
    this.renderPopup = this.renderPopup.bind(this);
    this.done = this.done.bind(this);
  }

  done(){
    if (this.onChange){
      this.onChange(this.state.date);
    }
    this.setState({show: false})
  }

  renderPopup() {
    let date = new Date(this.state.date);
    return (
      <Modal
        visible={this.state.show}
        transparent={true}
        animated={true}>
        <View style={styles.modalBackgroundStyle}>
          <TouchableWithoutFeedback onPress={()=>this.setState({show: false})}>
            <View style={{flex: 1}}></View>
          </TouchableWithoutFeedback>
          <View style={styles.container}>
            <View style = {styles.toolbar}>
              <TouchableOpacity style = {styles.button} onPress = {()=>this.setState({show: false})}>
                <Image source={require('../img/cancel.png')} style={styles.buttonIcon}/>
              </TouchableOpacity>
              <View style={styles.title}>
                <Text style={styles.titleText}>{this.props.title || '选择日期'}</Text>
              </View>
              <TouchableOpacity style = {styles.button} onPress = {this.done}>
                <Image source={require('../img/return.png')} style={styles.buttonIcon}/>
              </TouchableOpacity>
            </View>
            <DatePickerIOS
              style={styles.picker}
              date={date}
              onDateChange={(v)=>this.setState({date: (moment(v).format('YYYY-MM-DD'))})}
              mode={this.props.mode || 'date'}/>
          </View>
        </View>
      </Modal>
    )
  }
  shouldComponentUpdate(nextProps, nextState) {
    var should = (
      nextState.value !== this.state.value ||
      nextState.date !== this.state.date ||
      nextState.hasError !== this.state.hasError ||
      nextProps.options !== this.props.options ||
      nextProps.type !== this.props.type ||
      nextState.show !== this.state.show
    );
    return should;
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
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}
            onPress={() => {
              this.setState({
                date: this.props.value || moment().format("YYYY-MM-DD"),
                show: true})
          }}>
            <Text style={[textboxStyle, {height: 22}]}>{this.props.value}</Text>
          </TouchableOpacity>
        </View>
        {help}
        {error}
        {this.renderPopup()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: '#ffffff',
  },
  toolbar: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: '#303030'
  },
  button: {
    padding: 6,
  },
  buttonIcon: {


  },
  picker: {alignSelf: 'center'}
});
