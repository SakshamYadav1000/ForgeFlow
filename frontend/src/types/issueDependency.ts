export type DependencyType =
  | "BLOCKS"
  | "RELATED"
  | "DUPLICATE";



export interface IssueDependency {

  id: number;

  source_issue_id: number;

  target_issue_id: number;

  dependency_type: DependencyType;

  created_at: string;

}



export interface CreateDependencyRequest {

  target_issue_id: number;

  dependency_type: DependencyType;

}