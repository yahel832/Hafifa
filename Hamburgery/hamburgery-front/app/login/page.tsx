"use client";

import "./login.css";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import "@fontsource/arimo/400.css";
import "@fontsource/secular-one/400.css";
import axios from 'axios';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function LoginPage() {

  return (
    <div className="container">
      <div>
          {/* Welcome Section */}
          <div className="welcome-section">
            <p className="arimo" id="welcome-text">
              ברוכים הבאים,
            </p>
            <h1 className="secular" id="hamburgery-text">
              להמבורגרי
            </h1>
          </div>

          {/* Form Section */}
          <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Form />
          </QueryClientProvider>
          
        </div>
        <div className="img-parent">
          <img src="/gery.jpg" alt="gery hamburgery"></img>
      </div>
    </div>
  );
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const router = useRouter();

  const mutation = useMutation<any, Error, FormData>({
    mutationFn: (formData) => {
        const data = axios.post('http://127.0.0.1:8000/login/', formData);
        return data;
    },
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      window.location.href = '/menu';
    }
  });

  const onSubmit = (data: { username: string; password: string }) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    mutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="arimo">שם משתמש</label>
        <input {...register("username", { required: true })} />
        {errors.username && <p className="alert arimo">שדה חובה</p>}

        <label className="arimo">סיסמה</label>
        <input {...register("password", { required: true })} />
        {errors.password && <p className="alert arimo">שדה חובה</p>}

        <input type="submit" value={"התחברות"} className="arimo" />
        {mutation.isError && <label className="alert arimo">אחד או יותר מהפרטים שהזנת אינם נכונים</label>}
      </form>
    </>
  );
}



