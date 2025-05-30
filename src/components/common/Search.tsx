import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsList } from "../../store/products";

interface SearchProps {
  isSearchOpen: boolean;
  onClose: () => void;
}

const Search = ({ isSearchOpen, onClose }: SearchProps): JSX.Element => {
  const products = useRecoilValue(productsList);
  const [keyword, setKeyword] = useState("");
  const [filtered, setFiltered] = useState<typeof products>([]);

  useEffect(() => {
    if (!keyword.trim()) {
      setFiltered([]);
      return;
    }

    const result = products.filter((product) => product.title.toLowerCase().includes(keyword.toLowerCase()));
    setFiltered(result);
  }, [keyword, products]);

  return (
    <div className="relative w-full sm:w-auto">
      <input
        type="text"
        placeholder="검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className={`${
          isSearchOpen ? "top-16 opacity-100 z-10" : "top-4 -z-10 opacity-0"
        } fixed left-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white transition-all`}
      />
      {filtered.length > 0 && (
        <ul className="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600">
          {filtered.map((product) => (
            <li key={product.id} onClick={onClose}>
              <Link to={`/product/${product.id}`} className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700">
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
