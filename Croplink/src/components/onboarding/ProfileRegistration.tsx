import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import VoiceAssistant from './VoiceAssistant';
import LanguageSwitcher from '../common/LanguageSwitcher';

type UserRole = 'farmer' | 'distributor' | null;

const ProfileRegistration = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(null);
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    crops: '',
    photo: null as File | null,
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleVoiceResult = (result: string) => {
    if (activeVoiceField) {
      handleInputChange(activeVoiceField, result);
      setActiveVoiceField(null);
    }
  };
  
  const activateVoiceAssistant = (field: string) => {
    setActiveVoiceField(field);
  };
  
  const handleRoleSelection = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the form data to the server here
    console.log('Form submitted:', { role, ...formData });
    // Move to the next step or redirect to dashboard
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('onboarding.welcome')}</h1>
        <LanguageSwitcher />
      </div>
      
      {step === 1 ? (
        <div>
          <h2 className="text-xl mb-4">{t('onboarding.selectRole')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`p-4 border rounded-lg ${role === 'farmer' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onClick={() => handleRoleSelection('farmer')}
            >
              {t('onboarding.farmer')}
            </button>
            <button
              className={`p-4 border rounded-lg ${role === 'distributor' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onClick={() => handleRoleSelection('distributor')}
            >
              {t('onboarding.distributor')}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.name')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-500"
                  onClick={() => activateVoiceAssistant('name')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {activeVoiceField === 'name' && (
                <VoiceAssistant
                  onResult={handleVoiceResult}
                  fieldName="name"
                  isActive={activeVoiceField === 'name'}
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.address')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-500"
                  onClick={() => activateVoiceAssistant('address')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {activeVoiceField === 'address' && (
                <VoiceAssistant
                  onResult={handleVoiceResult}
                  fieldName="address"
                  isActive={activeVoiceField === 'address'}
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.contact')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-500"
                  onClick={() => activateVoiceAssistant('contact')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {activeVoiceField === 'contact' && (
                <VoiceAssistant
                  onResult={handleVoiceResult}
                  fieldName="contact"
                  isActive={activeVoiceField === 'contact'}
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.crops')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.crops}
                  onChange={(e) => handleInputChange('crops', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-500"
                  onClick={() => activateVoiceAssistant('crops')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {activeVoiceField === 'crops' && (
                <VoiceAssistant
                  onResult={handleVoiceResult}
                  fieldName="crops"
                  isActive={activeVoiceField === 'crops'}
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.photo')}
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData(prev => ({
                        ...prev,
                        photo: e.target.files![0]
                      }));
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('profile.save')}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileRegistration;