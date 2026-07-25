import { useState, useEffect, useMemo } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { FiHome, FiBriefcase, FiFileText, FiUsers, FiLayers, FiGrid, FiBarChart2, FiLogOut, FiMenu, FiX, FiSettings, FiTag, FiShoppingBag, FiPlay, FiBookmark, FiMail, FiBookOpen, FiMessageCircle, FiAward } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarVariants = {
  open: { width: 260 },
  closed: { width: 72 }
};

const overlayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const navItems = [
  { label: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
  { label: 'Projects', icon: FiBriefcase, path: '/admin/content/projects' },
  { label: 'Case Studies', icon: FiBookOpen, path: '/admin/content/case_studies' },
  { label: 'Services', icon: FiLayers, path: '/admin/content/services' },
  { label: 'Industries', icon: FiGrid, path: '/admin/content/industries' },
  { label: 'Blogs', icon: FiFileText, path: '/admin/content/blogs' },
  { label: 'Jobs', icon: FiBookmark, path: '/admin/content/jobs' },
  { label: 'Applications', icon: FiMail, path: '/admin/applications' },
  { label: 'Testimonials', icon: FiMessageCircle, path: '/admin/content/testimonials' },
  { label: 'Team', icon: FiUsers, path: '/admin/content/team' },
  { label: 'Clients', icon: FiShoppingBag, path: '/admin/content/clients' },
  { label: 'Press Releases', icon: FiFileText, path: '/admin/content/press-releases' },
  { label: 'Values', icon: FiAward, path: '/admin/content/values' },
  { label: 'Videos', icon: FiPlay, path: '/admin/content/videos' },
  { label: 'Hero Slides', icon: FiPlay, path: '/admin/content/hero-slides' },
  { label: 'Users', icon: FiUsers, path: '/admin/users' },
  { label: 'Stats', icon: FiBarChart2, path: '/admin/content/stats' },
  { label: 'Settings', icon: FiSettings, path: '/admin/settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log('AdminLayout init, admin from localStorage:', (() => { try { const d = localStorage.getItem('trimurya_admin'); return d ? JSON.parse(d) : null; } catch { return null; } })());
  const [admin, setAdmin] = useState(() => {
    try {
      const adminData = localStorage.getItem('trimurya_admin');
      return adminData ? JSON.parse(adminData) : null;
    } catch {
      return null;
    }
  });
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const token = localStorage.getItem('trimurya_token');
    const adminData = localStorage.getItem('trimurya_admin');
    console.log('AdminLayout useEffect:', { token: !!token, adminData: !!adminData });
    if (token && adminData) {
      try {
        const parsed = JSON.parse(adminData);
        setAdmin(parsed);
      } catch {
        setAdmin(null);
      }
    } else {
      setAdmin(null);
    }

    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('trimurya_token');
    localStorage.removeItem('trimurya_admin');
    setAdmin(null);
    window.location.href = '/admin/login';
  };

  if (!admin && !location.pathname.includes('/admin/login')) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!admin) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Outlet />
      </main>
    );
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <motion.aside
          variants={sidebarVariants}
          initial={false}
          animate={sidebarOpen || isDesktop ? 'open' : 'closed'}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 hidden border-r border-slate-200 bg-primary dark:border-slate-800 dark:bg-slate-950 lg:flex"
        >
          <div className="flex h-full w-full flex-col">
            <div className="flex h-16 items-center justify-center border-b border-white/10">
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-white">
                  <FiLayers size={18} />
                </div>
                <motion.span
                  className="text-lg font-black text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Admin
                </motion.span>
              </Link>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? 'bg-white/15 text-secondary'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 p-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.aside>

        <div className="flex-1 lg:ml-[260px]">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <button
                className="focus-ring rounded-lg p-2 text-slate-600 lg:hidden dark:text-slate-300"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-lg font-black text-primary dark:text-white">
                {navItems.find((it) => isActive(it.path))?.label || 'Admin Panel'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">
                {admin?.name} ({admin?.role})
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-sm font-black text-secondary dark:bg-secondary/20">
                {admin?.name?.charAt(0)}
              </div>
            </div>
          </header>
          <main className="p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-slate-200 bg-primary lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between px-4">
                <Link to="/admin/dashboard" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-white">
                    <FiLayers size={18} />
                  </div>
                  <span className="text-lg font-black text-white">Admin</span>
                </Link>
                <button
                  className="rounded-lg p-2 text-slate-300"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <FiX size={20} />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? 'bg-white/15 text-secondary'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-white/10 p-3">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}


