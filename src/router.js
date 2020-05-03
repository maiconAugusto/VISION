import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import User from './User';

const Router = (userLogger = false) =>
  createAppContainer(
    createStackNavigator(
      {
        Login: {
          screen: Login,
          navigationOptions: {
            header: null,
          },
        },
        Register: {
          screen: Register,
          navigationOptions: {
            header: null,
          },
        },
        Home: {
          screen: createDrawerNavigator(
            {
              Feed,
            },
            {
              contentComponent: User,
              drawerWidth: 230,
              drawerBackgroundColor: '#e77c1f',
              contentOptions: {
                itemsContainerStyle: {
                  marginTop: 100,
                },
                labelStyle: {
                  color: 'white',
                },
              },
            }
          ),
          navigationOptions: {
            header: null,
          },
        },
      },
      {
        initialRouteName: userLogger ? 'Home' : 'Login',
      }
    )
  );

export default Router;
