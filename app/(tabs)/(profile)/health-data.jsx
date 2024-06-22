import { View, Text, SafeAreaView, Alert } from 'react-native'
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react'
import FormField from '../../../components/FormField';
import { getAuth } from 'firebase/auth';
import { RemoteInfoDatasource } from "../../../data/remote-info.datasource";
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomButton from '../../../components/CustomButton';
import TopButtons from '../../../components/TopButtons'
const HealthData = () => {
  const [user, setUser] = useState({})

  const healthSchema = Yup.object().shape({
    weight: Yup.number().required('Requerido'),
    height: Yup.number().required('Requerido'),
    allergies: Yup.string().required('Requerido')
  })

  useEffect(() => {
    RemoteInfoDatasource.getDoc('users', getAuth().currentUser.uid)
    .then((data) => {
      setUser(data)
    });
  }, [])

  const updateHealthData = (values) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  console.log('Actualizar datos de salud', values);

  // Crear un objeto para el peso y la altura que incluya la fecha
  let newWeight = user.weight ? [...user.weight, { value: parseFloat(values.weight), date: formattedDate }] : [{ value: parseFloat(values.weight), date: formattedDate }];
  let newHeight = user.height ? [...user.height, { value: parseFloat(values.height), date: formattedDate }] : [{ value: parseFloat(values.height), date: formattedDate }];
    RemoteInfoDatasource.updateHealthData(getAuth().currentUser.uid, newWeight, newHeight, values.allergies)

    Alert.alert('Actualización de datos', 'Se han actualizado los datos de salud', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <SafeAreaView className="items-center">
      <TopButtons title={"Datos de salud"}/>
      {user.height !== undefined 
      ?
      <View className="w-[90vw] mt-3 bg-orange-200 p-4 rounded-3xl">
        <Text className="font-msemibold text-lg">Última altura: <Text className="font-mregular text-base">{user.height && user.height[user.height.length - 1].value} cm, {user.height[user.height.length - 1].date}</Text></Text>
        <Text className="font-msemibold text-lg">Último peso: <Text className="font-mregular text-base">{user.weight && user.weight[user.weight.length - 1].value} kg, {user.weight[user.weight.length - 1].date}</Text></Text>
        
        <View className="mt-4">
          {user.allergies !== undefined ?
          <>
            <Formik 
          initialValues={{ weight: '', height: '', allergies: user.allergies}}
          validationSchema={healthSchema}
          onSubmit={values => updateHealthData(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View className="flex-row justify-between">
                <FormField
                  placeholder={"Peso"}
                  value={values.weight}
                  handleChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  keyboardType="numeric"
                  otherStyles={"w-36"}
                  title="Nueva peso"
                />
                {errors.weight && touched.weight ? (<Text>{errors.weight}</Text>) : null}

                <FormField
                  value={values.height}
                  placeholder={"Altura"}
                  handleChangeText={handleChange('height')}
                  onBlur={handleBlur('height')}
                  keyboardType="numeric"
                  otherStyles={"w-36"}
                  title="Nueva altura"
                />
                {errors.height && touched.height ? (<Text>{errors.height}</Text>) : null}
              </View>
              <FormField
                placeholder={"Datos de alergias"}
                value={values.allergies}
                handleChangeText={handleChange('allergies')}
                onBlur={handleBlur('allergies')}
                keyboardType="default"
                title="Alergias"
              />
              {errors.allergies && touched.allergies ? (<Text>{errors.allergies}</Text>) : null}
              <View className="w-full items-center">
                <CustomButton
                  title="Actualizar datos"
                  handlePress={handleSubmit}
                  containerStyles="w-[45vw] mt-10"
                />
              </View>
            </>
          )}
        </Formik>
          </> : <Text>Cargando...</Text>
          }
        
        </View>
      </View>
      :
      <Text>Cargando...</Text>}
      
    </SafeAreaView>
  )
}

export default HealthData