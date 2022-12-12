import { StatusBar } from 'expo-status-bar'
import { Text, Button, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import UserScreen from './screens/UserScreen'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: 'black',
          headerTransparent: true,
          drawerActiveTintColor: 'tomato',
          drawerInactiveTintColor: 'blue',
          headerTitle: '',
          headerRightContainerStyle: { paddingRight: 15 },
          headerRight: () => <FontAwesome5 name="user-circle" size={24} color="black" />
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="User" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
