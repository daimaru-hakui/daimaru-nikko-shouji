"use client";
import React, { FC, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import StepperWithContent from "./stepper-with-content";
import OrderContentTable from "./order-content-table";
import OrderShipping from "./order-shipping";
import OrderConfirm from "./order-confirm";
import OrderCompletion from "./order-completion";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/index";
import axios from "axios";
import { Carts, OrderInputs } from "@/types/index";

const OrderForm: FC = () => {
  const router = useRouter();
  const carts = useStore((state) => state.carts);
  const resetCarts = useStore((state) => state.resetCarts);
  const setCartContents = useStore((state) => state.setCartContents);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const methods = useForm<OrderInputs>({
    defaultValues: {
      contents: [
        {
          supplierId: "",
          supplierName: "",
          productNumber: "",
          productName: "",
          color: "",
          size: "",
          quantity: "",
          processing: false,
          comment: "",
        },
      ],
    },
  });

  const { control, handleSubmit, reset } = methods;
  const { append, fields, remove } = useFieldArray({
    control,
    name: "contents",
  });

  const addTableRow = () => {
    append({
      supplierId: "",
      supplierName: "",
      productNumber: "",
      productName: "",
      color: "",
      size: "",
      quantity: "",
      processing: false,
      comment: "",
    });
  };

  const onClearContent = () => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    reset();
    resetCarts();
  };

  const onSubmit: SubmitHandler<OrderInputs> = (data) => {
    setCartContents(data);
    handleNext();
    window.scrollTo(0, 0);
  };

  const onClickRegisterHandler = async (carts: Carts) => {
    await axios.post('/api/orders', carts);
    handleNext();
    resetCarts();
    reset();
    router.refresh();
  };

  const onClickReturnButton = () => {
    switch (activeStep) {
      case 0:
        onClearContent();
        return;
      case 1:
        handlePrev();
        return;
      case 2:
        handlePrev();
        return;
      case 3:
        setActiveStep(0);
        return;
    }
  };

  return (
    <>
      <StepperWithContent
        activeStep={activeStep}
        setIsLastStep={setIsLastStep}
        setIsFirstStep={setIsFirstStep}
      />
      <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <div className="overflow-auto max-h-[calc(100vh-220px)] p-3">
            <OrderContentTable
              methods={methods}
              fields={fields}
              remove={remove}
            />
          </div>
        )}
        {activeStep === 1 && <OrderShipping />}
        {activeStep === 2 && <OrderConfirm />}
        {activeStep === 3 && <OrderCompletion />}

        {activeStep === 0 && (
          <div className="w-full mt-3 flex justify-center gap-3">
            <Button className="flex items-center gap-3" onClick={addTableRow}>
              <AiOutlinePlus />
              追加
            </Button>
          </div>
        )}

        <div className="w-full mt-20 pb-12 flex justify-center gap-3">
          <Button
            type="button"
            variant="outlined"
            className="w-full max-w-xs"
            onClick={onClickReturnButton}
          >
            {activeStep === 0
              ? "クリア"
              : activeStep === 1 || activeStep === 2
                ? "戻る"
                : "発注画面"}
          </Button>

          {activeStep === 0 && (
            <Button type="submit" className="w-full max-w-xs">
              次へ進む
            </Button>
          )}

          {activeStep === 1 && (
            <Button
              type="button"
              className="w-full max-w-xs"
              onClick={() => {
                handleNext();
                window.scrollTo(0, 0);
              }}
            >
              次へ進む
            </Button>
          )}

          {activeStep === 2 && (
            <Button
              type="button"
              className="w-full max-w-xs"
              onClick={() => onClickRegisterHandler(carts)}
            >
              登録
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default OrderForm;
