import { View, Text, Pressable, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../firebase-config'
import { Dropdown } from 'react-native-element-dropdown';
import { registerUser } from '../utils/reusable-functions';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp1Schema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  phone: Yup.number().positive().integer().required('Requerido'),
})

const SignUp2Schema = Yup.object().shape({
  birthday: Yup.string().required('Requerido'),
  weight: Yup.number().typeError('El peso debe ser un número').positive('El peso no puede ser menor que 0').required('Requerido'),
  height: Yup.number().typeError('La altura debe ser un número').positive('La altura no puede ser menor que 0').required('Requerido'),
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
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [form, setForm] = useState({
    name: '',
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
    console.log(formulario.email)
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
    console.log("pressed")
    console.log(showPicker)
  }

  const onChangeDate = ({type}, selectedDate) => {
    if(type === 'set') {
      const currentDate = selectedDate
      setDate(currentDate)
      if (Platform.OS === 'android') {
        toggleDatePicker()
        setDateOfBirth(currentDate.toDateString())
        console.log("hola")
        setFieldValue('birthday', currentDate);
      }
    } else {
      toggleDatePicker()
    }
  }

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString())
    toggleDatePicker()
  }

  const handleSignUp = (values) => {
    let formulario = form;
    for(let key in values) {
      formulario[key] = values[key];
    }
    registerUser(auth, form)
  }

  return (
    <>
      {step === 1 && (
        <Formik 
          initialValues={{ name: form.name, email: form.email, phone: form.phone }}
          validationSchema={SignUp1Schema}
          onSubmit={values => handle1(values)}
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
              <View className="w-full justify-around flex-row">
                <View className="w-[30vw]"></View>
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
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChangeDate}
              />
            )}

            {showPicker && Platform.OS === 'ios' && (
              <View className="flex-row justify-around">
                <TouchableOpacity onPress={toggleDatePicker}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { confirmIOSDate(); setFieldValue('birthday', dateOfBirth); }}>
                  <Text>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}
            <Pressable onPress={toggleDatePicker}>
            <FormField
              placeholder="Fecha de nacimiento"
              value={values.birthday}
              handleChangeText={handleChange('birthday')}
              onBlur={handleBlur('birthday')}
              otherStyles="mt-7"
              editable={false}
              onPressIn={toggleDatePicker}
            />
            </Pressable>
            {errors.birthday && touched.birthday ? (<Text>{errors.birthday}</Text>) : null}

            <View className="flex-row items-center justify-between mb-8">
              <View className="flex-col">
                <FormField
                  placeholder="Peso (kg)"
                  value={values.weight}
                  handleChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  otherStyles="mt-3 w-[40vw]"
                />
                {errors.weight && touched.weight ? (<Text>{errors.weight}</Text>) : null}
              </View>
              <View className="flex-col">
                <FormField
                  placeholder="Estatura (cm)"
                  value={values.height}
                  handleChangeText={handleChange('height')}
                  onBlur={handleBlur('height')}
                  otherStyles="mt-3 w-[40vw]"
                />
                {errors.height && touched.height ? (<Text>{errors.height}</Text>) : null}
              </View>
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

            <View className="w-full justify-around flex-row">
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

            <View className="w-full justify-around flex-row">
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
