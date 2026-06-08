import { Link } from 'wouter';
import '../styles/chef-card.css';

export default function ChefCard({ chef, id }) {
  const nome = chef.nomeCompleto || chef.nome;
  const especialidade = chef.nomeUsuario || chef.especialidade || '';
  const imagem = chef.fotoPerfil || chef.imagem || '/images/Chefe.png';
  const totalReceitas = chef.totalReceitas ?? chef.receitas?.length ?? 0;

  return (
    <Link href={`/chef/${id}`}>
      <article className="chef-card">
        <div className="chef-image">
          <img
            src={imagem}
            alt={nome}
            onError={(e) => {
              e.currentTarget.src = '/images/Chefe.png';
            }}
          />
          <div className="overlay">
            <h3>{nome}</h3>
            <p>{especialidade}</p>
          </div>
        </div>
        <div className="chef-info">
          <span>{totalReceitas} receitas</span>
        </div>
      </article>
    </Link>
  );
}
