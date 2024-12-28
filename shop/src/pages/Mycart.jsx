import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './Mycart.css';
import { getCart, removeCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function Mycart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  // 장바구니 데이터를 가져오는 Query
  const { isLoading, error, data: product } = useQuery({
    queryKey: ['carts', uid],
    queryFn: () => getCart(uid),
  });

  // 아이템 삭제를 위한 Mutation
  const { mutate: deleteItem } = useMutation({
    mutationFn: (itemId) => removeCart(uid, itemId),
    onSuccess: () => {
      // 데이터를 다시 가져오도록 쿼리 무효화
      queryClient.invalidateQueries(['carts', uid]);
    },
  });

  // 삭제 버튼 클릭 시 실행되는 핸들러
  const handleDelete = (itemId) => {
    deleteItem(itemId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <>
      <div className="cart-title">
        {/* 제목 추가 가능 */}
      </div>
      <div className="title">
        My Cart
      </div>
      <div className="item-lists">
        <table>
          <thead>
            <tr>
              <th>Product img</th>
              <th>Price</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {product?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>{item.price}</td>
                <td>{item.title}</td>
                <td>
                  <button 
                    type="button" 
                    onClick={() => handleDelete(item.id)} 
                    className="delete-btn p-2 text-2xl rounded-xl"
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button 
                    type="button"  
                    className="bg-blue-400 p-2 text-xl rounded-xl text-white hover:bg-blue-950 transition duration-200"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
