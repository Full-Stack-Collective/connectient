import Link from 'next/link';
import Logo from '@components/Logo';

type FooterProps = {
  menuList?: {
    name: string;
    link: string;
  }[];
  logoLink: string;
  isUserPage: boolean;
};

const Footer = ({ menuList, logoLink, isUserPage = false }: FooterProps) => {
  return (
    <footer className="bg-background text-base flex flex-col gap-4 md:gap-2">
      <div className="m-auto max-w-7xl w-full pt-6 md:pt-4 pb-1 px-4 flex flex-col gap-4 md:flex-row">
        <div className="w-full flex flex-col gap-2 px-5 items-center md:items-start">
          {isUserPage ? <p className="-mx-4">Powered by</p> : null}
          <Logo link={logoLink} />
        </div>
        {!isUserPage ? (
          <div className="min-w-fit flex flex-col gap-2 items-center md:items-start">
            {menuList?.map((menuItem) => (
              <Link
                key={menuItem.name}
                href={menuItem.link}
                className="hover:underline transition-all ease-in-out"
              >
                {menuItem.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <p className="pb-2 text-center text-sm text-muted-foreground opacity-50">
        &copy;{new Date().getFullYear()} Full Stack Collective
      </p>
    </footer>
  );
};

export default Footer;
