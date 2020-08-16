import { StatusBar } from 'react-native';
import React from 'react';
import Main from './src/pages/Main';
import Routes from './src/routes'


export default function App() {
  return (
    //Para ter 2 componentes em uma propriedade é necessário ter um fragment 
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
    <Routes />
    </>
  );

}



