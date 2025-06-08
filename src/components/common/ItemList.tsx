import { Link } from "react-router-dom";
import { IProduct } from "../../store/products";
import { toCurrencyFormat } from "../../helpers/helpers";

interface ItemListProps {
  title: string;
  products: IProduct[];
}

const ItemList = ({ title, products }: ItemListProps): JSX.Element => {
  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 item_list" data-scroll="true">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
          >
            <figure className="flex h-80 bg-white overflow-hidden">
              <img src={product.image} alt="상품 이미지" className="transition-transform duration-300" />
            </figure>
            <div className="card-body bg-gray-100 dark:bg-gray-700">
              <p className="card-title text-base">{product.title}</p>
              <p className="text-base">{toCurrencyFormat(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ItemList;
