import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Main(){
    return (
        //View tem que ser importada para gerar visualição da tela
        <View style={styles.container}>
            <Text style={styles.title}> Main!</Text>
            <StatusBar style={"auto"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      title: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
      }
})

export default Main;