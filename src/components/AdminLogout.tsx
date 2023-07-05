/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const AdminLogout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      <button onClick={handleSignOut}>Log Out</button>
    </div>
  );
};

export default AdminLogout;
