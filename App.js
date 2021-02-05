import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import Galery from './screens/Galery';
import NewPhoto from './screens/NewPhoto';

const Tab = createBottomTabNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Galery"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === 'Galery') {
              return <Icon name={focused ? 'md-menu' : 'ios-menu-outline'} />;
            } else if (route.name === 'NewPhoto') {
              return (
                <Icon name={focused ? 'md-images' : 'ios-images-outline'} />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Galery" component={Galery} />
        <Tab.Screen name="NewPhoto" component={NewPhoto} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
