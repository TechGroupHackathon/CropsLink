import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LanguageSelectionPage = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Navigate to role selection after language is selected
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-8">{t('app.name')}</h1>
        <p className="text-xl mb-10">{t('app.tagline')}</p>
        
        <h2 className="text-2xl font-semibold mb-6">{t('onboarding.selectLanguage')}</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <button
            className="py-4 px-6 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700 transition duration-200"
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          
          <button
            className="py-4 px-6 bg-green-600 text-white rounded-lg text-xl hover:bg-green-700 transition duration-200"
            onClick={() => changeLanguage('hi')}
          >
            हिंदी (Hindi)
          </button>
          
          <button
            className="py-4 px-6 bg-yellow-600 text-white rounded-lg text-xl hover:bg-yellow-700 transition duration-200"
            onClick={() => changeLanguage('mr')}
          >
            मराठी (Marathi)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;