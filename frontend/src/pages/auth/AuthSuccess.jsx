import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent double handling (e.g., during React Strict Mode in dev)
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      navigate('/product-detail', { replace: true });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
    const id = params.get('id');

    console.log("From query params:", { name, email, id });

    if (name && email && id) {
      localStorage.setItem('user', JSON.stringify({ name, email, id }));
      navigate('/checkout', { replace: true });
    } else {
      navigate('/sign-up', { replace: true });
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default AuthSuccess;
