import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StyleSheet, Text, View } from 'react-native';
import Home from "./Screens/Home"
export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
