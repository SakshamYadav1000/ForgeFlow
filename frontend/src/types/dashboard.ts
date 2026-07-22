export interface DashboardStats {
  total_issues: number;
  todo: number;
  in_progress: number;
  done: number;

  low_priority: number;
  medium_priority: number;
  high_priority: number;

  overdue_issues: number;

  total_milestones: number;
  completed_milestones: number;

  recent_activity: number;
}