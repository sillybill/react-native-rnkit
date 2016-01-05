/*

  a bootstrap like style

*/
'use strict';

var LABEL_COLOR = '#101010';
var INPUT_COLOR = '#303030';
var ERROR_COLOR = '#a94442';
var HELP_COLOR = '#999999';
var BORDER_COLOR = '#c6c6c6';
var DISABLED_COLOR = '#777777';
var DISABLED_BACKGROUND_COLOR = '#eeeeee';
var FONT_SIZE = 16;
var FONT_WEIGHT = 'normal';

var stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: BORDER_COLOR,
    },
    error: {
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: BORDER_COLOR,
    }
  },
  controlLabel: {
    normal: {
      textAlign: 'left',
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      fontWeight: FONT_WEIGHT,
      width: 100,
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      fontWeight: FONT_WEIGHT,
      width: 100,
    }
  },
  controlIcon: {
    normal: {
      width: 10,
      height: 10,
      borderColor: 'red',
      borderWidth: 1,
      resizeMode: 'stretch',
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: 13,
      fontStyle: 'italic',
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: 13,
      fontStyle: 'italic',
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textbox: {
    normal: {
      flex: 1,
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 22,
      alignItems: 'center',
    },
    // the style applied when a validation error occours
    error: {
      flex: 1,
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 22,
      alignItems: 'center',
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 3,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      color: INPUT_COLOR,
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      marginBottom: 4
    }
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  }
});

module.exports = stylesheet;
