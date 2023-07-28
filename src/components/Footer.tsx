import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import Logo from '@components/Logo';

type FooterProps = {
  menuList: {
    name: string;
    link: string;
  }[];
};

const Footer = ({ menuList }: FooterProps) => {
  return (
    <footer className="bg-background text-base">
      <div className="m-auto max-w-7xl w-full py-6 px-4 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4 md:flex-row">
          <div className="w-full flex flex-col gap-2 items-center md:items-start">
            <Logo />
            <address className="ml-2 text-center md:text-start">
              <p>1054 SS Erin Road, Debe.</p>
              <p>Trinidad & Tobago</p>
              <p>
                <a href="tel:8683871325" className="no-underline">
                  (868) 387-1325
                </a>
                {' | '}
                <a href="tel:8683613469" className="no-underline">
                  (868) 361-3469
                </a>
              </p>
            </address>
          </div>
          <div className="min-w-fit flex flex-col gap-2 items-center md:items-start">
            {menuList.map((menuItem) => (
              <Link
                key={menuItem.name}
                href={menuItem.link}
                className="hover:underline ease-in-out"
              >
                {menuItem.name}
              </Link>
            ))}
          </div>
          <div className="w-full flex gap-2 md:flex-col justify-center md:justify-start md:items-end">
            <a
              href="https://www.facebook.com/southtrinidaddentist/"
              className="no-underline flex gap-1 hover:underline ease-in-out"
            >
              <Facebook /> Facebook
            </a>
            <a
              href="https://www.instagram.com/essentialdentalsolutions/"
              className="no-underline flex gap-1 hover:underline ease-in-out"
            >
              <Instagram /> Instagram
            </a>
          </div>
        </div>
        <p className="mt-2 pt-2 border-t text-center">
          © Connectient {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
