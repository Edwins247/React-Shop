import { Link } from "react-router-dom";

interface ErrorProps {
  message?: string;
}

const Error = ({ message = "상품 정보를 불러오는 중 오류가 발생했습니다." }: ErrorProps): JSX.Element => (
  <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto text-center space-y-4">
    <p className="text-lg font-semibold text-error">{message}</p>
    <p className="text-gray-500">잠시 후 다시 시도해주세요.</p>
    <Link to="/" className="btn btn-primary mt-2">
      홈으로 돌아가기
    </Link>
  </section>
);

export default Error;
