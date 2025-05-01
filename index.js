/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store,{persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { TodoProvider } from './context/TodoContext';

const Root = () => (
    // <Provider store={store}>
    <TodoProvider>
        {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
        {/* </PersistGate> */}
    </TodoProvider>
    // </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
