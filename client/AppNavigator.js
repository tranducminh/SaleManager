import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/Customer/Login';
import SignupScreen from './screens/Customer/Signup';
import HomeScreen from './screens/Customer/Home';
import ProfileScreen from './screens/Customer/Profile';
import HomeAdmin from './screens/Admin/Home';

const navigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: false,
      },
    },
    Admin: {
      screen: HomeAdmin,
      navigationOptions: {
        headerLeft: false,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(navigator);
