import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import VoiceAssistant from './VoiceAssistant';
import LanguageSwitcher from '../common/LanguageSwitcher';

const FarmerRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    // Step 1: Document verification
    aadhaarFront: null as File | null,
    aadhaarBack: null as File | null,
    selfie: null as File | null,
    
    // Step 2: Personal information
    name: '',
    address: '',
    contact: '',
    
    // Step 3: Crop information
    crops: '',
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
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the form data to the server here
    console.log('Farmer registration form submitted:', formData);
    // Navigate to dashboard or success page
    navigate('/dashboard');
  };
  
  // Check if current step is complete and can proceed
  const canProceed = () => {
    if (step === 1) {
      return formData.aadhaarFront && formData.aadhaarBack && formData.selfie;
    } else if (step === 2) {
      return formData.name && formData.address && formData.contact;
    }
    return true;
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('onboarding.farmer')} {t('onboarding.registration')}</h1>
        <LanguageSwitcher />
      </div>
      
      {/* Progress indicator */}
      <div className="flex mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex-1">
            <div 
              className={`h-2 rounded-full ${step >= stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
            <div className="text-xs text-center mt-1">
              {stepNumber === 1 && t('onboarding.documents')}
              {stepNumber === 2 && t('onboarding.personalInfo')}
              {stepNumber === 3 && t('onboarding.cropInfo')}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">{t('onboarding.uploadDocuments')}</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('onboarding.aadhaarFront')}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {formData.aadhaarFront ? (
                    <div>
                      <p className="text-sm text-gray-600">
                        {formData.aadhaarFront.name}
                      </p>
                      <button 
                        type="button"
                        className="text-sm text-red-600 hover:text-red-800"
                        onClick={() => handleFileChange('aadhaarFront', null)}
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
                        <label htmlFor="aadhaarFront" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>{t('onboarding.uploadFile')}</span>
                          <input 
                            id="aadhaarFront" 
                            name="aadhaarFront" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileChange('aadhaarFront', e.target.files[0]);
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('onboarding.aadhaarBack')}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {formData.aadhaarBack ? (
                    <div>
                      <p className="text-sm text-gray-600">
                        {formData.aadhaarBack.name}
                      </p>
                      <button 
                        type="button"
                        className="text-sm text-red-600 hover:text-red-800"
                        onClick={() => handleFileChange('aadhaarBack', null)}
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
                        <label htmlFor="aadhaarBack" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>{t('onboarding.uploadFile')}</span>
                          <input 
                            id="aadhaarBack" 
                            name="aadhaarBack" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileChange('aadhaarBack', e.target.files[0]);
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
            
            <div className="flex justify-end">
              <button
                type="button"
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${canProceed() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                onClick={nextStep}
                disabled={!canProceed()}
              >
                {t('onboarding.next')}
              </button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">{t('onboarding.personalInfo')}</h2>
            
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
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={prevStep}
              >
                {t('onboarding.back')}
              </button>
              <button
                type="button"
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${canProceed() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                onClick={nextStep}
                disabled={!canProceed()}
              >
                {t('onboarding.next')}
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">{t('onboarding.cropInfo')}</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.crops')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.crops}
                  onChange={(e) => handleInputChange('crops', e.target.value)}
                  rows={4}
                  placeholder={t('onboarding.cropPlaceholder')}
                  required
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 px-3 flex items-center text-blue-500"
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
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={prevStep}
              >
                {t('onboarding.back')}
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {t('profile.save')}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FarmerRegistration;