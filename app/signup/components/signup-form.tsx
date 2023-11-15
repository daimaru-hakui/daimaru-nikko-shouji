"use client";
import React, { FC } from "react";
import { Button, Input } from "@/lib/material-tailwind";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { DefaultSpinner } from "@/components/default-spinner";
import axios from "axios";

type Inputs = {
  email: string;
  password: string;
};

const SignupForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signUpHandler(data);
  };

  const signUpHandler = async (data: Inputs) => {
    const { email, password } = data;
    return
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await userCreateHandler({ id: user.uid, email: user.email });
    } catch (error) {
      console.error(error);
    }
  };

  const userCreateHandler = async (data: {
    id: string;
    email: string | null;
  }) => {
    const res = await axios.post("/api/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const a = await res.data
    console.log("res", a);
  };

  return (
    <>
      <DefaultSpinner />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="text-center">SignUp</div>
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

export default SignupForm;
