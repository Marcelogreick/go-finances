import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/global/styles/theme';
import { Dashboard } from './src/pages/Dashboard';
import AppLoading from 'expo-app-loading';
import { Register } from "./src/pages/Register";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}
