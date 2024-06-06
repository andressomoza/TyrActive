import { View, Text, SafeAreaView, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import Reac, { useState } from 'react'
import { FIREBASE_AUTH } from '../../../firebase-config';
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateProfile, updatePhoneNumber } from "firebase/auth";

import CustomButton from '../../../components/CustomButton'
import FormField from '../../../components/FormField'
import TopButtons from '../../../components/TopButtons'

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  phone: Yup.number("Debe introducir un número de teléfono válido").positive("Debe introducir un número de teléfono válido").integer("Debe introducir un número de teléfono válido").min(100000000, "Debe introducir un número de teléfono válido").max(999999999, "Debe introducir un número de teléfono válido").required('Requerido'),

})

const PersonalData = () => {
  const [image, setImage] = useState(FIREBASE_AUTH.currentUser.photoURL !== null ? FIREBASE_AUTH.currentUser.photoURL : 'https://www.w3schools.com/w3images/avatar2.png');
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
    console.log(result.assets[0].uri);
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleChangeData = (values) => {
    updateProfile(FIREBASE_AUTH.currentUser, {
      displayName: values.name,
      photoURL: image
    }).then(() => {
      console.log('Datos actualizados')
    }).catch((error) => {
      console.log(error)
    })
    updatePhoneNumber(FIREBASE_AUTH.currentUser, values.phone)
      .then(() => {
        console.log('Teléfono actualizado')
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(values)
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full items-center justify-center">
          <TopButtons
            title={"Datos personales"}  
          />
          <TouchableOpacity
            className="mt-5"
            onPress={pickImage}
          >
            <Image
              source={{uri: image}}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
          </TouchableOpacity>
          <View className="w-[90vw]">
            <>
              <Formik 
                initialValues={{ name: FIREBASE_AUTH.currentUser.displayName, email: FIREBASE_AUTH.currentUser.email, phone: FIREBASE_AUTH.currentUser.phoneNumber }}
                validationSchema={SignUpSchema}
                onSubmit={values => handleChangeData(values)}
                validateOnMount={true}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <FormField
                      placeholder="Nombre completo"
                      value={values.name}
                      handleChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      otherStyles="mt-7"
                    />
                    {errors.name && touched.name ? (<Text>{errors.name}</Text>) : null}

                    <FormField
                    placeholder="Correo electrónico"
                    value={values.email}
                    handleChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    otherStyles="mt-3"
                    />
                    {errors.email && touched.email ? (<Text>{errors.email}</Text>) : null}   

                    <FormField
                      placeholder="Número de teléfono"
                      value={values.phone}
                      handleChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      otherStyles="mt-3"
                    />
                    {errors.phone && touched.phone ? (<Text>{errors.phone}</Text>) : null}  

                    
                    <View className="w-full justify-center flex-row">
                      <CustomButton
                        title="Actualizar datos"
                        handlePress={handleSubmit}
                        containerStyles="w-[55vw] mt-10"
                      />
                    </View>
                  </>
                  
                )}
              </Formik>
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PersonalData