const supabase = require('../config/supabase');

// Helper function to get category IDs for a product
const getCategoryIdsForProduct = async (productId) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('category_id')
      .eq('product_id', productId);
    
    if (error) throw error;
    return data ? data.map(item => item.category_id) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Add categoryIds to each product
    const productsWithCategories = await Promise.all(
      data.map(async (product) => ({
        ...product,
        categoryIds: await getCategoryIdsForProduct(product.id)
      }))
    );

    res.json(productsWithCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Product not found' });

    // Add categoryIds to product
    const productWithCategories = {
      ...data,
      categoryIds: await getCategoryIdsForProduct(data.id)
    };

    res.json(productWithCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { categoryIds, ...productData } = req.body;

    // Insert product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (productError) throw productError;

    // Insert category associations if provided
    if (categoryIds && categoryIds.length > 0) {
      const categoryInserts = categoryIds.map(catId => ({
        product_id: product.id,
        category_id: catId
      }));

      const { error: categoryError } = await supabase
        .from('product_categories')
        .insert(categoryInserts);

      if (categoryError) throw categoryError;
    }

    // Return product with category IDs
    const productWithCategories = {
      ...product,
      categoryIds: categoryIds || []
    };

    res.status(201).json(productWithCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { categoryIds, ...productData } = req.body;

    // Update product
    const { data: product, error: productError } = await supabase
      .from('products')
      .update(productData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (productError) throw productError;

    // Update categories if provided
    if (categoryIds !== undefined) {
      // Delete existing categories
      await supabase.from('product_categories').delete().eq('product_id', req.params.id);

      // Insert new categories
      if (categoryIds.length > 0) {
        const categoryInserts = categoryIds.map(catId => ({
          product_id: product.id,
          category_id: catId
        }));

        await supabase.from('product_categories').insert(categoryInserts);
      }
    }

    const productWithCategories = {
      ...product,
      categoryIds: categoryIds || await getCategoryIdsForProduct(product.id)
    };

    res.json(productWithCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
