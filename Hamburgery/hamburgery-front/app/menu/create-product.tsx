'use client';

import { useState } from 'react';
import './create-product.css';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../models/Products';
import axios from 'axios';
import { queryClient } from './menu';
import { useForm } from 'react-hook-form';
import { FormBody } from './form';

type CreateProductForm = {
  name: string;
  description: string;
  creator: string;
  weekday: string[];
  category: string;
};

const emptyForm: CreateProductForm = {
  name: '',
  description: '',
  creator: '',
  weekday: [],
  category: '',
};

let token: string | null = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem("token");
}

export default function CreateProductButton() {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (newProduct: createProduct) => {
      const data = axios.post(`http://127.0.0.1:8000/products/`, 
                      newProduct, 
                      {headers: { Authorization: `Bearer ${token}` }}
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
});

const onSubmit = (data: { name: string; description: string; weekdays: string[]; category: string; creator: string; }) => {
    const newProduct: createProduct = {
      name: data.name,
      description: data.description,
      weekday: data.weekdays,
      category: data.category,
      creator: data.creator
    }

    mutation.mutate(newProduct)
    handleClose();
    reset();
};

  const handleClose = () => {
    setIsOpen(false);
  };

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
        name: "",
        description: "",
        category: "",
        creator: "",
        weekdays: []
      }
    });

  return (
    <>
      <button className="create-product-btn" onClick={() => setIsOpen(true)}>
        + הוספה לתפריט
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal modal--edit" onClick={(e) => e.stopPropagation()}>
            <br />
            <h3 className="modal__title">הוספת מאכל</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormBody register={register} errors={errors} control={control}/>

                <br />
                <button type="submit" className="modal__button modal__button--save">
                הוספת מאכל
                </button>
                <button className="modal__button modal__button--cancel" onClick={handleClose}>
                ביטול
                </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
