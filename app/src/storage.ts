import AsyncStorage from '@react-native-async-storage/async-storage'
import { Idea, Vote } from './types'

const IDEAS_KEY = 'deliberate:ideas'

export async function getIdeas(): Promise<Idea[]> {
  const raw = await AsyncStorage.getItem(IDEAS_KEY)
  return raw ? JSON.parse(raw) : []
}

async function saveIdeas(ideas: Idea[]): Promise<void> {
  await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(ideas))
}

export async function getIdea(id: string): Promise<Idea | null> {
  const ideas = await getIdeas()
  return ideas.find(i => i.id === id) ?? null
}

export async function addIdea(idea: Idea): Promise<void> {
  const ideas = await getIdeas()
  ideas.push(idea)
  await saveIdeas(ideas)
}

export async function addVote(ideaId: string, vote: Vote): Promise<Idea | null> {
  const ideas = await getIdeas()
  const idx = ideas.findIndex(i => i.id === ideaId)
  if (idx === -1) return null

  ideas[idx].votes.push(vote)

  const idea = ideas[idx]
  const endTime = idea.createdAt + idea.evaluationDays * 24 * 60 * 60 * 1000
  if (Date.now() >= endTime) {
    ideas[idx].status = 'completed'
  }

  await saveIdeas(ideas)
  return ideas[idx]
}

export async function finaliseIdea(ideaId: string, status: 'completed' | 'dismissed'): Promise<void> {
  const ideas = await getIdeas()
  const idx = ideas.findIndex(i => i.id === ideaId)
  if (idx !== -1) {
    ideas[idx].status = status
    await saveIdeas(ideas)
  }
}

export async function updateIdeaNotifications(ideaId: string, notificationIds: string[]): Promise<void> {
  const ideas = await getIdeas()
  const idx = ideas.findIndex(i => i.id === ideaId)
  if (idx !== -1) {
    ideas[idx].notificationIds = notificationIds
    await saveIdeas(ideas)
  }
}
