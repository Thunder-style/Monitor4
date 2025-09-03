import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navItems } from '@/nav-items';

const DashboardNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-6 z-50">
      <div className="flex space-x-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
              "border border-cyan-400/30 backdrop-blur-sm",
              "hover:border-cyan-400/60 hover:bg-cyan-400/10",
              location.pathname === item.to
                ? "bg-cyan-400/20 border-cyan-400/60 text-cyan-300"
                : "bg-slate-900/60 text-cyan-100/80"
            )}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DashboardNav;
