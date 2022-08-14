import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import ListContact from './screens/ListContact';
import DetailContact from './screens/DetailContact';
import EditContact from './screens/EditContact';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ListContact"
              component={ListContact}
              options={{ 
                title: 'Contacts',
                headerStyle: {
                  backgroundColor: '#295eff',
                }, 
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="DetailContact"
              component={DetailContact}
              options={{ 
                title: '',
                headerStyle: {
                  backgroundColor: '#d4deff',
                },
             }}
            />
            <Stack.Screen
              name="EditContact"
              component={EditContact}
              options={{ 
                title: '',
                headerStyle: {
                  backgroundColor: '#d4deff',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
  }
}

export default App;
