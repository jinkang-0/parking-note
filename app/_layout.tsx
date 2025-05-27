import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { LocationProvider } from "@/contexts/LocationContext";
import { SavedLocationProvider } from "@/contexts/SavedLocationContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Variable.ttf")
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LocationProvider>
        <SavedLocationProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
          <StatusBar style="auto" />
        </SavedLocationProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}
