// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  voltage: number;
  frequency: number;
  createdAt: string;
  updatedAt: string;
}

// Equipment Types
export interface Equipment {
  id: string;
  projectId: string;
  name: string;
  type: 'transformer' | 'line' | 'generator' | 'motor' | 'capacitor' | 'reactor';
  nominalVoltage: number;
  nominalCurrent: number;
  manufacturer?: string;
  model?: string;
  protectionCurveId?: string;
  createdAt: string;
  updatedAt: string;
}

// Protection Curve Types
export interface ProtectionCurve {
  id: string;
  equipmentId: string;
  name: string;
  type: 'overcurrent' | 'differential' | 'distance' | 'undervoltage' | 'overvoltage';
  curveData: CurvePoint[];
  settings: CurveSettings;
  createdAt: string;
  updatedAt: string;
}

export interface CurvePoint {
  current: number;
  time: number;
}

export interface CurveSettings {
  pickup: number;
  timeDial?: number;
  instantaneous?: number;
  curveType?: string;
}

// Simulation Types
export interface Simulation {
  id: string;
  projectId: string;
  name: string;
  type: 'short_circuit' | 'coordination' | 'arc_flash';
  status: 'pending' | 'running' | 'completed' | 'failed';
  results?: SimulationResults;
  createdAt: string;
  updatedAt: string;
}

export interface SimulationResults {
  faultCurrent?: number;
  faultLocation?: string;
  protectionDevices?: string[];
  operationTime?: number;
  coordination?: boolean;
}

// Network Model Types
export interface NetworkModel {
  id: string;
  projectId: string;
  name: string;
  buses: Bus[];
  lines: Line[];
  transformers: Transformer[];
  loads: Load[];
  generators: Generator[];
  externalGrids: ExternalGrid[];
  createdAt: string;
  updatedAt: string;
}

export interface Bus {
  id: string;
  name: string;
  nominalVoltage: number;
  type: 'slack' | 'pv' | 'pq';
  x?: number;
  y?: number;
}

export interface Line {
  id: string;
  name: string;
  fromBus: string;
  toBus: string;
  resistance: number;
  reactance: number;
  length: number;
}

export interface Transformer {
  id: string;
  name: string;
  primaryBus: string;
  secondaryBus: string;
  nominalPower: number;
  primaryVoltage: number;
  secondaryVoltage: number;
  impedance: number;
  connectionType: 'yy' | 'yd' | 'dy' | 'dd';
}

export interface Load {
  id: string;
  name: string;
  bus: string;
  activePower: number;
  reactivePower: number;
  type: 'constant_power' | 'constant_current' | 'constant_impedance';
}

export interface Generator {
  id: string;
  name: string;
  bus: string;
  nominalPower: number;
  voltage: number;
  type: 'synchronous' | 'asynchronous';
}

export interface ExternalGrid {
  id: string;
  name: string;
  bus: string;
  shortCircuitPower: number;
  voltage: number;
  angle: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Stats Types
export interface DashboardStats {
  totalProjects: number;
  totalEquipments: number;
  activeSimulations: number;
  completedSimulations: number;
}
