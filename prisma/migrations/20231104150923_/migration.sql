/*
  Warnings:

  - You are about to drop the column `processing` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_supplier_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "processing";

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
