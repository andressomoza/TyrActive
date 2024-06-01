import { View, Text } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../firebase-config'

import { registerUser } from '../utils/reusable-functions';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUp1Schema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  phone: Yup.number("Debe introducir un número de teléfono válido").positive("Debe introducir un número de teléfono válido").integer("Debe introducir un número de teléfono válido").min(100000000, "Debe introducir un número de teléfono válido").max(999999999, "Debe introducir un número de teléfono válido").required('Requerido'),
  password: Yup.string().required('Requerido'),

})

const SignUp = () => {
  const auth = FIREBASE_AUTH;

  const handleSignUp = (values) => {
    registerUser(auth, values.email, values.password, values.name, values.phone)
  }

  return (
    <>
        <Formik 
          initialValues={{ name: '', email: '', phone: '', password: '' }}
          validationSchema={SignUp1Schema}
          onSubmit={values => handleSignUp(values)}
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

              <FormField
                placeholder="Contraseña"
                value={values.password}
                handleChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                otherStyles="mt-3"
                secureTextEntry
              />
              {errors.password && touched.password ? (<Text>{errors.password}</Text>) : null}
              
              <View className="w-full justify-center flex-row">
                <CustomButton
                  title="Completar registro"
                  handlePress={handleSubmit}
                  containerStyles="w-[55vw] mt-10"
                />
              </View>
            </>
          )}
        </Formik> 
    </>
  );
};

export default SignUp;
