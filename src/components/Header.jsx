// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationUserMenu } from '@/components/ui/navigation-menu';
import { Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[#1a6b4a] hover:text-[#0f4a33] transition-colors">
          <Home className="w-5 h-5" />
          <span>Skim Pintar</span>
        </Link>
        
        <NavigationUserMenu />
      </div>
    </header>
  );
}