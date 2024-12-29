import { getProducts } from "../api/firebase.js";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard.jsx";

function Products() {
  // Firebase에서 데이터를 가져오는 useQuery
  const { isLoading, error, data: products } = useQuery({
    queryKey: ['product'],  // 배열 형태로 queryKey 설정
    queryFn: getProducts,   // queryFn
  });

  return (
    <>
      {isLoading && <p>Loading products...</p>} {/* 로딩 중일 때 메시지 수정 */}
      {error && <p>Failed to load products. Please try again later.{error}</p>} {/* 에러 발생 시 메시지 수정 */}
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 items-center justify-center">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} className="m-5" />
          ))
        ) : (
          <p>No products available.</p>  
        )}
      </ul>
    </>
  );
}

export default Products;
