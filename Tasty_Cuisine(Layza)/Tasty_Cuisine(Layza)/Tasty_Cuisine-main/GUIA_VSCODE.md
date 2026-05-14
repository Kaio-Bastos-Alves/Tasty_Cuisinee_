# 🚀 Guia: Como Rodar o Projeto Tasty Cuisine React no Visual Studio Code

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **Visual Studio Code** - [Download aqui](https://code.visualstudio.com/)
- **Git** (opcional, mas recomendado) - [Download aqui](https://git-scm.com/)

## Passo 1: Clonar ou Extrair o Projeto

### Opção A: Se você tem o arquivo ZIP

1. Extraia o arquivo `tasty-cuisine-react.zip` em uma pasta de sua escolha
2. Abra a pasta extraída

### Opção B: Se você tem um repositório Git

```bash
git clone <url-do-repositorio>
cd tasty-cuisine-react
```

## Passo 2: Abrir o Projeto no Visual Studio Code

1. Abra o **Visual Studio Code**
2. Clique em **File** → **Open Folder** (ou pressione `Ctrl+K Ctrl+O`)
3. Navegue até a pasta do projeto `tasty-cuisine-react` e clique em **Select Folder**

## Passo 3: Abrir o Terminal Integrado

1. No VS Code, pressione **Ctrl + `** (backtick) para abrir o terminal integrado
   - Ou vá em **View** → **Terminal**

2. Certifique-se de que está na pasta raiz do projeto:
   ```bash
   cd tasty-cuisine-react
   ```

## Passo 4: Instalar as Dependências

No terminal, execute:

```bash
npm install
```

Ou se você usar **pnpm** (mais rápido):

```bash
pnpm install
```

Ou se você use **yarn**:

```bash
yarn install
```

Isso vai instalar todas as dependências do projeto. Pode levar alguns minutos.

## Passo 5: Rodar o Servidor de Desenvolvimento

Após instalar as dependências, execute:

```bash
npm run dev
```

Ou com pnpm:

```bash
pnpm dev
```

Ou com yarn:

```bash
yarn dev
```

## Passo 6: Acessar o Projeto

Após executar o comando `dev`, você verá algo como:

```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

1. Abra seu navegador (Chrome, Firefox, Safari, Edge)
2. Acesse: **http://localhost:5173/**

Pronto! O projeto está rodando! 🎉

## Estrutura do Projeto

```
tasty-cuisine-react/
├── client/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── styles/          # Arquivos CSS
│   │   ├── hooks/           # Hooks customizados
│   │   ├── data/            # Dados das receitas
│   │   ├── App.jsx          # Componente principal
│   │   └── main.jsx         # Ponto de entrada
│   ├── index.html           # HTML principal
│   └── package.json         # Dependências
├── vite.config.ts           # Configuração do Vite
└── package.json             # Dependências do projeto
```

## Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria a build para produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run check` | Verifica erros de TypeScript |
| `npm run format` | Formata o código com Prettier |

## Dicas Importantes

### 1. **Hot Module Replacement (HMR)**
O Vite oferece HMR automático. Quando você salva um arquivo, a página atualiza automaticamente no navegador sem perder o estado da aplicação.

### 2. **Extensões Recomendadas para VS Code**
Instale estas extensões para melhor experiência:

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Prettier - Code formatter** - esbenp.prettier-vscode
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **Thunder Client** ou **REST Client** - para testar APIs

### 3. **Debugar no VS Code**
Para debugar diretamente no VS Code:

1. Crie um arquivo `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/client",
      "sourceMapPathOverride": {
        "/src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

2. Pressione `F5` para iniciar o debugger

### 4. **Parar o Servidor**
Para parar o servidor de desenvolvimento, pressione **Ctrl + C** no terminal.

## Troubleshooting

### Erro: "npm: command not found"
- Node.js não está instalado. Baixe em https://nodejs.org/

### Erro: "Port 5173 is already in use"
Execute em uma porta diferente:
```bash
npm run dev -- --port 3000
```

### Erro: "Module not found"
Reinstale as dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Página em branco
1. Abra o DevTools (F12)
2. Verifique o console para erros
3. Limpe o cache: **Ctrl + Shift + Delete**

## Estrutura de Páginas

O projeto possui as seguintes rotas:

- `/` - Home
- `/receitas` - Catálogo de receitas
- `/receita/:id` - Detalhe de uma receita
- `/chefes` - Galeria de chefes
- `/chef/:id` - Perfil do chef
- `/quem-somos` - Página sobre
- `/login` - Login
- `/perfil` - Perfil do usuário
- `/publicar-receita` - Publicar receita

## Próximos Passos

1. **Explorar o código**: Abra os arquivos em `client/src/` para entender a estrutura
2. **Fazer modificações**: Edite os componentes e veja as mudanças em tempo real
3. **Adicionar novas páginas**: Crie novos arquivos em `client/src/pages/`
4. **Customizar estilos**: Modifique os arquivos em `client/src/styles/`

## Suporte

Se encontrar problemas:

1. Verifique se Node.js está instalado: `node --version`
2. Verifique se npm está funcionando: `npm --version`
3. Limpe o cache: `npm cache clean --force`
4. Reinstale as dependências: `npm install`

Boa sorte! 🚀
