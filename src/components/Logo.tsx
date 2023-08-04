'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import blacklogo from '@public/connectient-logo.png';
import whiteLogo from '@public/connectient-logo-white.png';

const Logo = () => {
  const { theme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<boolean>();
  const [logo, setLogo] = useState<StaticImageData>(blacklogo);

  useEffect(() => {
    setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    if (theme === 'system') {
      systemTheme ? setLogo(whiteLogo) : setLogo(blacklogo);
    } else if (theme === 'dark') {
      setLogo(whiteLogo);
    } else {
      setLogo(blacklogo);
    }
  }, [systemTheme, theme]);

  return (
    <Link href="/">
      <Image
        src={logo}
        alt="Connectient logo, icon with two people communicating"
        className="w-36 md:w-44"
      />
    </Link>
  );
};

export default Logo;
