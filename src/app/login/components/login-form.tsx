'use client';
import React, { FC } from 'react';
import { Button, Input } from '@/libs/material-tailwind';
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signOut } from 'next-auth/react';
import { DefaultSpinner } from '@/app/components/default-spinner';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInHandler(data);
  };

  const signInHandler = async (data: Inputs) => {
    const { email, password } = data;
    try {
      const userCredential =
        await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log(idToken);
      await signIn('credentials', {
        idToken,
        callbackUrl: '/dashboard'
      });

    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <>
      <DefaultSpinner />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mt-6 w-full">
          <Input
            crossOrigin={undefined}
            label="email"
            type="text"
            className="min-w-0"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className="text-red-500">emailを入力してください</div>
          )}
        </div>
        <div className="mt-6">
          <Input
            crossOrigin={undefined}
            label="password"
            type="password"
            className="w-full"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="text-red-500">passwordを入力してください</div>
          )}
        </div>
        <Button type="submit" color="blue" className="mt-6" fullWidth>
          ログイン
        </Button>
      </form>
    </>
  );
};

export default LoginForm;