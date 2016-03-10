/**
 * Created by kevin on 16/3/4.
 */
import React,
{
  Component,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DatePickerAndroid,
  PropTypes
} from 'react-native'

import moment from 'moment'

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start'
  }
});

export default class extends Component{
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
    this._show = this._show.bind(this);
  }

  async _show(){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: moment(this.props.date, 'YYYY-MM-DD').toDate()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.props.onDateChange(moment({year, month, day}).format("YYYY-MM-DD"));
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render(){
    return (
      <TouchableOpacity style={[style.container, this.props.style]} onPress={this._show}>
        <View>
            <Text style={this.props.textStyle}>{this.props.date}</Text>
        </View>
      </TouchableOpacity>
      )
  }

}