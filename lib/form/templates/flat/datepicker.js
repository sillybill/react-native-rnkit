import React from 'react'
import { View, Text, DatePickerIOS, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';

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
    color: '#ffffff',
  },
  picker: {
  }
});

class DateEdit extends React.Component{
  constructor(props: any){
    super(props);
    this.state = {showPopup:  false};
    this.renderPopup = this.renderPopup.bind(this);
  }

  renderPopup(){
    return (
      <Modal
        visible={this.state.showPopup}
        transparent={true}
        animationType="slide"
      >
        <View style={style.container}>
          <View style={style.dateBox}>
            <View style={style.buttonBox}>
              <TouchableOpacity style={style.button} onPress={()=>this.setState({showPopup: false})}>
                <Image source={{uri: 'IconClose', static: true}}
                       style={style.buttonIcon}
                       resizeMode="contain"/>
              </TouchableOpacity>
            </View>
            <DatePickerIOS {...this.props}/>
          </View>
        </View>
      </Modal>
    )
  }

  render(){
    const textboxStyle = this.props.style;
    return (
      <View>
        <TouchableOpacity style={{flex: 1}} onPress={()=>this.setState({showPopup: true})}>
          <Text style={textboxStyle}>{this.props.date}</Text>
        </TouchableOpacity>
        {this.renderPopup()}
      </View>
    );
  }

}
function datepicker(locals) {

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var datepickerStyle = stylesheet.textbox.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    datepickerStyle = stylesheet.textbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  var error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

  return (
    <View style={formGroupStyle}>
      {label}
      <DateEdit
        ref="input"
        maximumDate={locals.maximumDate}
        minimumDate={locals.minimumDate}
        minuteInterval={locals.minuteInterval}
        mode={locals.mode}
        timeZoneOffsetInMinutes={locals.timeZoneOffsetInMinutes}
        style={datepickerStyle}
        onDateChange={(value) => locals.onChange(value)}
        date={locals.value}
      />
      {help}
      {error}
    </View>
  );
}

module.exports = datepicker;