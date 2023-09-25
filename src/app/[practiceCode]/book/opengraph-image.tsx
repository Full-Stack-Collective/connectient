import { ImageResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
export const size = {
  width: 400,
  height: 400,
};
// Route segment config
export const runtime = 'edge';
export const contentType = 'image/png';

const supabase = createServerComponentClient<Database>({ cookies });

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
    const imageUrl = logo || '/connectient-logo.png';

    return new ImageResponse(
      (
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <Image
              src={imageUrl}
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
  }
}
