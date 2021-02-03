import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import Galery from './screens/Galery';
import NewPhoto from './screens/NewPhoto';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator initialRouteName="Galery"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === 'Galery') {
              return (
                <Icon name={focused ? 'md-images' : 'ios-images-outline'} />
              );
            } else if (route.name === 'NewPhoto') {
              return <Icon name={focused ? 'md-menu' : 'ios-menu-outline'} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Galery"
          component={Galery}
          options={{tabBarBadge: 3}}
        />
        <Tab.Screen name="NewPhoto" component={NewPhoto} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;