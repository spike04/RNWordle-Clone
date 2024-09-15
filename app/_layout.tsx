import { router, SplashScreen, Stack } from 'expo-router'

import Logo from '@/assets/images/nyt-logo.svg'
import { Colors } from '@/constants/Colors'
import { tokenCache } from '@/utils/cache'
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import {
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_900Black,
  useFonts,
} from '@expo-google-fonts/frank-ruhl-libre'
import { Ionicons } from '@expo/vector-icons'
import {
  BottomSheetModalProvider,
  TouchableOpacity,
} from '@gorhom/bottom-sheet'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [fontsLoaded] = useFonts({
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_900Black,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="login"
                  options={{
                    presentation: 'modal',
                    headerShadowVisible: false,
                    headerTitle: () => <Logo width={150} height={40} />,
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons
                          name="close"
                          size={26}
                          color={Colors.light.gray}
                        />
                      </TouchableOpacity>
                    ),
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
