/*
  Warnings:

  - You are about to drop the column `shipping_address_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `shipping_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `shipping_details` table. All the data in the column will be lost.
  - Added the required column `shippingAddressId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_address_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping_address_id",
ADD COLUMN     "shippingAddressId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "shipping_addresses" DROP COLUMN "updated_at",
ADD COLUMN     "update_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "shipping_details" DROP COLUMN "updated_at",
ADD COLUMN     "update_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "shipping_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
