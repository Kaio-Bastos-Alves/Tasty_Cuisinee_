import '../styles/about.css';

export default function About() {
  return (
    <div className="about-page">
      {/* TÍTULO DA PÁGINA */}
      <div className="titulo quem-somos-titulo">
        <h1>Quem Somos</h1>
        <p>Conheça a história e os valores por trás da Tasty Cuisine.</p>
      </div>

      {/* NOSSA HISTÓRIA */}
      <section className="tradicao">
        <div className="tradicao-imagens">
          <img src="/images/historia.jpg" alt="Nossa História" />
        </div>

        <div className="tradicao-texto">
          <h2>Nossa História</h2>
          <p>
            A Tasty Cuisine nasceu em 2024 como um projeto de Trabalho de Conclusão de Curso (TCC), idealizado por um grupo de estudantes do ensino médio técnico em Informática.
          </p>
          <p>
            Unindo criatividade, conhecimento tecnológico e paixão pela culinária saudável, o projeto surgiu com o propósito de desenvolver uma plataforma digital moderna e acessível.
          </p>
          <p>
            Desde o início, a ideia foi ir além de um simples site de receitas, criando uma experiência interativa que conectasse pessoas a um estilo de vida mais equilibrado.
          </p>
        </div>
      </section>

      {/* NOSSOS FUNDADORES */}
      <section className="tradicao">
        <div className="tradicao-texto">
          <h2>Nossos Fundadores</h2>
          <p>
            Com dedicação e talento, os fundadores da Tasty Cuisine transformaram ideias simples em uma plataforma completa e inspiradora.
          </p>
          <p>
            Cada receita, dica e conteúdo é desenvolvido com o mesmo cuidado e empenho presentes desde o primeiro dia, refletindo o compromisso da equipe em unir sabor, saúde e inovação.
          </p>
          <p>
            Nossa missão é proporcionar momentos mágicos e inesquecíveis a cada usuário que entra em nosso site. Venha nos visitar e descubra o sabor da magia em cada receita!
          </p>
        </div>

        <div className="tradicao-imagens">
          <img src="/images/fundadores.jpg" alt="Nossos Fundadores" />
        </div>
      </section>

      {/* NOSSA VISÃO */}
      <section className="delicias">
        <div style={{ textAlign: 'center' }}>
          <h2>Nossa Visão</h2>
          <p>Transformando a forma como as pessoas se relacionam com a alimentação saudável.</p>
        </div>

        <div className="vision-cards">
          <div className="vision-card">
            <div className="vision-icon">🌱</div>
            <h3>Sustentabilidade</h3>
            <p>Promovemos receitas que respeitam o meio ambiente e utilizam ingredientes locais e sazonais.</p>
          </div>

          <div className="vision-card">
            <div className="vision-icon">💚</div>
            <h3>Bem-estar</h3>
            <p>Cada receita é pensada para nutrir o corpo e a alma, proporcionando saúde e prazer em cada refeição.</p>
          </div>

          <div className="vision-card">
            <div className="vision-icon">🤝</div>
            <h3>Comunidade</h3>
            <p>Conectamos pessoas através da paixão pela culinária, criando uma rede de apoio e inspiração mútua.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
