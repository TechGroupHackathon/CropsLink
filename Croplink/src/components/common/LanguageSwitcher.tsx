import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`px-2 py-1 text-sm rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={`px-2 py-1 text-sm rounded ${i18n.language === 'hi' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => changeLanguage('hi')}
      >
        हिंदी
      </button>
      <button
        className={`px-2 py-1 text-sm rounded ${i18n.language === 'mr' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => changeLanguage('mr')}
      >
        मराठी
      </button>
    </div>
  );
};

export default LanguageSwitcher;