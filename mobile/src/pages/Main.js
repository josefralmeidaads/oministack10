import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect}from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main(){

    const initialRegion = {
        latitude: -37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

    const [currentRegion, setcurrentRegion] = useState(null);
    useEffect(() => {
        async function loadInitialPosition(){ // carregar a posição inicial do mapa 
            const { granted } = await requestPermissionsAsync();

            if (granted){// se o usuário permitiu o app pegar sua localização
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                
                const { latitude, longitude } = coords;

                setcurrentRegion({
                    latitude, 
                    longitude,
                    latitudeDelta: 0.01, // Informação de zoom baseado em calculos navais
                    longitudeDelta: 0.01 // Informação de zoom baseado em calculos navais
                })
            }
        }

        loadInitialPosition();

    }, []);

    if(!currentRegion){ // enquanto minha posição for nula retorne nulo
        return null
    }

    console.log(currentRegion);

    return (
        //View tem que ser importada para gerar visualição da tela
        <MapView  initialRegion={{latitude: -21.216415, longitude: -42.888200, latitudeDelta:0.01, longitudeDelta:0.01}} style={styles.map}>
            <Marker coordinate={{latitude: -21.216458, longitude: -42.888164}}>
                <Image style={styles.avatar} source={{uri: 'https://avatars1.githubusercontent.com/u/69639482?s=460&u=16ce5200e0562f44d5e8059ad80ed7d0f03fc9de&v=4'}}/>
                <Callout>
                    <View style={styles.callout}> 
                        <Text style={styles.DevName}>José Francisco</Text>
                        <Text style={styles.DevBio}>Biografia</Text>
                        <Text style={styles.DevTechs}>React, React Native, NodeJS</Text>
                    </View>
                </Callout>
            </Marker>
         </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        borderRadius: 4,
        borderWidth:4,
        width: 54,
        height: 54,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    DevName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    DevBio: {
        color: '#666',
        marginTop: 5
    },

    DevTechs: {

    }

})

export default Main;