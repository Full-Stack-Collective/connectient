'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';
import { Menu, X } from 'lucide-react';

import Logo from '@components/Logo';
import ThemeModeToggle from '@components/ThemeModeToggle';

type HeaderProps = {
  menuList: {
    name: string;
    link: string;
  }[];
};

const Header = ({ menuList }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();

  const handleMenuItemsClick = useCallback(() => {
    if (windowWidth < 768) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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

  const renderNavigationMenuItems = () => {
    return menuList.map((menuItem) => {
      if (menuItem.name === 'Logout') {
        const handleLogout = () => {
          supabase.auth
            .signOut()
            .then(() => {
              toast({
                title: 'Admin Departure Confirmed',
                description:
                  'Time to recharge and return for more seamless appointments!',
              });
              router.refresh();
            })
            .finally(() => {
              handleMenuItemsClick();
            });
        };

        return (
          <NavigationMenuItem key={menuItem.name}>
            <Link href={menuItem.link} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={handleLogout}
              >
                {menuItem.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        );
      }
      return (
        <NavigationMenuItem key={menuItem.name}>
          <Link href={menuItem.link} legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={handleMenuItemsClick}
            >
              {menuItem.name}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      );
    });
  };

  return (
    <header className="bg-background">
      <div className="m-auto max-w-7xl w-full py-6 px-4 flex justify-between relative">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeModeToggle />
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
                {renderNavigationMenuItems()}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
