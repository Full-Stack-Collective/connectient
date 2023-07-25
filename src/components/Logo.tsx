import Image from 'next/image';
import logo from '@public/connectient-logo.png';
import Link from 'next/link';

const Logo = () => {
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
