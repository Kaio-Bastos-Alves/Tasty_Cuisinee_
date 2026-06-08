import { Link } from 'wouter';
import '../styles/recipe-card.css';

export default function RecipeCard({
  recipe,
  id,
  isFavorite,
  onToggleFavorite,
  isHighlight = false
}) {
  const getDifficultyClass = (difficulty) => {
    if (difficulty === 'Fácil') return 'tag-easy';
    if (difficulty === 'Médio') return 'tag-medium';
    return 'tag-hard';
  };

  const recipeImage = recipe.fotoReceita || recipe.imagem || '/images/receita1.jpg';

  return (
    <Link href={`/receita/${id}`}>
      <article className={`recipe-card ${isHighlight ? 'recipe-card-highlight' : ''}`}>
        <div className="recipe-card-image">
          <span className="badge">{recipe.categoria || 'Geral'}</span>
          <button
            className={`favorite-btn ${isFavorite ? 'liked' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(id);
            }}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remover favorito' : 'Adicionar aos favoritos'}
          >
            <span className="heart">{isFavorite ? '♥' : '♡'}</span>
          </button>
          <img src={recipeImage} alt={recipe.nome} />
        </div>
        <div className="recipe-card-content">
          <h3>{recipe.nome}</h3>
          <div className="recipe-info">
            <span>⏱ {recipe.tempo || '30 min'}</span>
            <span>👨‍🍳 {recipe.chef || 'Chef Tasty'}</span>
          </div>
          <span className={`tag ${getDifficultyClass(recipe.dificuldade || 'Médio')}`}>
            {recipe.dificuldade || 'Médio'}
          </span>
        </div>
      </article>
    </Link>
  );
}
