
import { FileText } from "lucide-react";
import React from "react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./planBadge";

function Header() {
  return (
    <>
      <nav className="container relative flex items-center justify-between w-full h-15 py-2 lg:py-4  mx-auto ">
        <NavLink
          href={"/"}
          className="flex items-center text-gray-900  gap-x-1 lg:flex-1"
        >
          {" "}
          <div
            className="logo w-5 h-5 lg:w-8 lg:h-8 
        hover:rotate-24 transform transition duration-300 ease-in-out"
          >
            <FileText />
          </div>
          <span className=" text-gray-900 lg:xl font-extrabold ">
            {" "}
            Doc-Summarizer
          </span>{" "}
        </NavLink>
        <div className="flex gap-4 lg:gap-12  lg:flex-1 lg:justify-center lg:items-center">
          <a href={"#pricing"}>Pricing</a>
          <SignedIn>
            {" "}
            <NavLink href={"/dashboard"}>Summaries</NavLink>
          </SignedIn>
        </div>
        <div className="signup flex lg:justify-end lg:flex-1 lg:items-center gap-2 lg:gap-4">
          <SignedIn>
            <div>
              <NavLink href={"/upload"}>Upload Pdf</NavLink>
            </div>
            <PlanBadge/>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </SignedIn>
          <SignedOut>
            <div>
              <NavLink href={"/sign-in"}>Signin</NavLink>
            </div>
          </SignedOut>
        </div>
      </nav>
    </>
  );
}

export default Header;
