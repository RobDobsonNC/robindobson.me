import React, { useEffect } from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Notifications from 'expo-notifications'
import { RootStackParamList } from './src/types'
import HomeScreen from './src/screens/HomeScreen'
import AddIdeaScreen from './src/screens/AddIdeaScreen'
import CheckInScreen from './src/screens/CheckInScreen'
import ResultScreen from './src/screens/ResultScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const navRef = useNavigationContainerRef<RootStackParamList>()

  useEffect(() => {
    // Handle tapping a notification when the app is open or backgrounded
    const sub = Notifications.addNotificationResponseReceivedListener(response => {
      const ideaId = response.notification.request.content.data?.ideaId as string | undefined
      if (ideaId && navRef.isReady()) {
        navRef.navigate('CheckIn', { ideaId })
      }
    })
    return () => sub.remove()
  }, [])

  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0f0f13' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerBackTitle: 'Back',
          contentStyle: { backgroundColor: '#0f0f13' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Deliberate' }}
        />
        <Stack.Screen
          name="AddIdea"
          component={AddIdeaScreen}
          options={{ title: 'New idea' }}
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
