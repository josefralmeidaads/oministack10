import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview'

function Profile({ navigation }){

    const GitHubUserName = navigation.getParam('github_username')

    return(
        // a biblioteca webview me permite navegar para url da internet
        <WebView source={{ uri: `https://github.com/${GitHubUserName}` }} > 

        </WebView>
    )
}


export default Profile;