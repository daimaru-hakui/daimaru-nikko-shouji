-- CreateTable
CREATE TABLE "orders" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_number" TEXT NOT NULL DEFAULT '',
    "processing" BOOLEAN NOT NULL DEFAULT false,
    "shipping_address_id" BIGINT NOT NULL,
    "topic_name" TEXT NOT NULL DEFAULT '',
    "order_status" TEXT NOT NULL DEFAULT 'UNREAD',
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_history_id" BIGINT NOT NULL,
    "product_number" TEXT NOT NULL DEFAULT '',
    "product_name" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "size" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL DEFAULT '',
    "order_quantity" INTEGER NOT NULL DEFAULT 0,
    "supplier_id" BIGINT NOT NULL,
    "processing" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_addresses" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT '',
    "tel" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "post_code" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_details" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_detail_id" BIGINT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shipping_history_id" BIGINT NOT NULL,

    CONSTRAINT "shipping_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_histories" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shipping_date" DATE NOT NULL,
    "shipping_address_id" BIGINT,

    CONSTRAINT "shipping_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT '',
    "code" TEXT NOT NULL DEFAULT '-',
    "turn" SMALLINT NOT NULL DEFAULT 99,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_history_id_fkey" FOREIGN KEY ("order_history_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_details" ADD CONSTRAINT "shipping_details_order_detail_id_fkey" FOREIGN KEY ("order_detail_id") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_details" ADD CONSTRAINT "shipping_details_shipping_history_id_fkey" FOREIGN KEY ("shipping_history_id") REFERENCES "shipping_histories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_histories" ADD CONSTRAINT "shipping_histories_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
