import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';

function Profile(){
    return(
        <View style={style.container}>
            <Text style={style.text}>Profile</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C00',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
      }
})

export default Profile;