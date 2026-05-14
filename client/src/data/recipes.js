export const receitas = {
  ratatouille: {
    nome: 'Ratatouille Provençal',
    imagem: '/images/RatatouilleProvençal.jpg',
    tempo: '45 min',
    chef: 'Marie Laurent',
    dificuldade: 'Médio',
    categoria: 'Jantar',
    descricao: 'Um clássico provençal cheio de sabor, com legumes frescos assados lentamente em azeite e ervas aromáticas.',
    ingredientes: ['2 abobrinhas', '2 berinjelas', '3 tomates', '1 pimentão vermelho', '1 cebola', 'Azeite', 'Alho', 'Tomilho', 'Sal e pimenta'],
    preparo: ['Corte todos os legumes em rodelas finas.', 'Refogue a cebola e o alho no azeite.', 'Adicione os legumes em camadas na panela.', 'Tempere com tomilho, sal e pimenta.', 'Cozinhe em fogo baixo por 30 minutos.'],
    dica: 'Use legumes da estação e corte-os na mesma espessura para garantir um cozimento uniforme.',
    relacionadas: ['risotto', 'salade', 'pasta']
  },
  risotto: {
    nome: 'Risotto ai Funghi Porcini',
    imagem: '/images/Risotto.jpg',
    tempo: '35 min',
    chef: 'Marco Bianchi',
    dificuldade: 'Médio',
    categoria: 'Almoço',
    descricao: 'Cremoso risotto italiano com cogumelos porcini secos, parmesão e manteiga.',
    ingredientes: ['300g de arroz arbóreo', '50g de cogumelos porcini secos', '1L de caldo de legumes', '1 cebola', '100ml de vinho branco', '50g de parmesão', '30g de manteiga'],
    preparo: ['Hidrate os cogumelos em água morna por 20 minutos.', 'Refogue a cebola na manteiga.', 'Adicione o arroz e toste por 2 minutos.', 'Acrescente o vinho e mexa até absorver.', 'Adicione o caldo aos poucos, mexendo sempre.', 'Finalize com parmesão e manteiga.'],
    dica: 'Nunca pare de mexer o risotto e adicione o caldo quente aos poucos — a paciência é o segredo da cremosidade.',
    relacionadas: ['ratatouille', 'pasta', 'salade']
  },
  salade: {
    nome: 'Salade Niçoise',
    imagem: '/images/SaladeNiçoise.jpg',
    tempo: '20 min',
    chef: 'Marie Laurent',
    dificuldade: 'Fácil',
    categoria: 'Almoço',
    descricao: 'Salada francesa tradicional com atum, ovos, azeitonas e legumes frescos.',
    ingredientes: ['200g de atum em conserva', '4 ovos cozidos', '200g de vagem', '2 tomates', 'Azeitonas pretas', 'Alface', 'Azeite', 'Vinagre', 'Mostarda'],
    preparo: ['Cozinhe os ovos e a vagem.', 'Monte a salada com a alface como base.', 'Disponha os ingredientes por cima.', 'Prepare o molho com azeite, vinagre e mostarda.', 'Regue a salada e sirva.'],
    dica: 'Prepare o molho com antecedência e deixe na geladeira — ele fica ainda mais saboroso depois de descansar.',
    relacionadas: ['ratatouille', 'risotto', 'pasta']
  },
  pasta: {
    nome: 'Pasta Primavera',
    imagem: '/images/PastaPrimavera.jpg',
    tempo: '25 min',
    chef: 'Sofia Romano',
    dificuldade: 'Fácil',
    categoria: 'Jantar',
    descricao: 'Massa leve com legumes da estação salteados no azeite e ervas frescas.',
    ingredientes: ['400g de massa', '1 abobrinha', '1 cenoura', '1 pimentão', 'Tomate cereja', 'Azeite', 'Alho', 'Manjericão', 'Parmesão'],
    preparo: ['Cozinhe a massa al dente.', 'Salteie os legumes no azeite com alho.', 'Misture a massa com os legumes.', 'Finalize com manjericão fresco e parmesão.'],
    dica: 'Reserve um pouco da água do cozimento da massa para soltar o molho e deixá-lo mais sedoso.',
    relacionadas: ['risotto', 'ratatouille', 'salade']
  },
  'frango-limao': { nome: 'Frango Grelhado ao Limão', imagem: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&h=300&fit=crop', tempo: '30 min', chef: 'Sofia Romano', dificuldade: 'Fácil', categoria: 'Almoço', descricao: 'Frango suculento marinado em limão e ervas, grelhado na perfeição.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'salmao-crosta': { nome: 'Salmão com Crosta de Ervas', imagem: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop', tempo: '25 min', chef: 'Pierre Dubois', dificuldade: 'Médio', categoria: 'Jantar', descricao: 'Filé de salmão com crosta crocante de ervas frescas ao forno.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'bowl-quinoa': { nome: 'Bowl de Quinoa com Legumes', imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', tempo: '20 min', chef: 'Marie Laurent', dificuldade: 'Fácil', categoria: 'Almoço', descricao: 'Bowl nutritivo com quinoa, legumes coloridos e molho de tahine.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'tacos-peixe': { nome: 'Tacos de Peixe com Abacate', imagem: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', tempo: '30 min', chef: 'Sofia Romano', dificuldade: 'Fácil', categoria: 'Jantar', descricao: 'Tacos leves com peixe grelhado, guacamole e coentro fresco.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'sopa-lentilha': { nome: 'Sopa de Lentilha com Cúrcuma', imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', tempo: '40 min', chef: 'Marco Bianchi', dificuldade: 'Fácil', categoria: 'Jantar', descricao: 'Sopa reconfortante de lentilha com cúrcuma, gengibre e limão.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'curry-grao': { nome: 'Curry de Grão-de-Bico', imagem: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', tempo: '35 min', chef: 'Pierre Dubois', dificuldade: 'Médio', categoria: 'Almoço', descricao: 'Curry aromático de grão-de-bico com leite de coco e especiarias indianas.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'omelete-espinafre': { nome: 'Omelete de Espinafre e Feta', imagem: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop', tempo: '15 min', chef: 'Marie Laurent', dificuldade: 'Fácil', categoria: 'Café da Manhã', descricao: 'Omelete fofa com espinafre fresco e queijo feta cremoso.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'stir-fry': { nome: 'Stir Fry de Legumes com Tofu', imagem: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', tempo: '20 min', chef: 'Marco Bianchi', dificuldade: 'Fácil', categoria: 'Jantar', descricao: 'Legumes salteados na wok com tofu crocante e molho de gengibre.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'poke-atum': { nome: 'Poke Bowl de Atum', imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', tempo: '20 min', chef: 'Sofia Romano', dificuldade: 'Fácil', categoria: 'Almoço', descricao: 'Bowl havaiano com atum fresco, arroz, abacate e molho ponzu.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'frango-tikka': { nome: 'Frango Tikka Masala Light', imagem: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', tempo: '45 min', chef: 'Pierre Dubois', dificuldade: 'Médio', categoria: 'Jantar', descricao: 'Versão leve do clássico indiano com iogurte natural e especiarias.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'wrap-peru': { nome: 'Wrap de Peru com Hummus', imagem: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop', tempo: '15 min', chef: 'Marie Laurent', dificuldade: 'Fácil', categoria: 'Almoço', descricao: 'Wrap integral com peito de peru, hummus caseiro e vegetais frescos.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'bacalhau-forno': { nome: 'Bacalhau ao Forno com Batata Doce', imagem: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop', tempo: '50 min', chef: 'Marco Bianchi', dificuldade: 'Médio', categoria: 'Jantar', descricao: 'Bacalhau assado com batata doce, azeite e ervas mediterrâneas.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'smoothie-bowl': { nome: 'Smoothie Bowl de Frutas Vermelhas', imagem: 'https://images.unsplash.com/photo-1490323914169-4b57d0054c0a?w=400&h=300&fit=crop', tempo: '10 min', chef: 'Sofia Romano', dificuldade: 'Fácil', categoria: 'Café da Manhã', descricao: 'Bowl cremoso de frutas vermelhas com granola, sementes e mel.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'carne-legumes': { nome: 'Filé com Legumes Assados', imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', tempo: '40 min', chef: 'Pierre Dubois', dificuldade: 'Médio', categoria: 'Jantar', descricao: 'Filé mignon grelhado com mix de legumes assados no forno.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'panqueca-aveia': { nome: 'Panqueca de Aveia com Banana', imagem: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', tempo: '20 min', chef: 'Marie Laurent', dificuldade: 'Fácil', categoria: 'Café da Manhã', descricao: 'Panquecas fofas sem farinha branca, feitas com aveia e banana madura.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'camarao-alho': { nome: 'Camarão ao Alho e Azeite', imagem: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop', tempo: '20 min', chef: 'Marco Bianchi', dificuldade: 'Fácil', categoria: 'Jantar', descricao: 'Camarões salteados no azeite com alho, limão e salsinha fresca.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'lasanha-abobrinha': { nome: 'Lasanha de Abobrinha', imagem: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop', tempo: '55 min', chef: 'Sofia Romano', dificuldade: 'Difícil', categoria: 'Jantar', descricao: 'Lasanha sem massa tradicional, com lâminas de abobrinha e molho de tomate caseiro.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'arroz-integral': { nome: 'Arroz Integral com Frango e Brócolis', imagem: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b1b5?w=400&h=300&fit=crop', tempo: '35 min', chef: 'Pierre Dubois', dificuldade: 'Fácil', categoria: 'Almoço', descricao: 'Prato completo e nutritivo com arroz integral, frango desfiado e brócolis.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'sopa-abobora': { nome: 'Sopa Cremosa de Abóbora', imagem: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop', tempo: '35 min', chef: 'Pierre Dubois', dificuldade: 'Fácil', categoria: 'Jantar', descricao: 'Sopa aveludada de abóbora com gengibre, leite de coco e noz-moscada.', ingredientes: [], preparo: [], dica: '', relacionadas: [] },
  'muffin-proteico': { nome: 'Muffin Proteico de Chocolate', imagem: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop', tempo: '30 min', chef: 'Marie Laurent', dificuldade: 'Fácil', categoria: 'Lanche', descricao: 'Muffin saudável rico em proteína com cacau, aveia e pasta de amendoim.', ingredientes: [], preparo: [], dica: '', relacionadas: [] }
};

export const chefes = {
  marie: {
    nome: 'Marie Laurent',
    especialidade: 'Culinária Francesa',
    localizacao: 'Paris, França',
    imagem: '/images/marie.jpg',
    bio: 'Marie Laurent é uma renomada chef francesa com mais de 20 anos de experiência na alta gastronomia. Formada no Le Cordon Bleu de Paris, ela combina técnicas clássicas com ingredientes frescos e sazonais para criar pratos que celebram a tradição provençal.',
    receitas: ['ratatouille', 'salade', 'bowl-quinoa', 'omelete-espinafre', 'wrap-peru', 'panqueca-aveia', 'muffin-proteico']
  },
  marco: {
    nome: 'Marco Bianchi',
    especialidade: 'Culinária Italiana',
    localizacao: 'Milão, Itália',
    imagem: '/images/marco.jpg',
    bio: 'Marco Bianchi é um chef italiano apaixonado por risottos e massas artesanais. Com 15 anos de experiência em restaurantes estrelados Michelin, ele traz autenticidade e sofisticação à cozinha italiana contemporânea.',
    receitas: ['risotto', 'sopa-lentilha', 'stir-fry', 'bacalhau-forno', 'camarao-alho']
  },
  sofia: {
    nome: 'Sofia Romano',
    especialidade: 'Culinária Mediterrânea',
    localizacao: 'Roma, Itália',
    imagem: '/images/sofia.jpg',
    bio: 'Sofia Romano é apaixonada pelos sabores do Mediterrâneo. Com uma abordagem focada em ingredientes simples e frescos, suas receitas são leves, coloridas e cheias de vida — perfeitas para quem busca equilíbrio entre sabor e saúde.',
    receitas: ['pasta', 'frango-limao', 'tacos-peixe', 'poke-atum', 'smoothie-bowl', 'lasanha-abobrinha']
  },
  pierre: {
    nome: 'Pierre Dubois',
    especialidade: 'Pâtisserie Saudável',
    localizacao: 'Paris, França',
    imagem: '/images/pierre.jpg',
    bio: 'Pierre Dubois revolucionou a pâtisserie francesa ao criar versões saudáveis dos clássicos doces franceses. Seu trabalho prova que é possível ter prazer na mesa sem abrir mão do bem-estar.',
    receitas: ['salmao-crosta', 'curry-grao', 'frango-tikka', 'carne-legumes', 'arroz-integral', 'sopa-abobora']
  }
};
