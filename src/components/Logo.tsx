'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import blacklogo from '@public/connectient-logo.png';
import whiteLogo from '@public/connectient-logo-white.png';

const Logo = () => {
  const { theme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<MediaQueryList>();

  useEffect(() => {
    setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)'));
  }, []);

  const getLogoAsPerTheme = (): StaticImageData => {
    if (theme === 'light') {
      return blacklogo;
    } else if (theme === 'dark') {
      return whiteLogo;
    } else {
      if (systemTheme && systemTheme.matches) {
        return whiteLogo;
      } else {
        return blacklogo;
      }
    }
  };
  return (
    <Link href="/">
      <Image
        src={getLogoAsPerTheme()}
        alt="Connectient logo, icon with two people communicating"
        className="w-36 md:w-44"
      />
    </Link>
  );
};

export default Logo;
