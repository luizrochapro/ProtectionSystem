'use client';

import Layout from '@/components/Layout';
import ProjectSelector from '@/components/ProjectSelector';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { equipmentService } from '@/api/services/equipmentService';
import { useProjectSelector } from '@/hooks/useProjectSelector';
import { Equipment } from '@/types';
import { Plus, Pencil, Trash2, Zap } from 'lucide-react';
import { useState } from 'react';

const equipmentTypes = [
  { value: 'transformer', label: 'Transformer' },
  { value: 'line', label: 'Line' },
  { value: 'generator', label: 'Generator' },
  { value: 'motor', label: 'Motor' },
  { value: 'capacitor', label: 'Capacitor' },
  { value: 'reactor', label: 'Reactor' },
];

export default function EquipmentsPage() {
  const queryClient = useQueryClient();
  const { selectedProjectId } = useProjectSelector();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'transformer' as Equipment['type'],
    nominalVoltage: '',
    nominalCurrent: '',
    manufacturer: '',
    model: '',
  });

  const { data: equipments = [], isLoading } = useQuery({
    queryKey: ['equipments', selectedProjectId],
    queryFn: () => equipmentService.getByProject(selectedProjectId!),
    enabled: !!selectedProjectId,
  });

  const createMutation = useMutation({
    mutationFn: equipmentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments', selectedProjectId] });
      setIsCreateDialogOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Equipment> }) =>
      equipmentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments', selectedProjectId] });
      setIsEditDialogOpen(false);
      setSelectedEquipment(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: equipmentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments', selectedProjectId] });
      setIsDeleteDialogOpen(false);
      setSelectedEquipment(null);
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'transformer',
      nominalVoltage: '',
      nominalCurrent: '',
      manufacturer: '',
      model: '',
    });
  };

  const handleCreate = () => {
    if (!selectedProjectId) return;
    createMutation.mutate({
      projectId: selectedProjectId,
      name: formData.name,
      type: formData.type,
      nominalVoltage: parseFloat(formData.nominalVoltage),
      nominalCurrent: parseFloat(formData.nominalCurrent),
      manufacturer: formData.manufacturer || undefined,
      model: formData.model || undefined,
    });
  };

  const handleEdit = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setFormData({
      name: equipment.name,
      type: equipment.type,
      nominalVoltage: equipment.nominalVoltage.toString(),
      nominalCurrent: equipment.nominalCurrent.toString(),
      manufacturer: equipment.manufacturer || '',
      model: equipment.model || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedEquipment) return;
    updateMutation.mutate({
      id: selectedEquipment.id,
      data: {
        name: formData.name,
        type: formData.type,
        nominalVoltage: parseFloat(formData.nominalVoltage),
        nominalCurrent: parseFloat(formData.nominalCurrent),
        manufacturer: formData.manufacturer || undefined,
        model: formData.model || undefined,
      },
    });
  };

  const handleDelete = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedEquipment) return;
    deleteMutation.mutate(selectedEquipment.id);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipments</h1>
          <p className="text-gray-600">Manage electrical equipment and protection devices</p>
        </div>

        {/* Project Selector and Actions */}
        <div className="flex justify-between items-center mb-8">
          <ProjectSelector />
          <Button onClick={() => setIsCreateDialogOpen(true)} disabled={!selectedProjectId}>
            <Plus className="mr-2 h-4 w-4" />
            New Equipment
          </Button>
        </div>

        {/* Equipments List */}
        {!selectedProjectId ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Zap className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Please select a project to view equipments</p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : equipments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Zap className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No equipments yet. Add your first equipment to get started.</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Equipment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipments.map((equipment) => (
              <Card key={equipment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    {equipment.name}
                  </CardTitle>
                  <CardDescription className="capitalize">{equipment.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Voltage:</span>
                      <span className="font-medium">{equipment.nominalVoltage} kV</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium">{equipment.nominalCurrent} A</span>
                    </div>
                    {equipment.manufacturer && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Manufacturer:</span>
                        <span className="font-medium">{equipment.manufacturer}</span>
                      </div>
                    )}
                    {equipment.model && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">{equipment.model}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(equipment)}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(equipment)}
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Equipment Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
              <DialogDescription>Add a new electrical equipment to the project.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Equipment name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Equipment['type'] })}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {equipmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nominal Voltage (kV)</label>
                  <Input
                    type="number"
                    value={formData.nominalVoltage}
                    onChange={(e) => setFormData({ ...formData, nominalVoltage: e.target.value })}
                    placeholder="13.8"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Nominal Current (A)</label>
                  <Input
                    type="number"
                    value={formData.nominalCurrent}
                    onChange={(e) => setFormData({ ...formData, nominalCurrent: e.target.value })}
                    placeholder="1000"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Manufacturer (Optional)</label>
                <Input
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  placeholder="Manufacturer"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Model (Optional)</label>
                <Input
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="Model"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Adding...' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Equipment Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Equipment</DialogTitle>
              <DialogDescription>Update equipment information.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Equipment name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Equipment['type'] })}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {equipmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nominal Voltage (kV)</label>
                  <Input
                    type="number"
                    value={formData.nominalVoltage}
                    onChange={(e) => setFormData({ ...formData, nominalVoltage: e.target.value })}
                    placeholder="13.8"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Nominal Current (A)</label>
                  <Input
                    type="number"
                    value={formData.nominalCurrent}
                    onChange={(e) => setFormData({ ...formData, nominalCurrent: e.target.value })}
                    placeholder="1000"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Manufacturer (Optional)</label>
                <Input
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  placeholder="Manufacturer"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Model (Optional)</label>
                <Input
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="Model"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Updating...' : 'Update'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Equipment</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete &quot;{selectedEquipment?.name}&quot;? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
