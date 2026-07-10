import React, { useCallback, useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
} from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, Idea } from '../types'
import { addVote, getIdea } from '../storage'

type Nav = NativeStackNavigationProp<RootStackParamList>
type Route = { params: { ideaId: string } }

const SCORES = [1, 2, 3, 4, 5]

export default function CheckInScreen() {
  const navigation = useNavigation<Nav>()
  const route = useRoute() as Route
  const { ideaId } = route.params

  const [idea, setIdea] = useState<Idea | null>(null)
  const [voted, setVoted] = useState(false)
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const fadeAnim = useRef(new Animated.Value(1)).current

  useFocusEffect(
    useCallback(() => {
      getIdea(ideaId).then(setIdea)
      setVoted(false)
      setSelectedScore(null)
      fadeAnim.setValue(1)
    }, [ideaId])
  )

  async function handleVote(score: number) {
    if (voted || !idea) return
    setSelectedScore(score)
    setVoted(true)

    const updated = await addVote(ideaId, {
      id: Date.now().toString(),
      timestamp: Date.now(),
      score,
    })

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      delay: 700,
      useNativeDriver: true,
    }).start(() => {
      if (updated?.status === 'completed') {
        navigation.replace('Result', { ideaId })
      } else {
        navigation.goBack()
      }
    })
  }

  if (!idea) return <View style={s.root} />

  return (
    <View style={s.root}>
      <Animated.View style={[s.inner, { opacity: fadeAnim }]}>
        {!voted ? (
          <>
            <Text style={s.question}>
              How important is this{'\n'}right now?
            </Text>
            <Text style={s.subtext}>Answer for this moment, not what you think it should be.</Text>

            <View style={s.scoreRow}>
              {SCORES.map(score => (
                <TouchableOpacity
                  key={score}
                  style={s.scoreBtn}
                  onPress={() => handleVote(score)}
                  activeOpacity={0.65}
                >
                  <Text style={s.scoreNum}>{score}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={s.labelRow}>
              <Text style={s.scaleLabel}>Not at all</Text>
              <Text style={s.scaleLabel}>Absolutely</Text>
            </View>
          </>
        ) : (
          <View style={s.doneWrap}>
            <Text style={s.doneScore}>{selectedScore}</Text>
            <Text style={s.doneText}>Noted.</Text>
          </View>
        )}
      </Animated.View>

      {!voted && (
        <TouchableOpacity style={s.skip} onPress={() => navigation.goBack()}>
          <Text style={s.skipText}>Skip for now</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f2f2f7', justifyContent: 'center' },
  inner: { alignItems: 'center', paddingHorizontal: 32 },
  question: {
    color: '#1c1c1e',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  subtext: {
    color: '#8e8e93',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 52,
  },
  scoreRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  scoreBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  scoreNum: { color: '#1c1c1e', fontSize: 19, fontWeight: '500' },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  scaleLabel: { color: '#c7c7cc', fontSize: 12 },
  doneWrap: { alignItems: 'center' },
  doneScore: {
    fontSize: 84,
    fontWeight: '100',
    color: '#6c63ff',
    lineHeight: 90,
    marginBottom: 4,
  },
  doneText: { color: '#8e8e93', fontSize: 22, fontWeight: '500' },
  skip: { position: 'absolute', bottom: 52, alignSelf: 'center' },
  skipText: { color: '#c7c7cc', fontSize: 15 },
})
