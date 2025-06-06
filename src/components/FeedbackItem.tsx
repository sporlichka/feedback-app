import type { FeedbackItemProps } from "../types/feedbackTypes";

function FeedbackItem({
  feedback,
  onDelete,
  onUpvote,
  onEdit,
}: FeedbackItemProps) {
  return (
    <div className="feedback-item shadow-md rounded-2xl p-5 flex flex-col bg-[var(--message-in)] theme-dark:bg-[#23272f] border border-[var(--border-color)]">
      <div className="flex-1">
        <p className="text-lg font-medium mb-2">{feedback.text}</p>
        <div className="feedback-meta flex items-center gap-3 text-sm text-[var(--text-secondary)] mb-2">
          <span className="px-2 py-1 rounded bg-[var(--light-blue)] text-white font-semibold text-xs">
            {feedback.category}
          </span>
          <button
            className="ml-2 px-2 py-1 rounded bg-[var(--primary-blue)] text-white hover:bg-[var(--dark-blue)] transition"
            onClick={() => onUpvote(feedback.id)}
          >
            ▲ {feedback.votes}
          </button>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(feedback.id)}
          className="edit-btn px-3 py-1 rounded bg-[var(--light-blue)] text-white hover:bg-[var(--primary-blue)] transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(feedback.id)}
          className="delete-btn px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FeedbackItem;
