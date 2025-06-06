import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import EditFeedbackModal from "./components/EditFeedbackModal";
import { useFeedbackStore } from "./store";
import { useState, useEffect } from "react";
import type { FeedbackItem, FeedbackCategory } from "./types/feedbackTypes";
import "./App.css";

function App() {
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const addFeedback = useFeedbackStore((s) => s.addFeedback);
  const deleteFeedback = useFeedbackStore((s) => s.deleteFeedback);
  const upvoteFeedback = useFeedbackStore((s) => s.upvoteFeedback);
  const editFeedback = useFeedbackStore((s) => s.editFeedback);
  const categories = useFeedbackStore((s) => s.categories);
  const theme = useFeedbackStore((s) => s.theme);
  const setTheme = useFeedbackStore((s) => s.setTheme);

  // Синхронизируем data-theme на html
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const [editId, setEditId] = useState<number | null>(null);
  const editingFeedback = feedbacks.find((fb) => fb.id === editId) || null;
  const [modalOpen, setModalOpen] = useState(false);

  // фильтрация по категории
  const [selectedCategory, setSelectedCategory] = useState<
    FeedbackCategory | "all"
  >("all");
  const filteredFeedbacks =
    selectedCategory === "all"
      ? feedbacks
      : feedbacks.filter((fb) => fb.category === selectedCategory);

  const handleEdit = (id: number) => {
    setEditId(id);
    setModalOpen(true);
  };
  const handleSave = (id: number, text: string, category: string) => {
    editFeedback(id, text, category as any);
    setModalOpen(false);
    setEditId(null);
  };
  const handleClose = () => {
    setModalOpen(false);
    setEditId(null);
  };

  return (
    <div className="app">
      <header className="w-full px-0 py-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight px-4">
          Product Feedback Board
        </h1>
        <div className="flex items-center gap-4 px-4 mt-2 md:mt-0">
          <button
            className="rounded-full px-4 py-2 font-semibold border border-[var(--primary)] bg-[var(--bg)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div className="ml-2 font-medium">
            Feedbacks: {filteredFeedbacks.length}
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 md:px-6 py-6 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div>
            <label className="mr-2 font-medium text-[var(--primary)]">
              Category:
            </label>
            <select
              className="category-select border rounded px-2 py-1 focus:outline-none focus:ring focus:border-[var(--primary)]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1" />
          <FeedbackForm onAdd={addFeedback} />
        </div>
        <FeedbackList
          feedbacks={filteredFeedbacks}
          onDelete={deleteFeedback}
          onUpvote={upvoteFeedback}
          onEdit={handleEdit}
        />
      </main>
      <EditFeedbackModal
        feedback={editingFeedback}
        open={modalOpen}
        onSave={handleSave}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
