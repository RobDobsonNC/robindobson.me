import React, { useCallback, useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Idea, RootStackParamList } from '../types'
import { getIdeas } from '../storage'

type Nav = NativeStackNavigationProp<RootStackParamList>


function avgScore(idea: Idea): number | null {
  if (idea.votes.length === 0) return null
  return idea.votes.reduce((s, v) => s + v.score, 0) / idea.votes.length
}

function isExpired(idea: Idea): boolean {
  return Date.now() >= idea.createdAt + idea.evaluationDays * 24 * 60 * 60 * 1000
}

function daysLeft(idea: Idea): number {
  const ms = idea.createdAt + idea.evaluationDays * 86_400_000 - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

export default function HomeScreen() {
  const navigation = useNavigation<Nav>()
  const [ideas, setIdeas] = useState<Idea[]>([])

  useFocusEffect(
    useCallback(() => {
      getIdeas().then(setIdeas)
    }, [])
  )

  const readyForReview = ideas.filter(i => i.status === 'active' && isExpired(i))
  const active = ideas.filter(i => i.status === 'active' && !isExpired(i))
  const archived = ideas.filter(i => i.status === 'completed' || i.status === 'dismissed')

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={s.scroll}>

        {readyForReview.length > 0 && (
          <>
            <Text style={s.section}>Ready to review</Text>
            {readyForReview.map(idea => {
              const avg = avgScore(idea)
              return (
                <TouchableOpacity
                  key={idea.id}
                  style={[s.card, s.reviewCard]}
                  onPress={() => navigation.navigate('Result', { ideaId: idea.id })}
                >
                  <Text style={s.cardTitle}>{idea.title}</Text>
                  <View style={s.row}>
                    <Text style={s.badge}>See results</Text>
                    {avg !== null && <Text style={s.scoreText}>{avg.toFixed(1)}/5</Text>}
                  </View>
                </TouchableOpacity>
              )
            })}
          </>
        )}

        {active.length > 0 && (
          <>
            <Text style={s.section}>Evaluating</Text>
            {active.map(idea => (
              <TouchableOpacity
                key={idea.id}
                style={s.card}
                onPress={() => navigation.navigate('CheckIn', { ideaId: idea.id })}
              >
                <Text style={s.cardTitle}>{idea.title}</Text>
                <View style={s.row}>
                  <Text style={s.meta}>{idea.votes.length} check-ins</Text>
                  <Text style={s.meta}>{daysLeft(idea)}d left</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {archived.length > 0 && (
          <>
            <Text style={s.section}>Archive</Text>
            {archived.map(idea => {
              const avg = avgScore(idea)
              return (
                <View key={idea.id} style={[s.card, s.archivedCard]}>
                  <Text style={s.archivedTitle}>{idea.title}</Text>
                  <View style={s.row}>
                    <Text style={s.meta}>{idea.status}</Text>
                    {avg !== null && <Text style={s.meta}>{avg.toFixed(1)}/5</Text>}
                  </View>
                </View>
              )
            })}
          </>
        )}

        {ideas.length === 0 && (
          <View style={s.empty}>
            <Text style={s.emptyTitle}>Nothing here yet</Text>
            <Text style={s.emptyBody}>
              Add something you're unsure about — a purchase, a decision, an idea — and let time reveal whether it truly matters.
            </Text>
          </View>
        )}

      </ScrollView>

      <TouchableOpacity style={s.fab} onPress={() => navigation.navigate('AddIdea')}>
        <Text style={s.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f2f2f7' },
  scroll: { padding: 20, paddingTop: 16, paddingBottom: 120 },
  section: {
    color: '#6e6e73',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewCard: {
    borderColor: '#6c63ff',
    borderWidth: 1.5,
  },
  archivedCard: { opacity: 0.5 },
  cardTitle: { color: '#1c1c1e', fontSize: 17, fontWeight: '500', marginBottom: 10 },
  archivedTitle: { color: '#8e8e93', fontSize: 17, fontWeight: '500', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  meta: { color: '#8e8e93', fontSize: 13 },
  scoreText: { color: '#6c63ff', fontSize: 14, fontWeight: '600' },
  badge: {
    color: '#6c63ff',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: '#6c63ff15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  empty: { paddingTop: 120, alignItems: 'center', paddingHorizontal: 24 },
  emptyTitle: { color: '#1c1c1e', fontSize: 22, fontWeight: '600', marginBottom: 14, textAlign: 'center' },
  emptyBody: { color: '#8e8e93', fontSize: 15, lineHeight: 23, textAlign: 'center' },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6c63ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6c63ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  fabIcon: { color: '#fff', fontSize: 30, lineHeight: 34, fontWeight: '300' },
})
