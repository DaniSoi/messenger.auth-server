const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { userModel } = require('../models');
const { SMTP_USER, CLIENT_ORIGIN } = require('../config');
const emailService = require('./email-service');

async function register (userDetails) {
  const { password, email } = userDetails;
  try {
    const alreadyExistsUser = await userModel.findUserByEmail(email);
    if (alreadyExistsUser) return { error: 'Email already exists.' };

    userDetails.hashedPassword = await bcrypt.hash(password, 10);
    delete userDetails.password;

    const result = await userModel.addUser(userDetails);
    const token = crypto.randomBytes(10).toString('hex');
    await userModel.saveVerifyToken(token, result._id);

    // send confirmation email, and send a response to client
    // without waiting for the email to be sent
    sendConfirmEmail(result.email, result.firstName, token)
      .catch(() => {});

    return {
      user: {
        name: result.firstName,
        email: result.email,
        uid: result._id
      }
    }
  } catch (e) {
    console.error('user service - register, rethrowing: ', e);
    throw e;
  }
}

async function sendConfirmEmail (email, firstName, token) {
  try {
    const confirmUrl = `${CLIENT_ORIGIN}/confirm/${token}`;
    const emailTemplate = {
      from: SMTP_USER,
      to: email,
      subject: 'RE: Confirm your new account in Messenger App',
      html: createConfirmHTML(token, firstName, confirmUrl),
      text: `Please verify your account:\n${confirmUrl}`
    };

    await emailService.sendEmail(emailTemplate);
  } catch (e) {
    console.error('user service - sendConfirmEmail, rethrowing: ', e);
  }
}

const createConfirmHTML = (token, firstName, confirmUrl) => (
  `
<div>
<p>Hello ${firstName},<br/>
Thank you for your registration to Messenger App.<br/>
Please verify your account:</p>
<br/><br/>
<a href="${confirmUrl}"
style="
   text-decoration: none;
   cursor: pointer; 
   padding: 1em; 
   border: none;
   border-radius: 5px;
   background-color: dodgerblue;
   color: white;
   font-weight: 600"
>
Click to verify
</a>
<br/><br/>
</div>
`
);

async function confirmUser (token) {
  try {
    const result = await userModel.findUidByVerifyToken(token);
    if (!result) return { error: 'Invalid token.' };

    const user = await userModel.findUserById(result.userId);
    if (user.isVerified) return { error: 'User is already verified.' };

    await userModel.confirmUser(user._id);

    return { user: { uid: user._id } };
  } catch (e) {
    console.error('user service - confirmUser - rethrowing error: ', e);
    throw e;
  }
}

async function getUserById (uid) {
  try {
    const user = await userModel.findUserById(uid);
    if (!user) return { error: 'User id was not found.' };

    return {
      user: {
        name: user.firstName,
        email: user.email,
        uid: user._id
      }
    }
  } catch (e) {
    console.error('user service - getUserById - rethrowing error: ', e);
    throw e;
  }
}

async function getUsersGroupByIds (ids) {
  try {
    const users = await userModel.findManyUsersByIds(ids);
    if (!users.length) return { error: 'Users not found.' };

    return { users };
  } catch (e) {
    console.error('user service - getUserById - rethrowing error: ', e);
    throw e;
  }
}

async function getUsersGroup ({ ids, emails }) {
  try {
    const users = ids ?
      await userModel.findManyUsersByIds(ids) :
      await userModel.findManyUsersByEmails(emails);
    if (!users.length) return { error: 'Users not found.' };

    return { users };
  } catch (e) {
    console.error('user service - getUserById - rethrowing error: ', e);
    throw e;
  }
}

module.exports = {
  register,
  getUserById,
  getUsersGroup,
  confirmUser,
};
