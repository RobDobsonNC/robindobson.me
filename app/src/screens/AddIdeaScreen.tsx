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
        placeholderTextColor="#c7c7cc"
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
        You'll get {days * 3} check-ins over {days} days.{'\n'}
        Each one simply asks: <Text style={s.hintItalic}>how important is this right now?</Text>
      </Text>

      <TouchableOpacity style={[s.btn, saving && s.btnDisabled]} onPress={handleSave} disabled={saving}>
        <Text style={s.btnText}>{saving ? 'Saving…' : 'Start evaluating'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f2f2f7' },
  scroll: { padding: 24, paddingTop: 32 },
  label: {
    color: '#6e6e73',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#1c1c1e',
    fontSize: 17,
    borderRadius: 16,
    padding: 16,
    marginBottom: 36,
    minHeight: 88,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dayRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  dayBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dayBtnOn: { borderColor: '#6c63ff', backgroundColor: '#f0efff' },
  dayText: { color: '#8e8e93', fontSize: 15, fontWeight: '600' },
  dayTextOn: { color: '#6c63ff' },
  hint: {
    color: '#8e8e93',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 44,
  },
  hintItalic: { fontStyle: 'italic', color: '#6e6e73' },
  btn: {
    backgroundColor: '#6c63ff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
