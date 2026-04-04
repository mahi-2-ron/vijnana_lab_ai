import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { auth } from '../services/firebase';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, role, loading, roleError } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617]">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                <p className="text-gray-400 text-sm animate-pulse">Authenticating your session...</p>
            </div>
        );
    }
    
    if (roleError && user) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] p-4">
            <div className="text-center max-w-sm p-6 md:p-8 bg-white/5 border border-red-500/20 rounded-3xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8">
              <AlertCircle size={48} className="text-red-500/80 mx-auto mb-4" />
              <p className="text-red-400 font-display font-medium mb-3 text-xl tracking-tight">
                Role Verification Failed
              </p>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">
                There was a network interruption while securely verifying your access level. Your session is active, but we need to re-verify your role.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-3.5 font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all rounded-xl shadow-md active:scale-[0.98]"
              >
                Retry Connection
              </button>
            </div>
          </div>
        );
    }

    if (!user && !auth.currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && role && !allowedRoles.map(r => r.toLowerCase()).includes(role.toLowerCase())) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
 
