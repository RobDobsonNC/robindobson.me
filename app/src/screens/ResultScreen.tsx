import React, { useCallback, useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Idea, RootStackParamList } from '../types'
import { finaliseIdea, getIdea } from '../storage'
import { cancelNotificationsForIdea } from '../notifications'

type Nav = NativeStackNavigationProp<RootStackParamList>
type Route = { params: { ideaId: string } }

function ScoreDisplay({ avg }: { avg: number }) {
  let color = '#e05555'
  if (avg >= 4) color = '#6c63ff'
  else if (avg >= 3) color = '#f0a500'

  const fillPct = ((avg - 1) / 4) * 100

  return (
    <View style={gauge.wrap}>
      <View style={gauge.numberRow}>
        <Text style={[gauge.number, { color }]}>{avg.toFixed(1)}</Text>
        <Text style={gauge.denom}> / 5</Text>
      </View>
      <View style={gauge.track}>
        <View style={[gauge.fill, { width: `${fillPct}%` as any, backgroundColor: color }]} />
      </View>
    </View>
  )
}

const gauge = StyleSheet.create({
  wrap: { alignItems: 'center', marginVertical: 36, width: '100%' },
  numberRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 20 },
  number: { fontSize: 80, fontWeight: '200', lineHeight: 84 },
  denom: { color: '#333', fontSize: 22, marginBottom: 10 },
  track: { width: 220, height: 3, backgroundColor: '#1e1e2a', borderRadius: 2 },
  fill: { height: 3, borderRadius: 2 },
})

function trend(idea: Idea): string | null {
  if (idea.votes.length < 4) return null
  const half = Math.floor(idea.votes.length / 2)
  const first = idea.votes.slice(0, half).reduce((s, v) => s + v.score, 0) / half
  const second = idea.votes.slice(half).reduce((s, v) => s + v.score, 0) / (idea.votes.length - half)
  if (second - first > 0.5) return '↑ Your feeling about this grew stronger over time.'
  if (first - second > 0.5) return '↓ Your initial interest faded as time went on.'
  return '→ Your feeling stayed consistent throughout.'
}

export default function ResultScreen() {
  const navigation = useNavigation<Nav>()
  const route = useRoute() as Route
  const { ideaId } = route.params
  const [idea, setIdea] = useState<Idea | null>(null)

  useFocusEffect(
    useCallback(() => {
      getIdea(ideaId).then(setIdea)
    }, [ideaId])
  )

  async function decide(status: 'completed' | 'dismissed') {
    if (!idea) return
    await cancelNotificationsForIdea(idea.notificationIds)
    await finaliseIdea(ideaId, status)
    navigation.popToTop()
  }

  if (!idea) return <View style={s.root} />

  const avg =
    idea.votes.length > 0
      ? idea.votes.reduce((sum, v) => sum + v.score, 0) / idea.votes.length
      : null

  const trendLine = idea ? trend(idea) : null

  return (
    <ScrollView style={s.root} contentContainerStyle={s.scroll}>
      <Text style={s.eyebrow}>Evaluation complete</Text>
      <Text style={s.title}>{idea.title}</Text>

      {avg !== null ? (
        <>
          <ScoreDisplay avg={avg} />
          <Text style={s.checkInCount}>
            {idea.votes.length} check-in{idea.votes.length !== 1 ? 's' : ''} over {idea.evaluationDays} day{idea.evaluationDays !== 1 ? 's' : ''}
          </Text>
          {trendLine && <Text style={s.trendText}>{trendLine}</Text>}
        </>
      ) : (
        <Text style={s.noVotes}>No check-ins recorded during this evaluation.</Text>
      )}

      <View style={s.divider} />

      <Text style={s.decideLabel}>What will you do?</Text>

      <TouchableOpacity style={s.btnAct} onPress={() => decide('completed')}>
        <Text style={s.btnActText}>Act on it</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.btnDismiss} onPress={() => decide('dismissed')}>
        <Text style={s.btnDismissText}>Let it go</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0f0f13' },
  scroll: { padding: 28, paddingTop: 40, alignItems: 'center' },
  eyebrow: {
    color: '#333',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 32,
  },
  checkInCount: { color: '#3a3a4a', fontSize: 13, marginTop: 4 },
  trendText: {
    color: '#444',
    fontSize: 14,
    marginTop: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  noVotes: { color: '#333', fontSize: 15, marginVertical: 40, textAlign: 'center' },
  divider: { width: '100%', height: 1, backgroundColor: '#17171f', marginVertical: 36 },
  decideLabel: {
    color: '#444',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 18,
  },
  btnAct: {
    width: '100%',
    backgroundColor: '#6c63ff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnActText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnDismiss: {
    width: '100%',
    backgroundColor: '#17171f',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  btnDismissText: { color: '#555', fontSize: 16, fontWeight: '500' },
})
