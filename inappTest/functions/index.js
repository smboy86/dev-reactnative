const functions = require('firebase-functions');

const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.createUserInDatabase = functions.auth.user().onCreate(async user => {
  const email = user.email;

  try {
    const snapshot = await admin
      .firestore()
      .collection('user-functions')
      .add({
        email: email,
        uid: user.uid,
      });
    return snapshot;
  } catch (error) {
    console.log(error);
    return error;
  }
});
