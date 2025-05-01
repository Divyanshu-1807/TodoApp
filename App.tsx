import React from 'react'
import TodoList from './components/TodoList';
import TodoHeader from './components/TodoHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './Navigation/AppNavigator'
import { AuthProvider } from './context/AuthContext';

enableScreens();

const App = () => {
  return (
    // <View style={styles.container}>
    //   <TodoHeader/>
    //   <TodoList/>
    // </View>
    <GestureHandlerRootView>
      <AuthProvider>
        <AppNavigator/>
      </AuthProvider>
      {/* <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddTodo" component={TodoHeader} />
        <Stack.Screen name="TodoList" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer> */}
    </GestureHandlerRootView>
  )
}
export default App