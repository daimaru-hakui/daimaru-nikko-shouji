/*
  Warnings:

  - Added the required column `order_id` to the `shipping_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipping_histories" ADD COLUMN     "order_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "shipping_histories" ADD CONSTRAINT "shipping_histories_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
