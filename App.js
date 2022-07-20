import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ScanScreen from "./screens/ScanScreen/ScanScreen";
import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ToolsScreen from "./screens/ToolsScreen/ToolsScreen";
const Stack = createNativeStackNavigator();
const AuthUserContext = createContext({});

const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

const Root = () => {
  const { user, setUser } = useContext(AuthUserContext);
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });
    return unsubscribeAuth;
  }, [user]);
  return (
    <NavigationContainer>
      {user ? <AuthStack /> : <LoginScreen />}
    </NavigationContainer>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={HomeScreen}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Tools" component={ToolsScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthUserProvider>
      <Root />
    </AuthUserProvider>
  );
}
