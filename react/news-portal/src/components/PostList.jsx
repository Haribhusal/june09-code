import React, { useEffect, useState, useMemo } from 'react';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error('Error:', err));
    }, []);

    // 🔍 useMemo filters posts only when `searchTerm` or `posts` changes
    const filteredPosts = useMemo(() => {
        return posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [posts, searchTerm]);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 mb-4 w-full"
            />

            <ul>
                {filteredPosts.map((post) => (
                    <li key={post.id} className="mb-2">
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
