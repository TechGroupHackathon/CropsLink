import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import VoiceAssistant from './VoiceAssistant';
import LanguageSwitcher from '../common/LanguageSwitcher';

const DistributorRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    selfie: null as File | null,
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the form data to the server here
    console.log('Distributor registration form submitted:', formData);
    // Navigate to dashboard or success page
    navigate('/dashboard');
  };
  
  // Check if form is complete and can be submitted
  const canSubmit = () => {
    return formData.name && formData.number && formData.address && formData.selfie;
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('onboarding.distributor')} {t('onboarding.registration')}</h1>
        <LanguageSwitcher />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
            {t('profile.number')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="tel"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-500"
              onClick={() => activateVoiceAssistant('number')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {activeVoiceField === 'number' && (
            <VoiceAssistant
              onResult={handleVoiceResult}
              fieldName="number"
              isActive={activeVoiceField === 'number'}
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('profile.address')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
              required
            />
            <button
              type="button"
              className="absolute top-2 right-2 px-3 flex items-center text-blue-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('onboarding.selfie')}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {formData.selfie ? (
                <div>
                  <p className="text-sm text-gray-600">
                    {formData.selfie.name}
                  </p>
                  <button 
                    type="button"
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={() => handleFileChange('selfie', null)}
                  >
                    {t('onboarding.remove')}
                  </button>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="selfie" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>{t('onboarding.uploadFile')}</span>
                      <input 
                        id="selfie" 
                        name="selfie" 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange('selfie', e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${canSubmit() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!canSubmit()}
          >
            {t('profile.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DistributorRegistration;