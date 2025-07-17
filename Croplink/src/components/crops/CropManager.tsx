import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../layout/Sidebar';
import CropForm from './CropForm';

interface Crop {
  id: number;
  name: string;
  variety: string;
  quantity: string;
  harvestDate: string;
  image?: string;
}

// Mock data for demonstration
const initialCrops: Crop[] = [
  {
    id: 1,
    name: 'Wheat',
    variety: 'HD-2967',
    quantity: '50 quintals',
    harvestDate: '2023-04-15',
  },
  {
    id: 2,
    name: 'Rice',
    variety: 'Basmati',
    quantity: '30 quintals',
    harvestDate: '2023-11-20',
  },
];

const CropManager = () => {
  const { t } = useTranslation();
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  
  const handleAddCrop = (crop: Omit<Crop, 'id'>) => {
    const newCrop = {
      ...crop,
      id: Date.now(), // Simple ID generation for demo
    };
    setCrops([...crops, newCrop]);
    setIsAddingCrop(false);
  };
  
  const handleUpdateCrop = (updatedCrop: Crop) => {
    setCrops(crops.map(crop => crop.id === updatedCrop.id ? updatedCrop : crop));
    setEditingCrop(null);
  };
  
  const handleDeleteCrop = (id: number) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };
  
  const startEdit = (crop: Crop) => {
    setEditingCrop(crop);
    setIsAddingCrop(false);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('nav.cropManager')}</h1>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            onClick={() => {
              setIsAddingCrop(true);
              setEditingCrop(null);
            }}
          >
            {t('crop.add')}
          </button>
        </div>
        
        {(isAddingCrop || editingCrop) && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCrop ? t('crop.edit') : t('crop.add')}
            </h2>
            <CropForm
              crop={editingCrop}
              onSubmit={editingCrop ? handleUpdateCrop : handleAddCrop}
              onCancel={() => {
                setIsAddingCrop(false);
                setEditingCrop(null);
              }}
            />
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('crop.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('crop.variety')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('crop.quantity')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('crop.harvestDate')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crops.length > 0 ? (
                crops.map((crop) => (
                  <tr key={crop.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{crop.variety}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{crop.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{crop.harvestDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        onClick={() => startEdit(crop)}
                      >
                        {t('crop.edit')}
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteCrop(crop.id)}
                      >
                        {t('crop.delete')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No crops added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CropManager;