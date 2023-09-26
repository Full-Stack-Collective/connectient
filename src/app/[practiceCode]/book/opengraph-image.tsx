/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const size = {
  width: 800,
  height: 500,
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
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              width={size.width}
              height={size.height}
            />
          </div>
          <div style={{ fontSize: 40, color: 'black' }}>{name}</div>
        </div>
      ),
    );
  } catch (error) {
    console.error(error);
  }
}
