-- Sacos de ejemplo para arrancar la tienda. Más adelante se podrán editar desde el panel de administración.
WITH p AS (
  INSERT INTO "products" ("slug", "name", "description", "species")
  VALUES ('saco-tejido-clasico-perro', 'Saco tejido clásico', 'Saco tejido de cuello alto, suave y abrigador para los días fríos. Fácil de poner y lavable a máquina.', 'perro')
  RETURNING "id"
)
INSERT INTO "product_variants" ("product_id", "size", "color", "sku", "price_cop", "stock")
SELECT p."id", v.* FROM p, (VALUES
  ('XS', 'Rojo', 'STC-ROJ-XS', 59900, 5),
  ('S', 'Rojo', 'STC-ROJ-S', 59900, 5),
  ('M', 'Rojo', 'STC-ROJ-M', 59900, 5),
  ('L', 'Rojo', 'STC-ROJ-L', 59900, 5),
  ('XL', 'Rojo', 'STC-ROJ-XL', 59900, 5),
  ('XS', 'Azul', 'STC-AZU-XS', 59900, 5),
  ('S', 'Azul', 'STC-AZU-S', 59900, 5),
  ('M', 'Azul', 'STC-AZU-M', 59900, 5),
  ('L', 'Azul', 'STC-AZU-L', 59900, 5),
  ('XL', 'Azul', 'STC-AZU-XL', 59900, 5),
  ('XS', 'Gris', 'STC-GRI-XS', 59900, 5),
  ('S', 'Gris', 'STC-GRI-S', 59900, 5),
  ('M', 'Gris', 'STC-GRI-M', 59900, 5),
  ('L', 'Gris', 'STC-GRI-L', 59900, 5),
  ('XL', 'Gris', 'STC-GRI-XL', 59900, 5)
) AS v("size", "color", "sku", "price_cop", "stock");
--> statement-breakpoint
WITH p AS (
  INSERT INTO "products" ("slug", "name", "description", "species")
  VALUES ('buzo-polar-perro', 'Buzo polar con capota', 'Buzo en tela polar con capota y bolsillo trasero. Ideal para paseos en la mañana y la noche.', 'perro')
  RETURNING "id"
)
INSERT INTO "product_variants" ("product_id", "size", "color", "sku", "price_cop", "stock")
SELECT p."id", v.* FROM p, (VALUES
  ('XS', 'Gris', 'BPP-GRI-XS', 69900, 5),
  ('S', 'Gris', 'BPP-GRI-S', 69900, 5),
  ('M', 'Gris', 'BPP-GRI-M', 69900, 5),
  ('L', 'Gris', 'BPP-GRI-L', 69900, 5),
  ('XL', 'Gris', 'BPP-GRI-XL', 69900, 5),
  ('XS', 'Verde', 'BPP-VER-XS', 69900, 5),
  ('S', 'Verde', 'BPP-VER-S', 69900, 5),
  ('M', 'Verde', 'BPP-VER-M', 69900, 5),
  ('L', 'Verde', 'BPP-VER-L', 69900, 5),
  ('XL', 'Verde', 'BPP-VER-XL', 69900, 5)
) AS v("size", "color", "sku", "price_cop", "stock");
--> statement-breakpoint
WITH p AS (
  INSERT INTO "products" ("slug", "name", "description", "species")
  VALUES ('chaqueta-impermeable-perro', 'Chaqueta impermeable', 'Chaqueta liviana que protege de la lluvia, con forro interior suave y abertura para el arnés.', 'perro')
  RETURNING "id"
)
INSERT INTO "product_variants" ("product_id", "size", "color", "sku", "price_cop", "stock")
SELECT p."id", v.* FROM p, (VALUES
  ('XS', 'Mostaza', 'CIP-MOS-XS', 89900, 5),
  ('S', 'Mostaza', 'CIP-MOS-S', 89900, 5),
  ('M', 'Mostaza', 'CIP-MOS-M', 89900, 5),
  ('L', 'Mostaza', 'CIP-MOS-L', 89900, 5),
  ('XL', 'Mostaza', 'CIP-MOS-XL', 89900, 5),
  ('XS', 'Azul', 'CIP-AZU-XS', 89900, 5),
  ('S', 'Azul', 'CIP-AZU-S', 89900, 5),
  ('M', 'Azul', 'CIP-AZU-M', 89900, 5),
  ('L', 'Azul', 'CIP-AZU-L', 89900, 5),
  ('XL', 'Azul', 'CIP-AZU-XL', 89900, 5)
) AS v("size", "color", "sku", "price_cop", "stock");
--> statement-breakpoint
WITH p AS (
  INSERT INTO "products" ("slug", "name", "description", "species")
  VALUES ('saco-tejido-gato', 'Saco tejido para gato', 'Saco tejido liviano que abriga sin incomodar. Pensado para gatos que sienten frío en casa.', 'gato')
  RETURNING "id"
)
INSERT INTO "product_variants" ("product_id", "size", "color", "sku", "price_cop", "stock")
SELECT p."id", v.* FROM p, (VALUES
  ('XS', 'Rosado', 'STG-ROS-XS', 49900, 5),
  ('S', 'Rosado', 'STG-ROS-S', 49900, 5),
  ('M', 'Rosado', 'STG-ROS-M', 49900, 5),
  ('XS', 'Gris', 'STG-GRI-XS', 49900, 5),
  ('S', 'Gris', 'STG-GRI-S', 49900, 5),
  ('M', 'Gris', 'STG-GRI-M', 49900, 5)
) AS v("size", "color", "sku", "price_cop", "stock");
--> statement-breakpoint
WITH p AS (
  INSERT INTO "products" ("slug", "name", "description", "species")
  VALUES ('buzo-suave-gato', 'Buzo suave para gato', 'Buzo de algodón suave y elástico, cómodo para dormir y jugar. Cierre de velcro en el pecho.', 'gato')
  RETURNING "id"
)
INSERT INTO "product_variants" ("product_id", "size", "color", "sku", "price_cop", "stock")
SELECT p."id", v.* FROM p, (VALUES
  ('XS', 'Beige', 'BSG-BEI-XS', 54900, 5),
  ('S', 'Beige', 'BSG-BEI-S', 54900, 5),
  ('M', 'Beige', 'BSG-BEI-M', 54900, 5),
  ('XS', 'Azul', 'BSG-AZU-XS', 54900, 5),
  ('S', 'Azul', 'BSG-AZU-S', 54900, 5),
  ('M', 'Azul', 'BSG-AZU-M', 54900, 5)
) AS v("size", "color", "sku", "price_cop", "stock");
