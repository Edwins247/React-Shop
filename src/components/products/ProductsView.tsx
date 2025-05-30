import { toCurrencyFormat } from "../../helpers/helpers";
import { IProduct } from "../../store/products";
import { useNavigate } from "react-router-dom";
import Rating from "../common/Rating";

interface ProductsViewProps {
  product: IProduct;
  onAddToCart: () => void;
}

const ProductsView = ({ product, onAddToCart }: ProductsViewProps): JSX.Element => {
  const navigate = useNavigate();
  const { title, description, price, image, rating } = product;

  return (
    <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
      <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
        <img src={image} alt={title} className="object-contain w-full h-72" />
      </figure>

      <div className="card-body px-1 lg:px-12">
        <h2 className="card-title">
          {title}
          <span className="badge badge-accent ml-2">NEW</span>
        </h2>

        <p>{description}</p>

        <Rating rate={rating?.rate} count={rating?.count} />

        <p className="mt-2 mb-4 text-3xl">{toCurrencyFormat(price)}</p>

        <div className="card-actions">
          <button className="btn btn-primary" onClick={onAddToCart}>
            장바구니에 담기
          </button>
          <button className="btn btn-outline ml-1" onClick={() => navigate("/cart")}>
            장바구니로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
