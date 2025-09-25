import * as Notifications from 'expo-notifications';
import dayjs from 'dayjs';

export async function schedulePostNotifications(dueAtIso: string, title: string) {
  const dueAt = dayjs(dueAtIso);
  const before = dueAt.subtract(2, 'hour');

  await Notifications.scheduleNotificationAsync({
    content: { title: 'Post due soon', body: `${title} in 2 hours` },
    trigger: before.toDate(),
  });
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Time to post', body: `${title} now` },
    trigger: dueAt.toDate(),
  });
}

export async function snoozeNotification(notificationId?: string) {
  // Snooze 30 minutes by scheduling a new reminder
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Reminder', body: 'Time to publish your post' },
    trigger: dayjs().add(30, 'minute').toDate(),
  });
}
