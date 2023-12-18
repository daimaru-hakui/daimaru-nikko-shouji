/*
  Warnings:

  - The `order_status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "order_status",
ADD COLUMN     "order_status" "OrderRole" NOT NULL DEFAULT 'UNREAD';
