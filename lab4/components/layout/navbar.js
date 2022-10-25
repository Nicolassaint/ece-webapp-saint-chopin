import * as React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div class="bg-gray-700">
      <div class="mx-auto max-w-xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="hidden sm:ml-50 sm:block">
              <div class="flex space-x-10">
                <Link
                  href="/"
                  classname="hover:bg-gray-700 text-gray-300 hover:text-white  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  classname="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>

                <Link
                  href="/contacts"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contacts
                </Link>

                <Link
                  href="/articles"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
