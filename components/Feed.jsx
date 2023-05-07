'use client';
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedValue(value);   
      }, delay);

      return () => {
          clearTimeout(handler);
      }
  }, [value, delay]);

  return debouncedValue;
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => setSearchText(e.target.value);

  const debouncedValue = useDebounce(searchText, 1000);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

  useEffect(() => {
    if (debouncedValue) {
      console.log(debouncedValue);
      const searchResult = filterPrompts(debouncedValue);
      setSearchResults(searchResult);
    }
  }, [debouncedValue]); // eslint-disable-line

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative flex-center w-full">
        <input 
          type="text" 
          placeholder="Search for a tag or username" 
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}

      
    </section>
  )
}

export default Feed