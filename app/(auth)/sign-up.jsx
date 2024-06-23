import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import SignUpForm from '../../components/SignUpForm';

const SignUp = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full h-full px-7 mt-4">
        <View>
          <Text className="text-3xl font-mextrabold text-left text-black w-full">Crea tu cuenta</Text>
          <Text className="text-black font-mregular text-base">Completa el siguiente formulario para poder registrarte en la aplicación</Text>
        </View>

        <SignUpForm />

      </View>
    </SafeAreaView>
  );
};

export default SignUp;
