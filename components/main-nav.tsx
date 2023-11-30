"use client";

import Link from "next/link"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Billboard } from '@/types';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from "lucide-react"

interface MainNavProps {
  data: Billboard[];
  className: string
}

const MainNav: React.FC<MainNavProps> = ({
  data, className
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = data.map((route) => ({
    href: `/Billboards/${route.id}`,
    label: route.lable,
    active: pathname === `/Billboards/${route.id}`,
    urlImage: route.urlImage
  }));

  return (
    <>
      <nav className={cn("mx-10 flex items-center space-x-4 lg:space-x-6",className)}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={
              `text-sm font-medium transition-colors hover:text-black
              ${route.active ? 'text-black' : 'text-neutral-500'}`
            }
          >
            {route.label}
        </Link>
        ))}
      </nav>
      <button className='ml-auto' onClick={()=> router.push('/Shop')}>
          <ShoppingBag size={25} className='ml-auto text-[#54551ce0]'/>
      </button>
      </>
  )
};

export default MainNav;