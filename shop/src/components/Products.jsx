import { getProducts } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard.jsx";

function Products() {
  // Firebase에서 데이터를 가져오는 useQuery
  const { isLoading, error, data: products } = useQuery({
    queryKey: ['product'], // Query key 설정
    queryFn: getProducts,  // 데이터 가져오는 함수
  });

  return (
    <div >
      {isLoading && <p>Loading...</p>} {/* 로딩 중일 때 */}
      {error && <p>Error occurred!</p>} {/* 에러 발생 시 */}
      <ul className="flex justify-center items-center m-5">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product}  className = "m-5"/> // JSX를 반환
          ))}
      </ul>
    </div>
  );
}

export default Products;
