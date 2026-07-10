import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Nav = NativeStackNavigationProp<RootStackParamList>

const STEPS = [
  { num: '1', text: 'Add something you want to buy, do, or decide.' },
  { num: '2', text: "You'll get check-ins asking how important it feels right now — no history shown." },
  { num: '3', text: 'At the end, see your score and decide whether to act.' },
]

export default function OnboardingScreen() {
  const navigation = useNavigation<Nav>()

  const canGoBack = navigation.canGoBack()

  async function handleDone() {
    await AsyncStorage.setItem('onboarding:seen', 'true')
    if (canGoBack) {
      navigation.goBack()
    } else {
      navigation.replace('Home')
    }
  }

  return (
    <View style={s.root}>
      <View style={s.inner}>
        <Text style={s.title}>Sleep On It</Text>
        <Text style={s.subtitle}>Before you decide, let time weigh in.</Text>

        <View style={s.steps}>
          {STEPS.map(step => (
            <View key={step.num} style={s.step}>
              <Text style={s.stepNum}>{step.num}</Text>
              <Text style={s.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={s.btn} onPress={handleDone}>
        <Text style={s.btnText}>Get started</Text>
      </TouchableOpacity>
    </View>
  )
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    justifyContent: 'space-between',
    padding: 32,
    paddingTop: 80,
    paddingBottom: 56,
  },
  inner: { flex: 1, justifyContent: 'center' },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#8e8e93',
    marginBottom: 56,
    lineHeight: 24,
  },
  steps: { gap: 28 },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6c63ff',
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
    overflow: 'hidden',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#1c1c1e',
    lineHeight: 23,
  },
  btn: {
    backgroundColor: '#6c63ff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
