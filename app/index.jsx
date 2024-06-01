import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { router,Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {images} from '../constants'
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
    const { isLoading, isLoggedIn} = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <Text className="text-black text-3xl font-mblack">TyrActive</Text>
                    <Image source={images.logo}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"/>

                    <View className="relative mt-5 items-center">
                        <Text className="text-3xl text-black font-mbold text-center">¡Bienvenido/a a tu nuevo estilo de vida!</Text>
                        <Text className="text-sm mt-7 font-msemibold text-black text-center w-[60vw]">Logra tus objetivos de de fitness con nuestro apoyo</Text>
                    </View>
                    
                    <CustomButton
                        title="Comenzar"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-[60vw] mt-7"/>

                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light" />

        </SafeAreaView>
    );
}

