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
  user: { username?: string, email?: string },
  updateAccount: (user: Object) => void,
  clearFormError: (field: string) => void,
  updateError: { email?: string, username?: string },
}

class ProfileEditorContainer extends React.Component {
  props: Props
  state: {
    username: string,
    email: string,
  } = {
    username: this.props.user.username || '',
    email: this.props.user.email || '',
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.user.username !== this.props.user.username) {
      this.setState({ username: newProps.user.username });
    }
    if (newProps.user.email !== this.props.user.email) {
      this.setState({ email: newProps.user.email });
    }
  }

  onFieldUpdate = (value: string, type: string) => {
    this.props.clearFormError(type);
    this.setState({ [type]: value });
  }

  saveForm = () => {
    this.props.updateAccount({
      email: this.state.email,
      username: this.state.username,
    });
  }

  render() {
    return (
      <div>
        <p style={styles.title}>{t('auth.title.account')}</p>
        <FormInput
          floatingLabelText={t('auth.form.usernameLabel')}
          type="username"
          onChange={this.onFieldUpdate}
          value={this.state.username}
          fullWidth
          errorText={this.props.updateError.username}
        />
        <FormInput
          floatingLabelText={t('auth.form.emailLabel')}
          type="email"
          onChange={this.onFieldUpdate}
          value={this.state.email}
          fullWidth
          errorText={this.props.updateError.email}
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
    ...selector.accountSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: user => dispatch(actionCreator.updateAccount(user)),
    clearFormError: field => dispatch(actionCreator.clearUpdateAccountError(field)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileEditorContainer);
