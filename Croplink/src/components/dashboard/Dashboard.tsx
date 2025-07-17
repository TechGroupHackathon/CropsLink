import { useTranslation } from 'react-i18next';
import Sidebar from '../layout/Sidebar';
import ProfileCard from './ProfileCard';

// Mock data for demonstration
const mockProfiles = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Pune, Maharashtra',
    crops: ['Wheat', 'Rice', 'Sugarcane'],
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Anita Sharma',
    location: 'Nashik, Maharashtra',
    crops: ['Grapes', 'Onions'],
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Suresh Patel',
    location: 'Ahmedabad, Gujarat',
    crops: ['Cotton', 'Groundnut'],
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const Dashboard = () => {
  const { t } = useTranslation();
  
  // In a real app, we would fetch the visited profiles from the server
  const visitedProfiles = mockProfiles;
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{t('dashboard.welcome')}</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.recentlyViewed')}</h2>
          
          {visitedProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visitedProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">{t('dashboard.noProfiles')}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;