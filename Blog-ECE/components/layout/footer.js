import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link"
import logotailwind from "../../public/tailwind_logo.png"

import Social from "../Social";

const Footer = () => {
  const router = useRouter();
  return (
    <footer aria-label="Site Footer" className="bg-primary w-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <Link href="/">
              <Image src={logotailwind} alt="logo JEECE" width="75px" height="75px" />
            </Link>
          </div>
          <div className="ml-20">
            <Social />
          </div>
          <p className="mt-4 text-center text-sm dark:text-white text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>


  );
};

export default Footer;
