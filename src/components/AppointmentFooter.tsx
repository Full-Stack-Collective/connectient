import { ChevronLeft, Facebook, Instagram } from 'lucide-react';
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
    <footer>
      {website ? (
        <Link href={website} className={buttonVariants({ variant: 'outline' })}>
          <ChevronLeft />
          Back to {name}
        </Link>
      ) : null}

      <address className="ml-2 text-center md:text-start text-base font-light not-italic">
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
      <div className="w-full flex gap-2 md:flex-col justify-center md:justify-start md:items-end">
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
    </footer>
  );
};
