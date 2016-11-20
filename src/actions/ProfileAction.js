import _ from 'lodash';
import firebase from 'firebase';
import {
  GET_USER_GROUP
} from './types';

//talk to database and get user group
export function getUserGroup() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users`)
      .once('value', snapshot => {
        var userData = _.values(snapshot.val());
        for (var i = 0; i < userData.length; i++) {
          if (userData[i].email === currentUser.email) {
            dispatch({
              type: GET_USER_GROUP,
              payload: userData[i]
            });
          };
        };
      });
  };
};