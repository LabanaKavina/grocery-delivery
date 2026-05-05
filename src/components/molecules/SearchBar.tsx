interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
}

const SearchBar = ({ value, onChange, placeholder = 'Search Store', onFilterClick }: SearchBarProps) => {
  return (
    <div className="flex items-center h-[52px] rounded-[15px] bg-[#F2F3F2] px-4 gap-3">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
        <path
          d="M8.167 14.333A6.167 6.167 0 1 0 8.167 2a6.167 6.167 0 0 0 0 12.333ZM16 16l-3.35-3.35"
          stroke="#181B19"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-[#181725] placeholder-[#7C7C7C] outline-none"
        aria-label={placeholder}
      />
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className="shrink-0 cursor-pointer"
          aria-label="Open filters"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M2 3h14M5 9h8M7.5 15h3"
              stroke="#181B19"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
