import { useState } from "react";
import type { FeedbackFormProps } from "../types/feedbackTypes";
import { useFeedbackStore } from "../store";

function FeedbackForm({ onAdd }: FeedbackFormProps) {
  const categories = useFeedbackStore((s) => s.categories);
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your feedback..."
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as typeof category)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Add Feedback</button>
    </form>
  );
}

export default FeedbackForm;
