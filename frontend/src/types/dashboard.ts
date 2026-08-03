import type { ActivityType } from "./activity";
import type { NotificationType } from "./notification";


export interface IssueStatusCount {

  todo: number;

  in_progress: number;

  done: number;

}


export interface PriorityCount {

  high: number;

  medium: number;

  low: number;

}



export interface DashboardActivity {

  id: number;

  description: string;

  activity_type: ActivityType;

  created_at: string;

}



export interface DashboardNotification {

  id: number;

  title: string;

  message: string;

  notification_type: NotificationType;

  is_read: boolean;

  created_at: string;

}



export interface DashboardResponse {

  organizations: number;

  projects: number;

  assigned_issues: number;

  reported_issues: number;


  issue_status: IssueStatusCount;


  priority: PriorityCount;


  recent_activity: DashboardActivity[];


  notifications: DashboardNotification[];

}