/**
 * Created by kevin on 16/3/1.
 */
import React, {
  View,
  PropTypes,
  TouchableOpacity,
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


  render(){
    const date = this.state.date;
    return (
      <View style={[style.container, this.props.style]}>
        <TouchableOpacity onPress={()=>this.setState({show: true})}>
          <Text style={this.props.textStyle}>{this.props.date}</Text>
        </TouchableOpacity>

        <Modal
          visible={this.state.show}
          transparent={true}
          animated={true}>
          <View style={style.container}>
            <View style={style.dateBox}>
              <View style={style.buttonBox}>
                <TouchableOpacity style={style.button} onPress={this.handleConfirm}>
                  <Image source={require('./images/IconSelectCircle.png')}
                         style={style.buttonIcon}
                         resizeMode="contain"/>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={()=>{
                this.setState({show: false})
              }}>
                  <Image source={require('./images/IconClose.png')}
                         style={style.buttonIcon}
                         resizeMode="contain"/>
                </TouchableOpacity>
              </View>
              <DatePickerIOS
                style={style.picker}
                date={new Date(date)}
                onDateChange={(date)=>this.setState({date: moment(date).format('YYYY-MM-DD')})}
                mode={this.props.mode || 'date'}/>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

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
  picker: {}
});
