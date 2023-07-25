'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import logo from '@public/connectient-logo.png';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleMenuItemsClick = useCallback(() => {
    if (windowWidth < 768) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    handleMenuItemsClick();
  }, [handleMenuItemsClick]);

  return (
    <header className="bg-background">
      <div className="m-auto max-w-7xl w-full py-6 px-4 flex justify-between relative">
        <Link href="/">
          <Image
            src={logo}
            alt="Connectient logo, icon with two people communicating"
            className="w-32 md:w-44"
          />
        </Link>
        {!isMenuOpen && windowWidth < 768 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden"
          >
            <Menu className="w-12 h-12" />
          </Button>
        )}
        {isMenuOpen && windowWidth < 768 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden"
          >
            <X className="w-12 h-12" />
          </Button>
        )}
        {isMenuOpen && (
          <NavigationMenu className="bg-background px-6 absolute top-16 right-4 shadow rounded-lg md:relative md:top-0 md:right-0 md:shadow-none">
            <NavigationMenuList className="w-full h-64 flex flex-col gap-2 md:h-auto md:flex-row">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    onClick={handleMenuItemsClick}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    onClick={handleMenuItemsClick}
                  >
                    Features
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/appointment" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    onClick={handleMenuItemsClick}
                  >
                    Request Appointment
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
