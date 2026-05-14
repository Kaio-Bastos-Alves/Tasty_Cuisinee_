import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth.js';
import '../styles/header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogged, isChefe } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    setLocation('/');
    window.location.reload();
  };

  const navLinks = isLogged
    ? [
          { href: '/', label: 'Home' },
          { href: '/receitas', label: 'Receitas' },
          { href: '/chefes', label: 'Chefes' },
          { href: '/quem-somos', label: 'Quem Somos' },
          { href: '/perfil', label: 'Meu Perfil' },
          ...(isChefe ? [{ href: '/publicar-receita', label: 'Publicar Receita' }] : []),
        ]
    : [{ href: '/login', label: 'Login' }];

  return (
    <header className="header">
      <Link href="/" className="header-logo">Tasty Cuisine</Link>
      <nav className={`nav ${menuOpen ? 'nav-open' : 'nav-closed'}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
            </li>
          ))}
          {isLogged && <li><button onClick={handleLogout} className="nav-logout-btn">Sair</button></li>}
        </ul>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <img src="/images/fechar.png" alt="Fechar" /> : <img src="/images/menu.png" alt="Abrir" />}
      </button>
    </header>
  );
}
