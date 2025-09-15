'use client';

import { useAuth } from '@/app/auth/context';

export function Header() {
  const { session } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0]?.[0]?.toUpperCase() || '';
  };

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-end p-4">
        {session && (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
            {getInitials(session.user.user_metadata.name || '')}
          </div>
        )}
      </div>
    </header>
  );
}
