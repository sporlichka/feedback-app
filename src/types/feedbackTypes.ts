export type FeedbackCategory = "UI" | "Performance" | "Feature";

export interface FeedbackItem {
  id: number;
  text: string;
  category: FeedbackCategory;
  votes: number;
  date: string;
}

export type Theme = "light" | "dark";

export type FeedbackListProps = {
  feedbacks: FeedbackItem[];
  onDelete: (id: number) => void;
  onUpvote: (id: number) => void;
  onEdit: (id: number) => void;
};

export type FeedbackItemProps = {
  feedback: FeedbackItem;
  onDelete: (id: number) => void;
  onUpvote: (id: number) => void;
  onEdit: (id: number) => void;
};

export type FeedbackFormProps = {
  onAdd: (text: string, category: FeedbackCategory) => void;
};
