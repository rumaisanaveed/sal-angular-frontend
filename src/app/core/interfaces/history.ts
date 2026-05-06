export interface Condition {
  id: string;
  name: string;
}

export interface HistoryItem {
  condition: string;
  relations: string[];
}
