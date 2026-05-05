'use client';

import { usePathname } from 'next/navigation';
import './navbar.css';

const links = [
  { href: '/menu', label: 'התפריט השבועי' },
  { href: '/vote', label: 'הצביעו והשפיעו' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`${"link"} ${pathname === href ? "active" : ''}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
