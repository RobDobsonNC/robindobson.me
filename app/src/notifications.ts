import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Idea } from './types'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function requestPermissions(): Promise<boolean> {
  if (!Device.isDevice) return false
  const { status: existing } = await Notifications.getPermissionsAsync()
  if (existing === 'granted') return true
  const { status } = await Notifications.requestPermissionsAsync()
  return status === 'granted'
}

// Schedule check-ins at 9am, 1pm and 6pm each day of the evaluation window.
// Times are jittered by up to 15 minutes so they feel less mechanical.
export async function scheduleNotificationsForIdea(idea: Idea): Promise<string[]> {
  const CHECK_HOURS = [9, 13, 18]
  const ids: string[] = []
  const now = Date.now()

  for (let day = 0; day < idea.evaluationDays; day++) {
    const dayStart = idea.createdAt + day * 24 * 60 * 60 * 1000

    for (const hour of CHECK_HOURS) {
      const jitter = Math.floor(Math.random() * 15 * 60 * 1000)
      const fireAt = new Date(dayStart)
      fireAt.setHours(hour, 0, 0, 0)
      const fireTime = fireAt.getTime() + jitter

      if (fireTime <= now) continue

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Check in',
          body: 'A moment to reflect — how important is this right now?',
          data: { ideaId: idea.id },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: new Date(fireTime),
        },
      })
      ids.push(id)
    }
  }

  return ids
}

export async function cancelNotificationsForIdea(notificationIds: string[]): Promise<void> {
  await Promise.all(
    notificationIds.map(id => Notifications.cancelScheduledNotificationAsync(id))
  )
}
