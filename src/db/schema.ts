import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Los precios se guardan como enteros en pesos colombianos (COP), sin decimales.

export const speciesEnum = pgEnum("species", ["perro", "gato"]);

export const orderStatusEnum = pgEnum("order_status", [
  "pendiente_pago",
  "pagado",
  "enviado",
  "entregado",
  "cancelado",
]);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  species: speciesEnum("species").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariants = pgTable(
  "product_variants",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    size: text("size").notNull(),
    color: text("color").notNull(),
    sku: text("sku").notNull().unique(),
    priceCop: integer("price_cop").notNull(),
    stock: integer("stock").notNull().default(0),
  },
  (t) => [uniqueIndex("variant_unique").on(t.productId, t.size, t.color)],
);

export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  position: integer("position").notNull().default(0),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerDocument: text("customer_document").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  department: text("department").notNull(),
  subtotalCop: integer("subtotal_cop").notNull(),
  shippingCop: integer("shipping_cop").notNull(),
  totalCop: integer("total_cop").notNull(),
  status: orderStatusEnum("status").notNull().default("pendiente_pago"),
  trackingNumber: text("tracking_number"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  variantId: integer("variant_id")
    .notNull()
    .references(() => productVariants.id),
  quantity: integer("quantity").notNull(),
  // Precio al momento de la compra, para que cambios futuros no alteren pedidos viejos.
  unitPriceCop: integer("unit_price_cop").notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  provider: text("provider").notNull().default("wompi"),
  reference: text("reference").notNull().unique(),
  status: text("status").notNull(),
  method: text("method"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
