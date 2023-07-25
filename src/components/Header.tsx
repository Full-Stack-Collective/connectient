import Image from 'next/image';
import logo from '@public/connectient-logo.png';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-background">
      <div className="m-auto max-w-7xl w-full py-6 px-4 flex-1">
        <Link href="/">
          <Image
            src={logo}
            alt="Connectient logo, icon with two people communicating"
            width={240}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
