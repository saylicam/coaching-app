import * as Notifications from 'expo-notifications';

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleReminder(date: Date, title: string, body?: string) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date },
  });
}

export async function cancelNotification(id: string) {
  return Notifications.cancelScheduledNotificationAsync(id);
}

export async function scheduleSnooze(minutes = 30, title = 'Reminder', body?: string) {
  const date = new Date(Date.now() + minutes * 60 * 1000);
  return scheduleReminder(date, title, body);
}
