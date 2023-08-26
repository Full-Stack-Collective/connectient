import { ChevronRight, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

type PracticeContactInfo = {
  name: string;
  streetAddress?: string;
  city?: string;
  phone: string;
  instagram?: string;
  facebook?: string;
  website?: string;
};

export const AppointmentFooter = ({
  name,
  streetAddress,
  city,
  phone,
  instagram,
  facebook,
  website,
}: PracticeContactInfo) => {
  return (
    <footer className="w-full max-w-7xl bg-background text-sm">
      <div className="m-auto pt-6 md:pt-4 pb-1 px-4 flex flex-col gap-4 md:flex-row justify-center items-stretch">
        {website ? (
          <Link
            href={website}
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            To the {name} website
            <ChevronRight />
          </Link>
        ) : null}

        <address className="w-full text-center md:text-start not-italic flex flex-col gap-1 justify-center items-center">
          <p>{name}</p>
          <p>{streetAddress}</p>
          <p>{city}</p>
          <p>
            <a
              href={`tel:${phone}}`}
              className="no-underline transition-all hover:underline ease-in-out"
            >
              {phone}
            </a>
          </p>
        </address>
        <div className="flex gap-2 md:flex-col justify-center md:justify-start md:items-end">
          {facebook ? (
            <a
              href={`https://www.facebook.com/${facebook}/`}
              className="no-underline transition-all flex gap-1 hover:underline ease-in-out"
            >
              <Facebook /> Facebook
            </a>
          ) : null}
          {instagram ? (
            <a
              href={`https://www.instagram.com/${instagram}`}
              className="no-underline transition-all flex gap-1 hover:underline ease-in-out"
            >
              <Instagram /> Instagram
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
};
