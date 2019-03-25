// In /utils/firebase.js
// We should import firebase from this module instead of the default package.
import * as firebase from 'firebase'  // Should not be used elsewhere in the project
import { senderID, fireKey, fireDomain, database, project, bucket } from "react-native-dotenv";
let config = {
    apiKey: fireKey,
    authDomain: fireDomain,
    databaseURL: database,
    projectId: project,
    storageBucket: bucket,
    messagingSenderId: senderID
};
firebase.initializeApp(config);

export default firebase;