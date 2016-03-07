/**
 * Created by kevin on 15/11/26.
 */
'use strict';
import React from 'react-native'
import t from 'tcomb-form-native'
import moment from 'moment'
const {
  StyleSheet,
  View,
  Modal,
  DatePickerIOS,
  Image,
  TouchableOpacity,
  Text
  } = React;

const style = StyleSheet.create({
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
  picker: {
  }
});

export default class extends t.form.Component{
  constructor(props: any){
    super(props);
    this.state['showPopup'] = false;
    //this.state.value = this.state.value || moment().format('YYYY-MM-DD');
    this.renderPopup = this.renderPopup.bind(this);
  }

  renderPopup(){
    let date = new Date(this.state.value);
    return (
      <Modal
        visible={this.state.showPopup}
        transparent={true}
        animated={true}
        >
        <View style={style.container}>
          <View style={style.dateBox}>
            <View style={style.buttonBox}>
              <TouchableOpacity style={style.button} onPress={()=>this.setState({showPopup: false})}>
                <Image source={require('./../img/IconSelectCircle.png')}
                       style={style.buttonIcon}
                       resizeMode="contain"/>
              </TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={()=>{
                this.setState({value: this.state.originValue, showPopup: false})
              }}>
                <Image source={require('./../img/IconClose.png')}
                       style={style.buttonIcon}
                       resizeMode="contain"/>
              </TouchableOpacity>
            </View>
            <DatePickerIOS
              style={style.picker}
              date={date}
              onDateChange={(date)=>this.onChange(moment(date).format('YYYY-MM-DD'))}
              mode={this.props.mode || 'date'}/>
          </View>
        </View>
      </Modal>
    )
  }
  shouldComponentUpdate(nextProps, nextState) {
    var should = (
      nextState.value !== this.state.value ||
      nextState.hasError !== this.state.hasError ||
      nextProps.options !== this.props.options ||
      nextProps.type !== this.props.type ||
        nextState.showPopup !== this.state.showPopup
    );
    return should;
  }

  getLocals(){
    let locals = super.getLocals();
    locals.help = this.props.options['help'];
    return locals;
  }

  render(){
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
        <View style={{flexDirection: 'row'}}>
          {label}
          <TouchableOpacity style={{flex: 1}} onPress={()=>{
            this.setState({
              value: this.state.value || moment().format("YYYY-MM-DD"),
              originValue: this.state.value,
              showPopup: true})
          }}>
            <Text style={textboxStyle}>{this.state.value}</Text>
          </TouchableOpacity>
        </View>
        {help}
        {error}
        {this.renderPopup()}
      </View>
    );
  }

}