export const loginBundle = {
    login: {
        //==== login form view ====//
        title: 'Nokia Car2X',
        version: 'version 1.5.7',
        loginForm_readOnly: 'Read only access',
        loginForm_footer: 'You are about to access a private system. This system is for the use of authorized users only. '
        + 'All connections are logged. '
        + 'Any unauthorized access or attempts may be punished to the fullest extent possible under the application local legislation.',
        loginForm_submit: 'Log In',
        loginForm_cancel: 'Cancel',
        loginForm_showAdvance: 'Show advanced settings',
        //==== change password form view ====//
        changePwd_rules: 'Password rules',
        changePwd_length_rule: '1. Min. 8 and max. 128 characters.',
        changePwd_number_rule: '2. At least two numbers.',
        changePwd_nonAlpha_rule: '3. At least one non-alphanumeric character.',
        changePwd_uppcase_rule: '4. Both upper and lower case characters.',
        changePwd_consecutive_rule: '5. No two same characters consecutively.',
        changePwd_notAllowed_rule: '6. Following characters are not allowed from 7-bit US ASCII:',
        changePwd_notAllowed_control: '• control = &lt;US-ASCII coded characters 00-1F and 7F hexadecimal&gt;',
        changePwd_notAllowed_space: '• space = &lt;US-ASCII coded character 20 hexadecimal&gt;',
        changePwd_notAllowed_delimiter: '• delimiter = "&lt;" | "&gt;" | ""Fr"',
        changePwd_notAllowed_unwiser: '• unwise = "{{\'{\'}}" | "{{\'}\'}}" | "|" | "\" | "^" | "`"',
        changePwd_notAllowed_colon: '• colon = ":"',
        changePwd_notAllowed_other: 'All other characters are allowed from 7-bit US ASCII.',
        changePwd_submit: 'Change',
        changePwd_cancel: 'Cancel',

        //==== read only view ====//
        readOnly_submit: 'Connect',
        readOnly_cancel: 'Cancel',

        //==== Login failed messages ===//
        userNameLengthError: 'At least {0} and at most {1} characters for User Name.',
        passwordLengthError: 'Min. {0} and max. {1} characters for Password.',
        userNamePasswordSameError: 'Password should not be same as user name.',
        newOldPasswordSameError: 'New password should not be same as existing password.',
        newConfirmPasswordNotSameError: 'New password and confirmed password do not match.',
        connectionError: 'Unexpected error: {0}.',
        invalidLogin: 'Username or password is wrong.',
        timeOut: 'BTS did not response within expected time, try to connect later.',
        executionError: 'Unexpected error.',
        writeAccessReserved: 'User "{0}" with write access rights already logged in from address {1}. ',
        writeAccessReserved_title: 'Cannot connect with write access rights',
        writeAccessReserved_action: 'Do you want to connect with read only access rights?',
        tooManyFailedLogins: 'Too many failed logins, try to connect later.',
        loginDelayActive: 'Access denied due to pending login delay, try to connect later.',
        passwordExpired: 'Your password has expired. Please contact network administrator.',
        passwordExpiredChangePassword: 'Your password has expored. Please change it.',
        restrictedLoginPeriod: 'BTS has started up after reset and a restricted login period is active for 30 seconds, try to connect later.',
        blockedByCnum: 'BTS local account is blocked, contact network administrator.',
        accountInactive: 'BTS local account is inactive, contact network admininstrator.',
        passwordNotSet: 'Password is not set for this account, contact network administrator.',
        profileNotFetched: 'Role cannot be fetched for this account, contact network adminstrator.',
        exceedMaxNum: 'Maximum number of users reached.',
        invalidFormat: 'Format of the password is wrong.',
        unknown: 'Unknown login response.'
    }
};
