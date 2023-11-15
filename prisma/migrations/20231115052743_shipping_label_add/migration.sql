-- AlterTable
ALTER TABLE "order_details" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "shipping_histories" ADD COLUMN     "shipping_label" INTEGER;
