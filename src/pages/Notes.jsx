import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Notes.css";

function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("DSA");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [analytics, setAnalytics] = useState({
    total: 0,
    today: 0,
    words: 0,
    byCategory: {},
  });

  const navigate = useNavigate();
  const user = auth.currentUser;

  const categories = ["All", "DSA", "Project", "Interview", "Resources", "Other"];

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(userNotes);

      const today = new Date().toDateString();
      let wordCount = 0;
      let todayCount = 0;
      let categoryCounts = {};

      userNotes.forEach((note) => {
        const date = note.createdAt?.toDate?.().toDateString();
        if (date === today) todayCount++;

        const titleWords = note.title?.split(" ")?.length || 0;
        const contentWords = note.content?.split(" ")?.length || 0;
        wordCount += titleWords + contentWords;

        categoryCounts[note.category] = (categoryCounts[note.category] || 0) + 1;
      });

      setAnalytics({
        total: userNotes.length,
        today: todayCount,
        words: wordCount,
        byCategory: categoryCounts,
      });
    });

    return () => unsubscribe();
  }, [user, navigate]);

  const handleAddOrUpdateNote = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return alert("Fill all fields");

    if (editId) {
      await updateDoc(doc(db, "notes", editId), {
        title,
        content,
        category,
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "notes"), {
        uid: user.uid,
        title,
        content,
        category,
        createdAt: new Date(),
      });
    }

    setTitle("");
    setContent("");
    setCategory("DSA");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setEditId(note.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNotes = notes.filter((note) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      note.title.toLowerCase().includes(lowerSearch) ||
      note.content.toLowerCase().includes(lowerSearch);

    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="notes-container">
      <h2 className="notes-header">Your Notes</h2>

      <div className="analytics-box">
        <h3>Analytics Dashboard</h3>
        <p>Total Notes: {analytics.total}</p>
        <p>Total Words: {analytics.words}</p>
        <p>Notes Added Today: {analytics.today}</p>
        <p>By Category:</p>
        <ul>
          {Object.entries(analytics.byCategory).map(([cat, count]) => (
            <li key={cat}>
              {cat}: {count}
            </li>
          ))}
        </ul>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="notes-input"
      />

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <form onSubmit={handleAddOrUpdateNote} className="notes-form">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="notes-input"
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="notes-textarea"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="notes-input"
        >
          <option value="DSA">DSA</option>
          <option value="Project">Project</option>
          <option value="Interview">Interview</option>
          <option value="Resources">Resources</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" className="notes-add-btn">
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p className="notes-empty">No matching notes.</p>
        ) : (
          filteredNotes.map((note) => {
            const createdAt = note.createdAt?.toDate?.();
            const timeAgo = createdAt
              ? Math.floor((new Date() - createdAt) / 60000)
              : null;

            return (
              <div key={note.id} className="note-card">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>
                <small className="note-timestamp">Category: {note.category}</small>
                <br />
                {timeAgo !== null && (
                  <small className="note-timestamp">
                    {timeAgo === 0 ? "just now" : `${timeAgo} min(s) ago`}
                  </small>
                )}
                <br />
                <button
                  onClick={() => handleEdit(note)}
                  className="note-delete-btn"
                  style={{ backgroundColor: "#007bff", marginRight: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="note-delete-btn"
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Notes;
