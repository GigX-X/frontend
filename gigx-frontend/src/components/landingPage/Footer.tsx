import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function App() {
  return (
    <>
      <div className="w-screen h-10 bg-blue"></div>
      <Navbar className="bg-blue">
        <NavbarBrand>
          <p className="font-bold text-2xl text-primary-foreground font-atkinson">GIGGX</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant={"revBlue"} asChild>
              <Link href="https://github.com/hudhyfa">
                <GitHubLogoIcon className="mr-2 h-4 w-4"/> Github
              </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="w-screen h-10 bg-blue"></div>
    </>
  );
}
