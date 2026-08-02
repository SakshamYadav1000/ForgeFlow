export type NotificationType =
  | "ISSUE_ASSIGNED"
  | "ISSUE_UPDATED"
  | "COMMENT_ADDED"
  | "MENTION";


export interface Notification {

  id: number;

  user_id: number;

  title: string;

  message: string;

  notification_type: NotificationType;

  is_read: boolean;

  created_at: string;

}