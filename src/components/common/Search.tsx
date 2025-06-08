import { useRecoilValueLoadable } from "recoil";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { productsList } from "../../store/products";
import { useDeferredValue } from "react";
import useDebounce from "../../hooks/useDebounce";
import Error from "./Error";

interface SearchProps {
  isSearchOpen: boolean;
  onClose: () => void;
}

const Search = ({ isSearchOpen, onClose }: SearchProps): JSX.Element => {
  const productsLoadable = useRecoilValueLoadable(productsList);

  const products = useMemo(() => {
    if (productsLoadable.state === "hasValue") return productsLoadable.contents;
    return [];
  }, [productsLoadable]);

  if (productsLoadable.state === "hasError") {
    return <Error />;
  }

  const [keyword, setKeyword] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const debouncedKeyword = useDebounce(keyword, 200);
  const deferredKeyword = useDeferredValue(debouncedKeyword);

  const filtered = useMemo(() => {
    if (!deferredKeyword.trim()) return [];
    return products.filter((product) => product.title.toLowerCase().includes(deferredKeyword.toLowerCase()));
  }, [deferredKeyword, products]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;

    if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filtered.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    }

    if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      const selected = filtered[highlightIndex];
      if (selected) {
        inputRef.current?.blur();
        navigate(`/product/${selected.id}`);
        setKeyword("");
        setHighlightIndex(-1);
        onClose();
      }
    }

    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement && highlightIndex >= 0) {
      const item = listElement.children[highlightIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  return (
    <div ref={wrapperRef} className="relative w-full sm:w-auto">
      <input
        ref={inputRef}
        type="text"
        placeholder="검색"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setHighlightIndex(0);
        }}
        onKeyDown={handleKeyDown}
        className={`${
          isSearchOpen ? "top-16 opacity-100 z-10" : "top-4 -z-10 opacity-0"
        } fixed left-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white transition-all`}
      />

      {filtered.length > 0 && (
        <ul
          ref={listRef}
          className="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600"
        >
          {filtered.map((product, index) => (
            <li
              key={product.id}
              className={`cursor-pointer ${
                highlightIndex === index ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onMouseDown={() => {
                navigate(`/product/${product.id}`);
                setKeyword("");
                setHighlightIndex(-1);
                onClose();
              }}
            >
              <span className="block py-2 px-4">{product.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
