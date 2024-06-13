import React, { useState, useEffect} from 'react'
import { SafeAreaView, FlatList, ScrollView, Text, View } from 'react-native';
import { getAuth } from "firebase/auth";
import { RemoteInfoDatasource } from "../../../data/remote-info.datasource";
import { Redirect, router } from "expo-router";
import { useIsFocused } from '@react-navigation/native';

import TopButtons from '../../../components/TopButtons'
import SubscriptionCard from '../../../components/SubscriptionCard'

const Subscripcion = () => {
  const isFocused = useIsFocused();
  const [tarifas, setTarifas] = useState([])
  const [usuario, setUsuario] = useState({})
  const [contratada, setContratada] = useState([])

  const auth = getAuth();
  
  useEffect(() => {
    if (isFocused) {
    RemoteInfoDatasource.getDoc('users', auth.currentUser.uid)
    .then((data) => {
      setUsuario(data)
    })  
  }
  }, [isFocused])
  
  useEffect(() => {
    RemoteInfoDatasource.getTarifasSuscripcion()
    .then((data) => {
      let aMostrar = data.filter((tarifa) => tarifa.nombre !== usuario.tarifa)
      let tarifaUsuario = data.filter((tarifa) => tarifa.nombre === usuario.tarifa)
      setTarifas(aMostrar)
      setContratada(tarifaUsuario)
    }).catch((error) => {
      console.log("Error", error)
    })
  }, [usuario]);

  const renderItem = ({ item }) => (
    <View className="w-full items-center justify-center">
    <SubscriptionCard 
      nombre={item.nombre} 
      precio={item.precio}
      caracteristicas={item.caracteristicas}
      handlePress={() => {
        router.push({ pathname: 'subscription-details', params: { name: item.nombre, price: item.precio, carac: item.caracteristicas } })}}
        
    />
    </View>
  );

  headerComponent = () => {
    return (
      <View className="items-center justify-center">
        <Text className="font-mregular mb-3">Actualmente usted cuanta con la siguiente suscripción</Text>
        { usuario.tarifa && contratada.length !== 0 ? 
          <SubscriptionCard 
            nombre={contratada[0].nombre} 
            precio={contratada[0].precio}
            caracteristicas={contratada[0].caracteristicas}
          />
          :
          <View className="m-5">
            <Text className="font-mregular">No tiene</Text>
          </View>

        }
        <Text className="font-mregular mb-2">También disponemos de estas tarifas:</Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
        <TopButtons
          title={"Mi suscripción"}  
        />
        <View className="w-full items-center justify-center mt-4"> 
            <FlatList
              data={tarifas}
              renderItem={renderItem}
              ListHeaderComponent={headerComponent}
              keyExtractor={item => item.id}
            />
          </View>
    </SafeAreaView>
  );
};


export default Subscripcion;