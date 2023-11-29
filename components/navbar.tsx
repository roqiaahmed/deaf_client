import getBillboards from '@/actions/get-billbordes';
import MainNav from './main-nav';
import Image from 'next/image';
import logo from '@/public/logo.ico';

async function Navbar() {
const billboards = await getBillboards();
console.log("billboards 5 ====>",billboards);

  return (
    <div className='flex h-36 items-center px-4'>
      <Image src={logo} alt="logo" width={100} height={100} />
      <MainNav className="ml-[10%]" data={billboards}/>
    </div>
  )
}
export default Navbar