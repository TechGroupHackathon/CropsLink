import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../common/LanguageSwitcher';

const RoleSelectionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'farmer' | 'distributor') => {
    // Navigate to the appropriate profile creation page based on role
    if (role === 'farmer') {
      navigate('/farmer-registration');
    } else {
      navigate('/distributor-registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{t('onboarding.welcome')}</h1>
          <LanguageSwitcher />
        </div>
        
        <h2 className="text-xl mb-6">{t('onboarding.selectRole')}</h2>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <button
            className="p-6 border-2 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition duration-200"
            onClick={() => handleRoleSelection('farmer')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="text-xl font-medium">{t('onboarding.farmer')}</span>
          </button>
          
          <button
            className="p-6 border-2 rounded-lg flex flex-col items-center justify-center hover:border-green-500 hover:bg-green-50 transition duration-200"
            onClick={() => handleRoleSelection('distributor')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xl font-medium">{t('onboarding.distributor')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;