import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import TodoList from '../components/TodoList';
import TodoHeader from '../components/TodoHeader';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../components/Loadingscreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TodoList" component={TodoList} options={{ headerShown: false }} />
    <Stack.Screen name="AddTodo" component={TodoHeader} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const LogoutScreen = () => {
  const { logout } = useContext(AuthContext);
  React.useEffect(() => {
    logout(); 
  }, []);
  return null;
};

const HomeDrawer = () => (
  <Drawer.Navigator
    screenOptions={({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Icon name="menu" size={20} />
        </TouchableOpacity>
      ),
    })}
  >
    <Drawer.Screen
      name="Home"
      component={HomeStack}
      options={{ 
        headerTitle: '' ,
        headerStyle: {
          height: 50,
        },
      }}
      listeners={({ navigation }) => ({
        drawerItemPress: (e) => {
          e.preventDefault();
          navigation.navigate('Home', {
            screen: 'TodoList',
          });
        },
      })}
    />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
  </Drawer.Navigator>
);


const AppNavigator = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null;
  }

  const { token, isLoading } = auth;

  if (isLoading) {
    return <LoadingScreen/>;
  }

  // const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Main" component={HomeDrawer} />
        ) : (
          <Stack.Screen name="Auth" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
