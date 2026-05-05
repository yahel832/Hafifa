'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product } from '../models/Products';
import './vote.css';
import "@fontsource/arimo/400.css";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

const queryClient = new QueryClient()

export default function getAllProducts() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <VotePage />
    </QueryClientProvider>
  )
}

const VotePage = () => {
    const queryClient = useQueryClient();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token");
    }
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
        const response = await axios.get(
            'http://127.0.0.1:8000/products/?by_vote=true', {
            headers: { Authorization: `Bearer ${token}` },
            }
        )
        return response.data
        },
    })

  const { data: currentVote } = useQuery({
    queryKey: ['currentUserVote'],
    queryFn: async () => {
      const response = await axios.get(
        'http://127.0.0.1:8000/users/curr_vote', {
        headers: { Authorization: `Bearer ${token}` },
        }
      )
      return response.data
    },
    enabled: !!token,
  })

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleChangeVote = async () => {
    if (!selectedProduct) return;
    await axios.patch(`http://127.0.0.1:8000/users/?product_id=${selectedProduct._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    queryClient.invalidateQueries({ queryKey: ['repoData'] });
    queryClient.invalidateQueries({ queryKey: ['currentUserVote'] });
    handleCloseModal();
  };

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const sortedProducts: Product[] = data;

  return (
    <main className="popular-products">
      <header className="popular-products__header">
          <h1>המאכל הכי אכיל</h1>
      </header>

      <table className="popular-products__table">
        <thead>
          <tr>
            <th className="product-rank">מיקום</th>
            <th className="product-name">שם המאכל</th>
            <th className="product-votes">הצבעות</th>
            <th className="product-writer">כותב המתכון</th>
            <th className="publish-date">תאריך השקה</th>
            <th className="last-updated">עודכן לאחרונה</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr 
              key={product._id} 
              onClick={() => handleRowClick(product)} 
              className={`clickable-row ${currentVote === product._id ? 'current-vote' : ''}`}
            >
              <td className="product-rank">{index + 1}</td>
              <td className="product-name">{product.name}</td>
              <td className="product-votes">{product.voteCount}</td>
              <td className="product-writer">{product.creator}</td>
              <td className="publish-date">{new Date(product.launch_date).toLocaleDateString()}</td>
              <td className="last-updated">{new Date(product.last_updated).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2>
                שנה את ההצבעה שלך
              </h2>
              <button className="modal__close" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal__content">
              <p>
                {`האם ברצונך לשנות את ההצבעה שלך למאכל ${selectedProduct.name}?`}
              </p>
            </div>
            <div className="modal__footer">
              <button className="modal__button modal__button--cancel" onClick={handleCloseModal}>
                ביטול
              </button>
              <button className="modal__button modal__button--confirm" onClick={handleChangeVote}>
                כן, שנה את ההצבעה
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

