import React, { useState } from "react";

const NewPostForm = ({ currentUser, addPost, availableTags }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState(availableTags[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      userId: currentUser.id,
      title,
      content,
      timestamp: new Date(),
      tags: [selectedTag],
      likes: [],
      comments: [],
      followedBy: [],
    };
    addPost(newPost);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <label>Select tags:</label>
      <select onChange={(e) => setSelectedTag(e.target.value)} value={selectedTag}>
        {availableTags.map((tag, index) => (
          <option key={index} value={tag}>{tag}</option>
        ))}
      </select>
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPostForm;
