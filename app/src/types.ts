export type Vote = {
  id: string
  timestamp: number
  score: number // 1-5
}

export type Idea = {
  id: string
  title: string
  createdAt: number
  evaluationDays: number
  votes: Vote[]
  status: 'active' | 'completed' | 'dismissed'
  notificationIds: string[]
}

export type RootStackParamList = {
  Onboarding: undefined
  Home: undefined
  AddIdea: undefined
  CheckIn: { ideaId: string }
  Result: { ideaId: string }
}
