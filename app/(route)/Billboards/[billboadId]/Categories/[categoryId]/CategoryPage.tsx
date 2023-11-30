"use client";
import Category from './components/category';
import { useEffect, useState } from 'react';
import { Category as CategoryType } from '@/types';
import { Color, Product, Scent } from '@/types';
import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getScents from '@/actions/get-scents';


interface PageProps {
  categories: CategoryType[];
}

const CategoryPage: React.FC<PageProps> = ({ categories }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [scents, setScents] = useState<Scent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await getProducts();
      const fetchedColors = await getColors();
      const fetchedScents = await getScents();

      setProducts(fetchedProducts);
      setColors(fetchedColors);
      setScents(fetchedScents);
    };

    fetchData();
  }, []);

  return (
    <Category
      categories={categories}
      products={products}
      colors={colors}
      scents={scents}
    />
  );
};

export default CategoryPage;