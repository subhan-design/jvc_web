import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';

// Automatically logs out admin when they navigate to pages other than admin's

const AdminAutoLogout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdminAuth();

  useEffect(() => {
    // Never run inside an iframe (e.g. PDF generation loads preview pages in iframes)
    if (window.self !== window.top) return;

    if (!isAuthenticated) {
      return;
    }

    const currentPath = location.pathname;
    const isAdminPath = currentPath.startsWith('/admin');
    const isMerchantAdminPath = currentPath.startsWith('/merchant-admin-application');
    const isConsumerAdminPath = currentPath.startsWith('/consumer-admin-application');

    if (!isAdminPath && !isMerchantAdminPath && !isConsumerAdminPath) {
      console.log('[AdminAutoLogout] Admin navigated to non-admin page, logging out...');
      logout().then(() => {
        navigate('/', { replace: true });
      });
    }
  }, [location.pathname, isAuthenticated, logout, navigate]);

  return null;
};

export default AdminAutoLogout;