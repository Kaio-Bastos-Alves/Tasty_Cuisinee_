import { Link } from 'wouter';
import '../styles/not-found.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>Desculpe, a página que você está procurando não existe.</p>
        <Link href="/" className="btn btn-primary">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
