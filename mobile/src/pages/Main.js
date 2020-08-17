import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect}from 'react';
import {View, StyleSheet, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api'



function Main({ navigation }){
    const [currentRegion, setcurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');

    const initialRegion = {
        latitude: -37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

    
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

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', { 
            params: {
                latitude,
                longitude,
                techs
            }
        });

        console.log(response.data)

        setDevs(response.data); //gravando os devs em "DEVS" ao receber a resposta da API
    }

    function handleRegionChanged(region){
        //console.log(region); //verifica se a região esta sendo atualizada junto com a lista 
        setcurrentRegion(region); // setando ao minha currentRegion a region que estou percorrendo no mapa
    }

    if(!currentRegion){ // enquanto minha posição for nula retorne nulo
        return null
    }

    console.log(currentRegion);

    return (
        //View tem que ser importada para gerar visualição da tela
        <>
        <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
            {devs.map(dev => (
                <Marker key={dev._id} coordinate={{longitude: dev.location.coordinates[0], latitude: dev.location.coordinates[1]}}>
                <Image style={styles.avatar} source={{uri: dev.avatar_url}}/>
                <Callout onPress={() => {
                    //Quando clicar no nome do Dev irá navegar a outra tela
                    navigation.navigate('Profile', { github_username: dev.github_username });
                }}>
                    <View style={styles.callout}> 
            <Text style={styles.DevName}>{dev.name}</Text>
                        <Text style={styles.DevBio}>{dev.bio}</Text>
                        <Text style={styles.DevTechs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
            </Marker>
            ))}
         </MapView>
         <View style={styles.searchForm}>
            <TextInput placeholder="Buscar Devs por techs" 
                style={styles.searchInput}
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={25} color="#FFF"/>
            </TouchableOpacity>
         </View>
         </>
         
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
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 3
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#7D40E7',
        borderRadius: 50, 
        alignItems: 'center',
        justifyContent: 'center',
        left: 10,
        elevation: 7,
        shadowOpacity: 0.2,
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4
        }
    }

})

export default Main;