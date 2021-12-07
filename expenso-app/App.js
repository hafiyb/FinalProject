import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Login from './src/containers/login';

import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import Dashboard from './src/containers/dashboard';
import Income from './src/containers/income';
import Expenses from './src/containers/expenses';

import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux';
import { store, persistor } from './src/store/configureStore';
import Registration from './src/containers/register';
import incomeModal from './src/components/modalIncome';
import expensesModal from './src/components/modalExpenses';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav() {
  return(
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName 

          if(route.name == 'Dashboard'){
            iconName = focused
            ? 'home'
            : 'home-outline'
          } else if(route.name == 'Incomes'){
            iconName = focused
            ? 'add'
            : 'add-outline'
          } else if(route.name == 'Expenses'){
            iconName = focused
            ? 'remove'
            : 'remove-outline'
          }

          return (<View><Ionicons name={iconName} size={20} color={color}  /></View>)
        },
        tabBarActiveTintColor:'gold',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name='Dashboard' component={Dashboard}  options={{headerShown:false,headerBackVisible:false}} />
      <Tab.Screen name="Incomes" component={Income} options={{headerShown:false,headerBackVisible:false}}/>
      <Tab.Screen name="Expenses" component={Expenses} options={{headerShown:false,headerBackVisible:false}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login}  options={{headerShown:false,headerBackVisible:false}} />
        <Stack.Screen name='Registration' component={Registration}  options={{headerShown:false,headerBackVisible:false}} />
        <Stack.Screen name="TabNav" component={TabNav} options={{headerShown:false,headerBackVisible:false,headerStyle:{backgroundColor:'skyblue'}}}/>
        <Stack.Group  screenOptions={{ presentation: 'transparentModal', headerShown:false}}>
          <Stack.Screen name="IncomeModal" component={incomeModal} />
          <Stack.Screen name="ExpensesModal" component={expensesModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


