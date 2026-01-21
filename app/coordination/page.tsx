'use client';

import Layout from '@/components/Layout';
import ProjectSelector from '@/components/ProjectSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { equipmentService } from '@/api/services/equipmentService';
import { protectionCurveService } from '@/api/services/protectionCurveService';
import { useProjectSelector } from '@/hooks/useProjectSelector';
import { LineChart, Download, Play } from 'lucide-react';
import { useState } from 'react';

export default function CoordinationPage() {
  const { selectedProjectId } = useProjectSelector();
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  const { data: equipments = [] } = useQuery({
    queryKey: ['equipments', selectedProjectId],
    queryFn: () => equipmentService.getByProject(selectedProjectId!),
    enabled: !!selectedProjectId,
  });

  const handleEquipmentToggle = (equipmentId: string) => {
    setSelectedEquipments((prev) =>
      prev.includes(equipmentId)
        ? prev.filter((id) => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleAnalyze = () => {
    // This would trigger the coordination analysis
    console.log('Analyzing coordination for equipments:', selectedEquipments);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Coordination Analysis</h1>
          <p className="text-gray-400">Coordenograma - Protection device coordination curves</p>
        </div>

        {/* Project Selector */}
        <div className="mb-8">
          <ProjectSelector />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equipment Selection Panel */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-white">Equipment Selection</CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedProjectId ? (
                <p className="text-gray-400 text-sm">Please select a project first</p>
              ) : equipments.length === 0 ? (
                <p className="text-gray-400 text-sm">No equipments available</p>
              ) : (
                <div className="space-y-2">
                  {equipments.map((equipment) => (
                    <label
                      key={equipment.id}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEquipments.includes(equipment.id)}
                        onChange={() => handleEquipmentToggle(equipment.id)}
                        className="rounded border-gray-600 bg-gray-700"
                      />
                      <span className="text-sm">{equipment.name}</span>
                    </label>
                  ))}
                </div>
              )}
              <div className="mt-6 space-y-2">
                <Button
                  className="w-full"
                  onClick={handleAnalyze}
                  disabled={selectedEquipments.length === 0}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Analyze Coordination
                </Button>
                <Button variant="outline" className="w-full text-gray-900">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Coordination Chart Area */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LineChart className="mr-2 h-5 w-5" />
                Coordenograma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-8 min-h-[500px] flex items-center justify-center border border-gray-700">
                {selectedEquipments.length === 0 ? (
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select equipment to view coordination curves</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">
                      {selectedEquipments.length} equipment(s) selected
                    </p>
                    <p className="text-sm text-gray-500">
                      Click &quot;Analyze Coordination&quot; to generate the coordenograma
                    </p>
                  </div>
                )}
              </div>

              {/* Coordination Results */}
              {selectedEquipments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">Selected Equipments:</h3>
                  <div className="space-y-1">
                    {selectedEquipments.map((id) => {
                      const equipment = equipments.find((e) => e.id === id);
                      return (
                        <div key={id} className="text-sm text-gray-400 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                          {equipment?.name} - {equipment?.type}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analysis Information */}
        <Card className="mt-6 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Coordination Analysis Information</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-400">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-1">Analysis Type</h4>
                <p>Protection Coordination</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Status</h4>
                <p>Ready for analysis</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Selected Devices</h4>
                <p>{selectedEquipments.length} device(s)</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">About Coordenograma</h4>
              <p className="text-sm">
                The coordenograma (coordination diagram) displays the time-current characteristics of
                protection devices to ensure proper coordination. Proper coordination ensures that the
                protective device closest to a fault operates first, minimizing the affected area and
                maintaining service to unaffected areas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
