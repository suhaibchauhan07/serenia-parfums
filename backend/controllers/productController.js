const supabase = require('../config/supabase');

exports.getProducts = async (req, res) => {
  try {
    // Get all categories first
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .eq('isActive', true);
    
    if (categoriesError) throw categoriesError;
    
    // First, get all products
    let productsQuery = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    // If category filter is provided
    if (req.query.category) {
      // Get product IDs for this category
      const { data: productIds, error: pcError } = await supabase
        .from('product_categories')
        .select('product_id')
        .eq('category_id', req.query.category);
      
      if (pcError) throw pcError;
      
      const ids = productIds.map(pc => pc.product_id);
      if (ids.length > 0) {
        productsQuery = productsQuery.in('id', ids);
      } else {
        // No products in category
        return res.json([]);
      }
    }

    const { data: products, error: productsError } = await productsQuery;

    if (productsError) throw productsError;

    // Now get all product-category mappings
    const { data: productCategories, error: pcError } = await supabase
      .from('product_categories')
      .select('product_id, category_id');

    if (pcError) throw pcError;

    // Map category IDs to products (with full category info)
    const productsWithCategories = products.map(product => {
      const productCatIds = productCategories
        .filter(pc => pc.product_id === product.id)
        .map(pc => pc.category_id);
      
      const productCats = categories.filter(cat => productCatIds.includes(cat.id));
      
      return {
        ...product,
        categoryIds: productCatIds,
        categories: productCats
      };
    });

    res.json(productsWithCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (productError) throw productError;
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Get category IDs and names for this product
    const { data: productCategories, error: pcError } = await supabase
      .from('product_categories')
      .select('category_id')
      .eq('product_id', product.id);

    if (pcError) throw pcError;
    
    // Fetch full category details
    const categoryIds = productCategories ? productCategories.map(pc => pc.category_id) : [];
    let categories = [];
    if (categoryIds.length > 0) {
      const { data: cats, error: catsError } = await supabase
        .from('categories')
        .select('*')
        .in('id', categoryIds);
      
      if (catsError) throw catsError;
      categories = cats;
    }

    const productWithCategories = {
      ...product,
      categoryIds: categoryIds,
      categories: categories
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

    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (productError) throw productError;

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

    const { data: product, error: productError } = await supabase
      .from('products')
      .update(productData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (productError) throw productError;

    if (categoryIds !== undefined) {
      // Delete old categories
      await supabase.from('product_categories').delete().eq('product_id', req.params.id);
      
      // Insert new categories if any
      if (categoryIds.length > 0) {
        const categoryInserts = categoryIds.map(catId => ({
          product_id: product.id,
          category_id: catId
        }));
        await supabase.from('product_categories').insert(categoryInserts);
      }
    }

    // Get updated categories
    const { data: productCategories, error: pcError } = await supabase
      .from('product_categories')
      .select('category_id')
      .eq('product_id', product.id);

    if (pcError) throw pcError;

    const productWithCategories = {
      ...product,
      categoryIds: productCategories ? productCategories.map(pc => pc.category_id) : []
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
