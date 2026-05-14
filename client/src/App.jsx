import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Recipes from "./pages/Recipes.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import Chefs from "./pages/Chefs.jsx";
import ChefDetail from "./pages/ChefDetail.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.jsx";
import PublishRecipe from "./pages/PublishRecipe.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cadastro from './pages/Register.jsx';
import "./styles/app.css";

function ProtectedRoute({ component: Component, chefOnly = false }) {
  const [, setLocation] = useLocation();
  const isLogged = localStorage.getItem('isLogged') === 'true';
  const isChefe = localStorage.getItem('userType') === 'chefe';
  if (!isLogged) { setLocation('/login'); return null; }
  if (chefOnly && !isChefe) { setLocation('/'); return null; }
  return <Component />;
}

function Router() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <Route path="/receitas" component={() => <ProtectedRoute component={Recipes} />} />
          <Route path="/receita/:id" component={() => <ProtectedRoute component={RecipeDetail} />} />
          <Route path="/chefes" component={() => <ProtectedRoute component={Chefs} />} />
          <Route path="/chef/:id" component={() => <ProtectedRoute component={ChefDetail} />} />
          <Route path="/quem-somos" component={() => <ProtectedRoute component={About} />} />
          <Route path="/perfil" component={() => <ProtectedRoute component={Profile} />} />
          <Route path="/publicar-receita" component={() => <ProtectedRoute component={PublishRecipe} chefOnly={true} />} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
