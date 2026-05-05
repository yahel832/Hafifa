'use client';

import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { useState } from 'react';
import { Product, updateProduct } from '../models/Products';
import './menu.css';
import CreateProductButton from './create-product';
import "@fontsource/arimo/400.css";
import { useForm} from 'react-hook-form';
import { FormBody } from './form';

export const queryClient = new QueryClient();

let token: string | null = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem("token");
}

export default function MenuPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <WeeklyMenu />
    </QueryClientProvider>
  );
}

const daysOfWeek = [
  { english: 'sunday', hebrew: 'יום ראשון', date: "" },
  { english: 'monday', hebrew: 'יום שני', date: "" },
  { english: 'tuesday', hebrew: 'יום שלישי', date: "" },
  { english: 'wednesday', hebrew: 'יום רביעי', date: "" },
  { english: 'thursday', hebrew: 'יום חמישי', date: "" },
  { english: 'friday', hebrew: 'יום שישי', date: "" },
  { english: 'saturday', hebrew: 'יום שבת', date: "" },
];

const nextSevenDays = () => {
  const startIndex = new Date().getDay();
  const numItemsToShow = daysOfWeek.length;

  const circularItems = Array.from({ length: numItemsToShow }, (_, i) => {
    const index = (startIndex + i) % daysOfWeek.length;
    let modify = daysOfWeek[index]
    const doomDate = new Date();
    doomDate.setDate(doomDate.getDate() + i);
    modify.date = doomDate.toLocaleDateString() 
    return modify;
  });

  return circularItems;
};

const nextDays = nextSevenDays()

function WeeklyMenu() {
  return (
    <main className="weekly-menu">
      <div className="weekly-menu__content">
        {nextDays.map((day) => (
          <DaySection key={day.english} day={day} />
        ))}
      </div>
    </main>
  );
}

function DaySection({ day }: { day: typeof daysOfWeek[0] }) {

  const { isPending, isError, data } = useQuery({
    queryKey: ['products', day.english],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/products/?weekday=${day.english}`, {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
  });

  const isCurrDay = day.english === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()

  return (
    <section className="day-section">
      <div className='day-section__header'>
        <div>
          <h2 className="day-section__title">
            <span> {isCurrDay ? "היום, " : ""} </span>
          {day.hebrew}</h2>
          <h2 className="day-section__date">{day.date}</h2>
        </div>
        <div>
          { isCurrDay && (
            <CreateProductButton />
          )}
        </div>
      </div>

      {isPending && (
        <div className="day-section__loading">
          <p>טוען...</p>
        </div>
      )}

      {isError && (
        <div className="day-section__error">
          <p>שגיאה בטעינת הנתונים</p>
        </div>
      )}

      {data && data.products.length > 0 && (
        <div className="day-section__products">
          {data.products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {data && data.products.length === 0 && (
        <div className="day-section__empty">
          <p>אין מנות זמינות ליום זה</p>
        </div>
      )}
    </section>
  );
}



function ProductCard({ product }: { product: Product }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteConfirm = async () => {
    console.log('Delete product', product._id);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/products/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        }
      )
      setShowDeleteConfirm(false);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (error) {
      return (
        <div className="day-section__error">
          <p>שגיאה במהלך ניסיון המחיקה</p>
        </div>
      )
    }
  };

  return (
    <>
      <div className="product-card">
        <div>
          <img src={`/categories/${product.category}.jpg`} alt={product.category}></img>
        </div>
        <div className="text-container">
          <div className="product-card__header">
            <h3 className="product-card__title">{product.name}</h3>
          </div>
          <p className="product-card__description">{product.description}</p>
            <div className="product-card__actions">
              <button
                type="button"
                className="product-card__button"
                onClick={() => setShowEditModal(true)}
              >
                עריכה
              </button>
              <button
                type="button"
                className="product-card__button"
                onClick={() => setShowDeleteConfirm(true)}
              >
                מחיקה
              </button>
            </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal modal--confirm" onClick={(e) => e.stopPropagation()}>
            <br />
            <h3 className="modal__title">מחיקת מנה</h3>
            <p className="modal__text">האם אתה בטוח שברצונך למחוק את <strong>{product.name}</strong>?</p>
            <div className="modal__actions">
              <button
                className="modal__button modal__button--cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                ביטול
              </button>
              <button
                className="modal__button modal__button--delete"
                onClick={handleDeleteConfirm}
              >
                מחק
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditModal
          product={product}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}

function EditModal({ product, onClose }: { product: Product; onClose: () => void }) {

  const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors }
    } = useForm<{
        name: string;
        description: string;
        category: string;
        creator: string;
        weekdays: string[];
    }>({
      defaultValues: {
        name: product.name,
        description: product.description,
        category: product.category,
        creator: product.creator,
        weekdays: product.weekday
      }
    });

  const mutation = useMutation({
    mutationFn: (updatedProduct: updateProduct) => {
      const data = axios.put(`http://127.0.0.1:8000/products/${product._id}`, 
                      updatedProduct, 
                      {headers: { Authorization: `Bearer ${token}` }}
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const onSubmit = (data: { name: string; description: string; weekdays: string[]; category: string; creator: string; }) => {
    const newProduct: updateProduct = {
      name: data.name,
      description: data.description,
      weekday: data.weekdays,
      category: data.category,
      creator: data.creator
    }

    mutation.mutate(newProduct)
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <br />
        <h3 className="modal__title">עריכת מנה</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBody register={register} errors={errors} control={control}/>

          <br />
          <button type ="submit" className="modal__button modal__button--save">
            שמור
          </button>
          <button className="modal__button modal__button--cancel" onClick={onClose}>
            ביטול
          </button>
        </form>
      </div>
    </div>
  );
}
