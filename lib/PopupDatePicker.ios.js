/**
 * Created by kevin on 16/3/1.
 */
import React, {PropTypes} from 'react'
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Modal,
  Image,
  DatePickerIOS,
} from 'react-native'

import moment from 'moment'

export default class extends React.Component{
  static propTypes = {
    date: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    textStyle: PropTypes.object
  };

  static defaultProps = {
    onDateChange: ()=>{},
    style: {},
    textStyle: {}
  };

  constructor(props: any){
    super(props);
    this.state = {
      show: false,
      date: this.props.date
    };

    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm(){
    this.setState({show: false}, ()=>{
      this.props.onDateChange(this.state.date);
    })
  }


  renderPopup() {
    let date = new Date(this.state.date);
    return (
      <Modal
        visible={this.state.show}
        transparent={true}
        animationType="slide">
        <View style={styles.modalBackgroundStyle}>
          <TouchableWithoutFeedback onPress={()=>this.setState({show: false})}>
            <View style={{flex: 1}}></View>
          </TouchableWithoutFeedback>
          <View style={styles.container}>
            <View style = {styles.toolbar}>
              <TouchableOpacity style = {styles.button} onPress = {()=>this.setState({show: false})}>
                <Image source={require('./images/cancel.png')} style={styles.buttonIcon}/>
              </TouchableOpacity>
              <View style={styles.title}>
                <Text style={styles.titleText}>{this.props.title || '选择日期'}</Text>
              </View>
              <TouchableOpacity style = {styles.button} onPress = {this.handleConfirm}>
                <Image source={require('./images/return.png')} style={styles.buttonIcon}/>
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


  render(){
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity onPress={()=>this.setState({show: true})}>
          <Text style={this.props.textStyle}>{this.props.date}</Text>
        </TouchableOpacity>

        {
          this.renderPopup()
        }
      </View>
    )
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

