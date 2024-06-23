import { View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router';
import { getAuth } from "firebase/auth";
import { RemoteInfoDatasource } from "../../../data/remote-info.datasource";
import { useIsFocused } from '@react-navigation/native';

import TopButtons from '../../../components/TopButtons'
import CustomButton from '../../../components/CustomButton'

const SubscriptionDetails = () => {
  const params = useLocalSearchParams();
  const [usuario, setUsuario] = useState({})
  const [tarifa, setTarifa] = useState({})
  const [solicitada, setSolicitada] = useState(false)
  const { name, price, carac } = params;
  let caracArray = carac.split(',');

  useEffect(() => {
    RemoteInfoDatasource.getDoc('users', getAuth().currentUser.uid)
    .then((data) => {
      setUsuario(data)
      setTarifa(data.tarifa ? data.tarifa : null)
    });

    RemoteInfoDatasource.getCollection('peticiones')
    .then((response) => {
      response.forEach((peticion) => {
        if (peticion.usuarioId === getAuth().currentUser.uid && peticion.tarifa === name) {
          setSolicitada(true)
        }
      })
    })
  }, [tarifa, solicitada])

  const contratada = () => {
    const peticion = {
      tarifa: name,
      usuarioId: getAuth().currentUser.uid,
      usuario: usuario.name,
    }
    setSolicitada(true)
    RemoteInfoDatasource.addDoc('peticiones', peticion)
  }

  return (
    <SafeAreaView>
      <TopButtons title={name}/>
      <View className="justify-center m-3">
        <Text className="font-mregular mt-3">Los detalles de esta tarifa son:</Text>
        <View className="bg-orange-200 rounded-3xl mt-3">
          <Text className="font-mbold text-xl pl-5 pt-4">{name}</Text>
          <View className="pl-5">
            <Text className="font-mregular text-lg mt-2">Características:</Text>
            {caracArray.map((caracteristica, index) => (
              <Text key={index} className="font-mregular ml-4 mb-1"> • {caracteristica}</Text>
            ))}
          </View>
          <View className="items-end">
            <Text className="font-mbold text-2xl mt-5 p-3">{price} €/mes</Text>
          </View>
        </View>
        <View className="justify-center items-center mt-3">
          { tarifa !== null && tarifa === name ?
            <Text className="font-mregular">Actualmente tiene esta tarifa contratada</Text>
            :
            solicitada === false ?
            <CustomButton
              title={"Contratar esta"}
              handlePress={contratada}
              containerStyles={"w-40"}
            />
            : <Text className="font-mregular">Ya ha solicitado esta tarifa</Text>
          }
           
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default SubscriptionDetails