import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { Redirect, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../firebase-config'

import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { set } from 'firebase/database';

const SignUp1Schema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  surname: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  phone: Yup.number().positive().integer().required('Requerido'),
})

const SignUp2Schema = Yup.object().shape({
  birthday: Yup.string().required('Requerido'),
  weight: Yup.number().positive().required('Requerido'),
  height: Yup.number().positive().required('Requerido'),
  sex: Yup.string().required('Requerido'),
})

const SignUp3Schema = Yup.object().shape({
  password: Yup.string().required('Requerido'),
})

const SignUp = () => {
  const auth = FIREBASE_AUTH;
  const [step, setStep] = useState(1);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    birthday: '',
    weight: '',
    height: '',
    sex: '',
    password: '',
  })

  const handle1 = (values) => {
    let formulario = form;
    for(let key in values) {
      form[key] = values[key];
    }
    setForm(formulario);
    setStep(2);
  }
  const handle2 = (values) => {
    let formulario = form;
    for(let key in values) {
      formulario[key] = values[key];
    }
    setForm(formulario);
    setStep(3);
  }

  const handleSignUp = (values) => {
    console.log("entra")
    createUserWithEmailAndPassword(auth, form.email, values.password)
      .then((userCredential) => {
        console.log('User created');
        const user = userCredential.user;
        console.log(user);
        router.replace("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      {step === 1 && (
        <Formik 
          initialValues={{ name: form.name, surname: form.surname, email: form.email, phone: form.phone }}
          validationSchema={SignUp1Schema}
          onSubmit={values => handle1(values)}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <FormField
                placeholder="Nombre"
                value={values.name}
                handleChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                otherStyles="mt-7"
              />
              {errors.name && touched.name ? (<Text>{errors.name}</Text>) : null}

              <FormField
                placeholder="Apellidos"
                value={values.surname}
                handleChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                otherStyles="mt-3"
              />
              {errors.surname && touched.surname ? (<Text>{errors.surname}</Text>) : null}

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
              <View className="w-full justify-end flex-row">
                <CustomButton
                  title="Siguiente"
                  handlePress={handleSubmit}
                  containerStyles="w-[30vw] mt-10"
                />
              </View>
            </>
          )}
        </Formik>
      )}

      {step === 2 && (
        <Formik 
          initialValues={{ birthday: form.birthday, weight: form.weight, height: form.height, sex: form.sex }}
          validationSchema={SignUp2Schema}
          onSubmit={values => handle2(values)}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
            <FormField
              placeholder="Fecha de nacimiento"
              value={values.birthday}
              handleChangeText={handleChange('birthday')}
              onBlur={handleBlur('birthday')}
              otherStyles="mt-7"
            />
            {errors.birthday && touched.birthday ? (<Text>{errors.birthday}</Text>) : null}

            <View className="flex-row items-center justify-between mb-8">
              <FormField
                placeholder="Peso (kg)"
                value={values.weight}
                handleChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                otherStyles="mt-3 w-[40vw]"
              />
              {errors.weight && touched.weight ? (<Text>{errors.weight}</Text>) : null}

              <FormField
                placeholder="Estatura (cm)"
                value={values.height}
                handleChangeText={handleChange('height')}
                onBlur={handleBlur('height')}
                otherStyles="mt-3 w-[40vw]"
              />
              {errors.height && touched.height ? (<Text>{errors.height}</Text>) : null}
            </View>

            <Dropdown
              style={{ width: '100%', height: '16px', borderColor: '#9ca3af', borderWidth: 1, borderRadius: '16px', padding: 10, backgroundColor: 'white', color: '#9ca3af', fontSize: 16, marginTop: '8px'}}
              labelField="value"
              placeholder='Sexo'
              placeholderStyle={{ color: '#9ca3af', fontSize: 16 }}
              valueField="value"
              data={[
                { label: "Masculino", value: "Masculino" },
                { label: "Femenino", value: "Femenino" },
                { label: "Otro", value: "Otro" },
              ]}
              value={values.sex}
              onChange={item => handleChange('sex')(item.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              searchPlaceholder='Buscar...'
            />
            {errors.sex && touched.sex ? (<Text>{errors.sex}</Text>) : null}

            <View className="w-full justify-end flex-row">
              <CustomButton
                title="Anterior"
                handlePress={() => setStep(1)}
                containerStyles="w-[30vw] mt-10 bg-white border-2 border-secondary"
                textStyles="text-black"
              />
              <CustomButton
                title="Siguiente"
                handlePress={handleSubmit}
                containerStyles="w-[30vw] mt-10"
              />
            </View>
          </>
          )}
        </Formik>
      )}

      {step === 3 && (
        <Formik 
          initialValues={{ password: form.password, confirmPassword: ''}}
          validationSchema={SignUp3Schema}
          onSubmit={values => handleSignUp(values)}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
            <FormField
              placeholder="Contraseña"
              value={values.password}
              handleChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              otherStyles="mt-7"
              secureTextEntry
            />
            {errors.password && touched.password ? (<Text>{errors.password}</Text>) : null}

            <View className="w-full justify-end flex-row">
              <CustomButton
                title="Anterior"
                handlePress={() => setStep(2)}
                containerStyles="w-[30vw] mt-10 bg-white border-2 border-secondary"
                textStyles="text-black"
              />
              <CustomButton
                title="Registrarse"
                handlePress={handleSubmit}
                containerStyles="w-[30vw] mt-10"
              />
            </View>
          </>
          )}
        </Formik>
      )}
        
    </>
  );
};

export default SignUp;
