import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import {Button} from "@/components/ui/button";

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-2xl text-blue font-atkinson">GIGGX</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button variant={"allBlue"} asChild>
            <Link href="/sign-up">
              Register / Log In
            </Link>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
