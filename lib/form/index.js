/**
 * Created by kevin on 16/1/5.
 */
import t from 'tcomb-form-native'
import stylesheet from './stylesheets/flat'
import templates from './templates/flat'
import i18n from './i18n/zh'
import edit from './edit'

t.form.Form.templates = templates;
t.form.Form.stylesheet = stylesheet;
t.form.Form.i18n = i18n;

t.form.Form.defaultProps = {
  templates: t.form.Form.templates,
  stylesheet: t.form.Form.stylesheet,
  i18n: t.form.Form.i18n
};
module.exports = {
  stylesheet,
  templates,
  i18n,
  edit,
};