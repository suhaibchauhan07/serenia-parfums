const { createClient } = require('@supabase/supabase-js');
const supabase = require('../config/supabase');

// Get all active categories
const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('isActive', true)
      .order('name');
    
    if (error) throw error;
    
    // Remove duplicate categories (keep first occurrence by name)
    const uniqueCategories = [];
    const seenNames = new Set();
    for (const cat of data) {
      if (!seenNames.has(cat.name)) {
        seenNames.add(cat.name);
        uniqueCategories.push(cat);
      }
    }
    
    res.json(uniqueCategories);
  } catch (err) {
    console.error('Error in getCategories:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all categories (admin only)
const getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a category (admin only)
const createCategory = async (req, res) => {
  try {
    const { name, description, image, isActive } = req.body;
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, description, image, isActive: isActive !== undefined ? isActive : true }])
      .select('*');
    
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a category (admin only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('categories')
      .update(req.body)
      .eq('id', id)
      .select('*');
    
    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a category (admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
