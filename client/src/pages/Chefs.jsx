import { useEffect, useMemo, useState } from 'react';
import { chefesAPI, receitasAPI } from '../lib/api.ts';
import ChefCard from '../components/ChefCard.jsx';
import '../styles/chefs.css';

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function Chefs() {
  const [chefes, setChefes] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setLoading(true);
      setFetchError('');
      try {
        const [chefesRes, receitasRes] = await Promise.all([chefesAPI.getAll(), receitasAPI.getAll()]);
        if (chefesRes.error || receitasRes.error) {
          if (mounted) setFetchError('Erro ao carregar os dados do banco de dados.');
        }
        if (mounted) {
          setChefes(normalizeList(chefesRes.data));
          setReceitas(normalizeList(receitasRes.data));
        }
      } catch (error) {
        if (mounted) {
          setFetchError('Erro ao carregar os dados do banco de dados.');
          setChefes([]);
          setReceitas([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const chefCards = useMemo(() => {
    return chefes.map((chef) => {
      const chefId = Number(chef.codChefe);
      const totalReceitas = receitas.filter((receita) => Number(receita?.chefe?.codChefe) === chefId).length;
      return { ...chef, totalReceitas };
    });
  }, [chefes, receitas]);

  if (loading) return <div className="chefs-page">Carregando chefes...</div>;

  return (
    <div className="chefs-page">
      <div className="chefs-header">
        <h1>Nossos Chefes</h1>
        <p>Conheça os mestres culinários por trás das nossas receitas incríveis.</p>
      </div>

      {fetchError ? <p style={{ color: '#9a3412', marginBottom: '16px' }}>{fetchError}</p> : null}

      <div className="chefs-grid">
        {chefCards.length > 0 ? (
          chefCards.map((chef) => (
            <ChefCard key={chef.codChefe} chef={chef} id={chef.codChefe} />
          ))
        ) : (
          <p>Nenhum chefe encontrado.</p>
        )}
      </div>

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
