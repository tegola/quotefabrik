import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default firebase .initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'quotefabrik.firebaseapp.com',
  databaseURL: 'https://quotefabrik.firebaseio.com',
  projectId: 'quotefabrik',
  storageBucket: 'quotefabrik.appspot.com',
  messagingSenderId: '858466584708',
  appId: '1:858466584708:web:13b73a5f8045cf2eb7dad1'
})

const db = firebase.firestore()
const auth = firebase.auth()
const user = auth.currentUser

// https://dev.to/gautemeekolsen/vue-guard-routes-with-firebase-authentication-f4l
const getUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
  })
}

export {
  db,
  auth,
  user,
  getUser
}
