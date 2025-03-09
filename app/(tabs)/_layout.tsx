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
      {userToken ? (
        // HomeScreen is registered as "index"
        <Stack.Screen name="index" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}