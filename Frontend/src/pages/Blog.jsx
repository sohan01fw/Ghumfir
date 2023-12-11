import { useState } from 'react';

import './Blog.css';

const Blog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    // try {
    //   await axios.post('http://localhost:5000/api/blogs', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   // Reset form after successful submission
    //   setTitle('');
    //   setContent('');
    //   setImage(null);
    // } catch (error) {
    //   console.error('Error submitting blog:', error);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className='blog-form'>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <br />
      <button type="submit">Submit Blog</button>
    </form>
  );
};

export default Blog;
