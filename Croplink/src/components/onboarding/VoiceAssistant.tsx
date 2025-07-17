import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface VoiceAssistantProps {
  onResult: (result: string) => void;
  fieldName: string;
  isActive: boolean;
}

const VoiceAssistant = ({ onResult, fieldName, isActive }: VoiceAssistantProps) => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // This is a placeholder for the actual Web Speech API implementation
  // In a real implementation, we would use the SpeechRecognition API
  useEffect(() => {
    if (!isActive) return;
    
    // Mock implementation - in a real app, this would use the Web Speech API
    const startListening = () => {
      setIsListening(true);
      // In a real implementation, we would start the speech recognition here
      console.log(`Started listening for ${fieldName} in ${i18n.language}`);
      
      // Simulate speech recognition with a timeout
      setTimeout(() => {
        setIsListening(false);
        const mockResult = `Sample ${fieldName} value`;
        setTranscript(mockResult);
        onResult(mockResult);
      }, 3000);
    };
    
    startListening();
    
    return () => {
      setIsListening(false);
      // In a real implementation, we would stop the speech recognition here
    };
  }, [isActive, fieldName, i18n.language, onResult]);
  
  return (
    <div className="mt-2">
      {isListening ? (
        <div className="flex items-center space-x-2 text-blue-600">
          <div className="animate-pulse h-3 w-3 bg-blue-600 rounded-full"></div>
          <span>{t('voice.listening')}</span>
        </div>
      ) : transcript ? (
        <div className="text-green-600">
          <p>{transcript}</p>
        </div>
      ) : null}
      
      <p className="text-sm text-gray-500 mt-1">
        {t('voice.instructions')}
      </p>
    </div>
  );
};

export default VoiceAssistant;