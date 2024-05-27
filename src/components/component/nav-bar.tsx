import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
export function NavBar() {
  return (
    <div className="flex items-center justify-center h-16 px-4 bg-white dark:bg-gray-800 border-b-2 border-gray-300">
      <nav
        className="lg:flex 
       space-x-4"
      >
        <Link href="https://incorcentromedico.com.ar/">
          <Image
            src="https://incorcentromedico.com.ar/wp-content/uploads/2018/07/incor-logo-768x277%20(2)%20(1).png"
            width={180}
            height={100}
            className="logo-img"
            alt="Incor Logo"
          />
        </Link>
      </nav>
    </div>
   
  );
}
