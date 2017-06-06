/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { FormInput } from 'components/Form';
import RaisedButton from 'material-ui/RaisedButton';
import { t } from 'i18n';
import Style from 'styles';
import selector from '../selector';
import { actionCreator } from '../reducer';

type Props = {
  changePassword: (newPassword: string, oldPassword: string) => void,
  clearFormError: (field: string) => void,
  formError: { password?: string, oldPassword?: string },
}

class ChangePassEditorContainer extends React.Component {
  props: Props
  state: {
    oldPassword: string,
    password: string,
    repeatPassword: string,
  } = {
    oldPassword: '',
    password: '',
    repeatPassword: '',
  }

  onFieldUpdate = (value: string, type: string) => {
    this.props.clearFormError(type);
    this.setState({ [type]: value });
  }

  saveForm = () => {
    this.props.changePassword(this.state.password, this.state.oldPassword);
    this.setState({
      oldPassword: '',
      password: '',
      repeatPassword: '',
    });
  }

  render() {
    return (
      <div>
        <p style={styles.title}>{t('auth.title.resetPass')}</p>
        <FormInput
          floatingLabelText={t('auth.form.oldPasswordLabel')}
          type="oldPassword"
          onChange={this.onFieldUpdate}
          value={this.state.oldPassword}
          fullWidth
          secureTextEntry
          errorText={this.props.formError.oldPassword}
        />
        <FormInput
          floatingLabelText={t('auth.form.newPasswordLabel')}
          type="password"
          onChange={this.onFieldUpdate}
          value={this.state.password}
          fullWidth
          secureTextEntry
          errorText={this.props.formError.password}
        />
        <FormInput
          floatingLabelText={t('auth.form.repeatNewPasswordLabel')}
          type="repeatPassword"
          onChange={this.onFieldUpdate}
          value={this.state.repeatPassword}
          fullWidth
          secureTextEntry
        />
        <div style={styles.btnRow}>
          <RaisedButton
            label={t('auth.form.saveBtn')}
            onTouchTap={this.saveForm}
            primary
          />
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    fontSize: Style.Dimens.font.large,
  },
  btnRow: {
    ...Style.Flex.rootRow,
    justifyContent: 'flex-end',
  },
};

const mapStateToProps = (state) => {
  return {
    ...selector.changePasswordSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (newPassword, oldPassword) => (
      dispatch(actionCreator.changePassword(newPassword, oldPassword))
    ),
    clearFormError: (field: string) => dispatch(actionCreator.clearChangePasswordError(field)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassEditorContainer);
