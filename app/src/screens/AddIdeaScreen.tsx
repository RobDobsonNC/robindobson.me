import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { addIdea, updateIdeaNotifications } from '../storage'
import { requestPermissions, scheduleNotificationsForIdea } from '../notifications'

type Nav = NativeStackNavigationProp<RootStackParamList>

const DAY_OPTIONS = [3, 7, 14, 30]

export default function AddIdeaScreen() {
  const navigation = useNavigation<Nav>()
  const [title, setTitle] = useState('')
  const [days, setDays] = useState(7)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('What is it?', 'Give your idea a name so you can recognise it when the results come in.')
      return
    }

    setSaving(true)

    const idea = {
      id: Date.now().toString(),
      title: title.trim(),
      createdAt: Date.now(),
      evaluationDays: days,
      votes: [],
      status: 'active' as const,
      notificationIds: [],
    }

    await addIdea(idea)

    const granted = await requestPermissions()
    if (granted) {
      const ids = await scheduleNotificationsForIdea(idea)
      await updateIdeaNotifications(idea.id, ids)
    } else {
      Alert.alert(
        'Notifications are off',
        `You can still check in manually from the home screen. Enable notifications in Settings to receive ${days * 3} automatic reminders over ${days} days.`
      )
    }

    navigation.goBack()
  }

  return (
    <ScrollView
      style={s.root}
      contentContainerStyle={s.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={s.label}>What's on your mind?</Text>
      <TextInput
        style={s.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. New iPhone, change career, buy a sofa…"
        placeholderTextColor="#333"
        multiline
        autoFocus
      />

      <Text style={s.label}>Evaluate for</Text>
      <View style={s.dayRow}>
        {DAY_OPTIONS.map(d => (
          <TouchableOpacity
            key={d}
            style={[s.dayBtn, days === d && s.dayBtnOn]}
            onPress={() => setDays(d)}
          >
            <Text style={[s.dayText, days === d && s.dayTextOn]}>{d}d</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.hint}>
        You'll get {days * 3} blind check-ins over {days} days.{'\n'}
        No title, no history — just: <Text style={s.hintItalic}>how important is this right now?</Text>
      </Text>

      <TouchableOpacity style={[s.btn, saving && s.btnDisabled]} onPress={handleSave} disabled={saving}>
        <Text style={s.btnText}>{saving ? 'Saving…' : 'Start evaluating'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0f0f13' },
  scroll: { padding: 24, paddingTop: 32 },
  label: {
    color: '#555',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#17171f',
    color: '#fff',
    fontSize: 17,
    borderRadius: 16,
    padding: 16,
    marginBottom: 36,
    minHeight: 88,
    textAlignVertical: 'top',
  },
  dayRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  dayBtn: {
    flex: 1,
    backgroundColor: '#17171f',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayBtnOn: { borderColor: '#6c63ff', backgroundColor: '#6c63ff18' },
  dayText: { color: '#444', fontSize: 15, fontWeight: '600' },
  dayTextOn: { color: '#6c63ff' },
  hint: {
    color: '#3a3a4a',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 44,
  },
  hintItalic: { fontStyle: 'italic', color: '#555' },
  btn: {
    backgroundColor: '#6c63ff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
