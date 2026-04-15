import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';

const AdminLogoutPage = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate('/admin/login', { replace: true });
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/admin/login', { replace: true });
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="bg-jvc-blue-950 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl text-white">Logging out...</p>
      </div>
    </div>
  );
};

export default AdminLogoutPage;