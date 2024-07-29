import React from 'react';

interface FilterProps {
  categories: string[];
  tags: string[];
  selectedCategory: string;
  selectedTags: string[];
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagChange
}) => {
  return (
    <div className="mb-4">
      <div className="mb-2">
        <label className="mr-2">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border rounded p-1"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mr-2">Tags:</label>
        {tags.map((tag) => (
          <label key={tag} className="mr-2">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => onTagChange(tag)}
              className="mr-1"
            />
            {tag}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;