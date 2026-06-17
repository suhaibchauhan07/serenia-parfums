-- First, insert categories and get their UUIDs (we'll use variables for simplicity!)
WITH inserted_categories AS (
  INSERT INTO categories (name, description, image, isActive)
  VALUES 
  ('Men''s Perfumes', 'Bold, masculine scents for him', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600', true),
  ('Women''s Perfumes', 'Elegant, feminine fragrances for her', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600', true),
  ('Unisex Perfumes', 'Perfect for everyone, any occasion', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600', true),
  ('Oud Collection', 'Deep, smoky, luxurious oud fragrances', 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=600', true),
  ('Luxury Collection', 'Premium, high-end fragrances', 'https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=600', true),
  ('Gift Sets', 'Perfect gifts for any celebration', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', true)
  RETURNING id, name
),
-- Now, insert products and get their UUIDs
inserted_products AS (
  INSERT INTO products (name, brand, price, description, image_url, stock)
  VALUES 
  ('Jannatul Firdaus', 'Adilqadri', 2499.00, 'A luxurious unisex attar inspired by paradise, blending fresh herbs, florals, amber, musk, and woody notes.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800', 50),
  ('Black Oudh', 'Ajmal', 3999.00, 'Deep, smoky, and rich oud fragrance with agarwood, amber, and spices.', 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800', 25),
  ('Floral Bloom', 'Forest Essentials', 1899.00, 'Delicate, feminine fragrance with jasmine, rose, and sandalwood.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800', 40),
  ('Royal Oudh', 'Rasasi', 4999.00, 'Opulent blend of rare agarwood, saffron, and musk.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800', 15),
  ('Fresh Citrus', 'Body Shop', 1299.00, 'Refreshing burst of lemon, bergamot, and mandarin.', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800', 60),
  ('Gift Set - Premium Trio', 'Serenia Parfums', 5999.00, 'Curated set of three best-selling perfumes.', 'https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=800', 30),
  ('Amber Nights', 'Amouage', 6499.00, 'Warm, sensual fragrance with amber, vanilla, and sandalwood.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800', 20),
  ('Rose Absolute', 'Jo Malone', 3299.00, 'Classic, elegant rose fragrance with hints of peony and white musk.', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&q=80&w=800', 35)
  RETURNING id, name
),
-- Now, map category names to IDs for easy linking
category_map AS (
  SELECT 
    id, 
    CASE name 
      WHEN 'Men''s Perfumes' THEN 'male'
      WHEN 'Women''s Perfumes' THEN 'female'
      WHEN 'Unisex Perfumes' THEN 'unisex'
      WHEN 'Oud Collection' THEN 'oud'
      WHEN 'Luxury Collection' THEN 'luxury'
      WHEN 'Gift Sets' THEN 'gift'
    END AS slug
  FROM inserted_categories
),
-- Map product names to IDs and the category slugs they should be in
product_category_map AS (
  SELECT 
    id AS product_id,
    CASE name 
      WHEN 'Jannatul Firdaus' THEN ARRAY['unisex', 'oud', 'luxury']
      WHEN 'Black Oudh' THEN ARRAY['male', 'oud']
      WHEN 'Floral Bloom' THEN ARRAY['female']
      WHEN 'Royal Oudh' THEN ARRAY['oud', 'luxury']
      WHEN 'Fresh Citrus' THEN ARRAY['male', 'unisex']
      WHEN 'Gift Set - Premium Trio' THEN ARRAY['gift']
      WHEN 'Amber Nights' THEN ARRAY['unisex', 'luxury']
      WHEN 'Rose Absolute' THEN ARRAY['female']
    END AS category_slugs
  FROM inserted_products
)
-- Finally, insert into product_categories table!
INSERT INTO product_categories (product_id, category_id)
SELECT 
  pcm.product_id,
  cm.id
FROM product_category_map pcm,
     unnest(pcm.category_slugs) AS slug,
     category_map cm
WHERE cm.slug = slug;
