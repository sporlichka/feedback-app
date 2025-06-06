import type { FeedbackListProps } from "../types/feedbackTypes";
import FeedbackItem from "./FeedbackItem";
import { useState } from "react";

function FeedbackList({
  feedbacks,
  onDelete,
  onUpvote,
  onEdit,
}: FeedbackListProps) {
  const [sortDesc, setSortDesc] = useState(true);

  const sorted = [...feedbacks].sort((a, b) =>
    sortDesc
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div>
      <button
        className="mb-4 px-3 py-1 rounded bg-[var(--primary-blue)] text-white hover:bg-[var(--dark-blue)] transition"
        onClick={() => setSortDesc((v) => !v)}
      >
        Sort by date: {sortDesc ? "newest first" : "oldest first"}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sorted.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No feedback yet. Be the first to share!
          </p>
        ) : (
          sorted.map((feedback) => (
            <FeedbackItem
              key={feedback.id}
              feedback={feedback}
              onDelete={onDelete}
              onUpvote={onUpvote}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackList;
