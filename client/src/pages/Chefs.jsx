import { useState, useEffect } from 'react';
import { chefesAPI } from '../lib/api.ts';
import ChefCard from '../components/ChefCard.jsx';
import '../styles/chefs.css';

export default function Chefs() {
  const [chefes, setChefes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chefesAPI.getAll().then(res => {
      if (res.data) setChefes(res.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="chefs-page">Carregando chefes...</div>;

  return (
    <div className="chefs-page">
      <div className="chefs-header">
        <h1>Nossos Chefes</h1>
        <p>Conheça os mestres culinários por trás das nossas receitas incríveis.</p>
      </div>

      <div className="chefs-grid">
        {chefes.map(chef => (
          <ChefCard key={chef.codChefe} chef={chef} id={chef.codChefe} />
        ))}
      </div>

      {/* SEÇÃO SOBRE OS CHEFES - TRADIÇÃO */}
      <section className="tradicao">
        <div className="tradicao-texto">
          <h2>A tradição encontra a inovação</h2>
          <p>
            Nossos chefs são profissionais experientes que combinam técnicas clássicas da culinária francesa e italiana com uma abordagem contemporânea focada em saúde e bem-estar.
          </p>
          <p>
            Cada receita é cuidadosamente desenvolvida para oferecer o equilíbrio perfeito entre sabor, nutrição e praticidade, tornando a alimentação saudável acessível a todos.
          </p>
          <p>
            Da Provence à Toscana, trazemos os melhores elementos da gastronomia europeia para a sua cozinha.
          </p>
        </div>

        <div className="tradicao-imagens">
          <img src="/images/chefe.jpg" alt="Chefe cozinhando" />
          <img src="/images/pratos.jpg" alt="Pratos frescos" />
        </div>
      </section>
    </div>
  );
}
