export default interface TTaskItem {
  id: String;
  is_completed: Boolean;
  content: String;
  description: String;
  created_at: String;

  creator_id?: String;
  assignee_id?: String;
  assigner_id?: String;
  comment_count?: Number;
  due?: Object;
  labels?: [];
  order?: Number;
  priority?: Number;
  project_id?: String;
  section_id?: String;
  parent_id?: String;
  url?: String;
}
