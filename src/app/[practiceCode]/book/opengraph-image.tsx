import { ImageResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'; // Import createServerComponentClient
import { cookies } from 'next/headers';
import Image from 'next/image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const supabase = createServerComponentClient<Database>({ cookies }); // Initialize supabase

export default async function og({
  params,
}: {
  params: { practiceCode: string };
}) {
  const { practiceCode } = params;

  try {
    const { data: practice } = await supabase
      .from('Practice')
      .select()
      .eq('practice_code', practiceCode);

    if (!practice || practice.length === 0) {
      throw new Error('Practice data not found');
    }
    const [{ name, logo }] = practice;
    return new ImageResponse(
      (
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <Image
              className="flex"
              src={`${logo!}?w=${size.width}&h=${size.height}&auto=format&q=75`}
              alt={name}
              width={size.width}
              height={size.height}
            />
          </div>
          <div className="mt-2 text-center">{name}</div>
        </div>
      ),
    );
  } catch (error) {
    console.error(error);
    // Return a placeholder image or an error image here if needed
  }
}
