import { useState, useEffect } from "react";
import type { FeedbackItem, FeedbackCategory } from "../types/feedbackTypes";
import { useFeedbackStore } from "../store";

interface EditFeedbackModalProps {
  feedback: FeedbackItem | null;
  open: boolean;
  onSave: (id: number, text: string, category: FeedbackCategory) => void;
  onClose: () => void;
}

export default function EditFeedbackModal({
  feedback,
  open,
  onSave,
  onClose,
}: EditFeedbackModalProps) {
  const categories = useFeedbackStore((s) => s.categories);
  const [text, setText] = useState("");
  const [category, setCategory] = useState<FeedbackCategory>(categories[0]);

  useEffect(() => {
    if (feedback) {
      setText(feedback.text);
      setCategory(feedback.category);
    }
  }, [feedback]);

  if (!open || !feedback) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Feedback</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(feedback.id, text, category);
          }}
        >
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
