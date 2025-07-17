import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t('app.name')}</h1>
        <p className="text-sm text-gray-400">{t('app.tagline')}</p>
      </div>
      
      <nav className="space-y-2">
        <a href="#" className="block p-2 rounded hover:bg-gray-700 transition">
          {t('nav.profile')}
        </a>
        <a href="#" className="block p-2 rounded hover:bg-gray-700 transition">
          {t('nav.messages')}
        </a>
        <a href="#" className="block p-2 rounded hover:bg-gray-700 transition">
          {t('nav.cropManager')}
        </a>
        <a href="#" className="block p-2 rounded hover:bg-gray-700 transition">
          {t('nav.logout')}
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;