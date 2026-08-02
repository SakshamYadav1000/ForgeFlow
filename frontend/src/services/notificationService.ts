import api from "./api";

import type {
  Notification,
} from "../types/notification";


// GET /notifications
export const getNotifications = async (): Promise<
  Notification[]
> => {

  const response =
    await api.get<Notification[]>(
      "/notifications"
    );

  return response.data;

};



// PATCH /notifications/{id}/read
export const markNotificationAsRead = async (
  notificationId: number
): Promise<Notification> => {

  const response =
    await api.patch<Notification>(
      `/notifications/${notificationId}/read`
    );

  return response.data;

};



// PATCH /notifications/read-all
export const markAllNotificationsAsRead = async () => {

  const response =
    await api.patch(
      "/notifications/read-all"
    );

  return response.data;

};



// DELETE /notifications/{id}
export const deleteNotification = async (
  notificationId: number
): Promise<void> => {

  await api.delete(
    `/notifications/${notificationId}`
  );

};