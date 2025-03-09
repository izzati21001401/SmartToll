import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreenComponent from "../../components/ui/SplashScreen";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* {userToken ? (
        // If the user is logged in, show the Home screen
        <Stack.Screen name="index" />
      ) : (
        // If the user is not logged in, show the Login screen
        <Stack.Screen name="login" />
      )} */}
      <Stack.Screen name="login" />
    </Stack>
  );
}