import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getScents from '@/actions/get-scents';
import Category from './components/category';
import { Category as CategoryType } from '@/types';

const CategoryPage = async (
    { categories }:
    {
        categories: CategoryType[]
    }
  ) => {
    const products = await getProducts();
    const colors = await getColors();
    const scents = await getScents();
    
    return (
      <Category categories={categories} products={products} colors={colors} scents={scents} />
    );
  };

export default CategoryPage