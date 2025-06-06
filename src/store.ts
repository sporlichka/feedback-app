import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  FeedbackItem,
  FeedbackCategory,
  Theme,
} from "./types/feedbackTypes";

interface FeedbackState {
  feedbacks: FeedbackItem[];
  categories: FeedbackCategory[];
  theme: Theme;
  addFeedback: (text: string, category: FeedbackCategory) => void;
  deleteFeedback: (id: number) => void;
  editFeedback: (id: number, text: string, category: FeedbackCategory) => void;
  upvoteFeedback: (id: number) => void;
  setTheme: (theme: Theme) => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  devtools(
    persist(
      (set) => ({
        feedbacks: [],
        categories: ["UI", "Performance", "Feature"],
        theme: "light",
        addFeedback: (text, category) => {
          const newFeedback: FeedbackItem = {
            id: Date.now(),
            text,
            category,
            votes: 0,
            date: new Date().toISOString(),
          };
          set((state) => ({ feedbacks: [...state.feedbacks, newFeedback] }));
        },
        deleteFeedback: (id) => {
          set((state) => ({
            feedbacks: state.feedbacks.filter((fb) => fb.id !== id),
          }));
        },
        editFeedback: (id, text, category) => {
          set((state) => ({
            feedbacks: state.feedbacks.map((fb) =>
              fb.id === id ? { ...fb, text, category } : fb
            ),
          }));
        },
        upvoteFeedback: (id) => {
          set((state) => ({
            feedbacks: state.feedbacks.map((fb) =>
              fb.id === id ? { ...fb, votes: fb.votes + 1 } : fb
            ),
          }));
        },
        setTheme: (theme) => set({ theme }),
      }),
      { name: "feedback-store" }
    )
  )
);
