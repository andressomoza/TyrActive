import { Alert } from 'react-native';
import { router } from "expo-router";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE } from '../firebase-config'
export const registerUser = (auth, email, password, name, phone) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User created')
      const user = userCredential.user;
      console.log(user)
      const docRef = doc(FIRESTORE, "users", user.uid);
      let form = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        id: user.uid
      }
      setDoc(docRef, form);
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.log(error.message)
        });
        Alert.alert('Registro', 'Se le ha enviado un email de verificación', [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        updateProfile(auth.currentUser, {
          displayName: name, phoneNumber: phone
        }).catch((error) => {console.log(error.message)})
        console.log(auth.currentUser)
      router.navigate("/")
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export const signInUser = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      if (!user.emailVerified) {
        console.log('Email no verificado')
        Alert.alert('Verificación', 'Compruebe su correo electrónico para verificar su cuenta', [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        auth.signOut().then(() => {
          console.log('Sesion cerrada')
        })
      } else {
        console.log('¡SESIÓN INICIADA!', user)
        router.navigate("/home");
      }
    }
    )
    .catch((error) => {
      console.log(error.code)
      if (error.code === 'auth/invalid-credential') {
        setError('Contraseña incorrecta')
      } else if (error.code === 'auth/invalid-email') {
        setError('Email incorrecto')
      }
    })
}

export const forgotPassword = (auth, email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('Email enviado')
    Alert.alert('Recuperación de contraseña', 'Se le ha enviado un email para recuperar su contraseña', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ])
    router.navigate("/");
  })
  .catch((error) => {
    console.log(error.message)
  });
}