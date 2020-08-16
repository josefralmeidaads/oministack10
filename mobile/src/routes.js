import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main, // tela que será renderizada
            navigationOptions: {
                title: 'DevRadar',
                headerTitleAlign:"center"
            },
        },
        Profile: {
            screen: Profile, // tela que será renderizada
            navigationOptions: {
                title: 'Perfil no GitHub',
                headerTitleAlign:"center"
            }
        }
    })
);

export default Routes;