import  getBillboard  from '@/actions/get-billboard'
import Image from 'next/image';
import getCategories from '@/actions/get-categories';

import CategoryPage from './Categories/[categoryId]/CategoryPage';
import { Category } from '@/types';

 const Page = async (
  {params}:{params:{billboadId:string}}
 ) => {

    const billboad = await getBillboard(params.billboadId)
    const allCategories = await getCategories()
    const categories: Category[] = [] ;
    allCategories.map((category)=>{
      
      if (category.billboardId === params.billboadId)
      {
        // console.log("cateeeeeeeeeeee", category.billboardId);
        categories.push(category)
      }
    })
    console.log("categories=======================================================>",categories);
    console.log("params",billboad);
    
  return (
    <div className='w-[100%]'>
            <Image src={billboad.urlImage} priority={false} alt="logo" width={1400} height={100} 
            className='h-[440px]'/>
      <CategoryPage categories={categories}/>
    </div>
  )
}
export default Page