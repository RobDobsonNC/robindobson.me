import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootStackParamList } from './src/types'
import OnboardingScreen from './src/screens/OnboardingScreen'
import HomeScreen from './src/screens/HomeScreen'
import AddIdeaScreen from './src/screens/AddIdeaScreen'
import CheckInScreen from './src/screens/CheckInScreen'
import ResultScreen from './src/screens/ResultScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const navRef = useNavigationContainerRef<RootStackParamList>()
  const [initialRoute, setInitialRoute] = useState<'Onboarding' | 'Home' | null>(null)

  useEffect(() => {
    AsyncStorage.getItem('onboarding:seen').then(seen => {
      setInitialRoute(seen ? 'Home' : 'Onboarding')
    })
  }, [])

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(response => {
      const ideaId = response.notification.request.content.data?.ideaId as string | undefined
      if (ideaId && navRef.isReady()) {
        navRef.navigate('CheckIn', { ideaId })
      }
    })
    return () => sub.remove()
  }, [])

  if (!initialRoute) return null

  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: { backgroundColor: '#f2f2f7' },
          headerTintColor: '#6c63ff',
          headerShadowVisible: false,
          headerBackTitle: 'Back',
          contentStyle: { backgroundColor: '#f2f2f7' },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Sleep On It',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Onboarding')} hitSlop={12}>
                <Text style={{ color: '#6c63ff', fontSize: 20 }}>?</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AddIdea"
          component={AddIdeaScreen}
          options={{ title: 'New' }}
        />
        <Stack.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Results', headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
