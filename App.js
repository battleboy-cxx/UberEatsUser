import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import AuthContextProvider from "./src/context/AuthContext";
import BasketContextProvider from "./src/context/BasketContext";
import OrderContextProvider from "./src/context/OrderContext";

Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <RootNavigator />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
export default withAuthenticator(App);
