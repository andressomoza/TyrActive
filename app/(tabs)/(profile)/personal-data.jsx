import { View, Text, SafeAreaView, Image, Alert, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FIREBASE_AUTH } from '../../../firebase-config';
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateProfile, updatePhoneNumber } from "firebase/auth";
import { RemoteInfoDatasource } from "../../../data/remote-info.datasource";
import {images} from '../../../constants/images';


import CustomButton from '../../../components/CustomButton'
import FormField from '../../../components/FormField'
import TopButtons from '../../../components/TopButtons'

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  phone: Yup.number("Debe introducir un número de teléfono válido").positive("Debe introducir un número de teléfono válido").integer("Debe introducir un número de teléfono válido").min(100000000, "Debe introducir un número de teléfono válido").max(999999999, "Debe introducir un número de teléfono válido").required('Requerido'),

})

const PersonalData = () => {
  const [datos, setDatos] = useState({});
  const [image, setImage] = useState(datos.photoUrl !== null ? datos.photoUrl : 'https://www.w3schools.com/w3images/avatar2.png');
  
  useEffect(() => {
    RemoteInfoDatasource.getDoc('users', FIREBASE_AUTH.currentUser.uid)
    .then((data) => {
      setDatos(data)
      setImage(data.photoUrl)
    });
  }, [])
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let info = { ...datos, photoUrl: result.assets[0].uri }
      setDatos(info);
      setImage(result.assets[0].uri);
    }
  }

  const handleChangeData = (values) => {
    RemoteInfoDatasource.updateUser('users', FIREBASE_AUTH.currentUser.uid, values.name, values.email, image, values.phone)
    
    Alert.alert('Actualización de datos', 'Se han actualizado los datos de tu perfil', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
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
            {datos.photoUrl !== undefined ? 
              <Image
                source={{uri: datos.photoUrl !== null ? datos.photoUrl : image}}
                style={{ width: 150, height: 150, borderRadius: 100 }}
              />
              :
              <View className="bg-secondary p-3 rounded-lg">
                <Text className="text-white font-msemibold">Seleccionar foto</Text>
              </View> }
            
          </TouchableOpacity>
          <View className="w-[90vw]">
            { datos.name !== undefined ?
            <>
              <Formik 
                initialValues={{ name: datos.name, email: datos.email, phone: datos.phone }}
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
            :
            <Text>Cargando...</Text>
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PersonalData