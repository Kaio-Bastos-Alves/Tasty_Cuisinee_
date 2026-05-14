export function useAuth() {
  const isLogged = localStorage.getItem('isLogged') === 'true';
  const userType = localStorage.getItem('userType') || '';
  const isChefe = userType === 'chefe';

  return { isLogged, isChefe };
}
