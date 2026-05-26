'use client';
import { useState, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * TagInput — pill badge tag input.
 * Press Enter or comma to add a tag.
 * Click × on a badge to remove.
 * Props:
 *   value       — string[]
 *   onChange    — (newTags: string[]) => void
 *   placeholder — string
 *   suggestions — string[] (optional autocomplete list)
 */
export default function TagInput({
  value = [],
  onChange,
  placeholder = 'Type and press Enter…',
  suggestions = [],
}) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const addTag = (tag) => {
    const trimmed = tag.trim().replace(/,$/, '');
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput('');
    setShowSuggestions(false);
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const filtered = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(s) &&
      input.length > 0
  );

  return (
    <div className="relative">
      <div
        className="flex flex-wrap gap-2 min-h-[44px] p-2 border rounded-md cursor-text"
        style={{ borderColor: '#E2E8F0', backgroundColor: '#fff' }}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#0F172A', color: '#fff' }}
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="hover:opacity-70 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] text-sm outline-none bg-transparent"
          style={{ color: '#0F172A' }}
        />
      </div>

      {showSuggestions && filtered.length > 0 && (
        <div
          className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg overflow-hidden"
          style={{ borderColor: '#E2E8F0' }}
        >
          {filtered.slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={() => addTag(s)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
              style={{ color: '#0F172A' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <p className="text-[11px] mt-1" style={{ color: '#94A3B8' }}>
        Press Enter or comma to add
      </p>
    </div>
  );
}
