export interface Worker {
  id: string
  name: string
  role: string
  competencies: string[]
  fatigueScore: number
  availability: string
  hoursWorked: number
  lastTaskDate: string
  certifications: string[]
  experience: number
}

export interface Task {
  id: string
  name: string
  location: string
  machine: string
  requiredCompetencies: string[]
  assignedWorker?: string
  status: 'pending' | 'in-progress' | 'completed'
  startTime: string
  endTime?: string
  priority: 'low' | 'medium' | 'high'
}

export interface CompetencyRecord {
  id: string
  workerId: string
  skill: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  lastUsed: string
  certificationDate?: string
  expiryDate?: string
}

export interface FatigueRecord {
  id: string
  workerId: string
  date: string
  hoursWorked: number
  tasksCompleted: number
  fatigueScore: number
  restRequired: number
  status: 'well-rested' | 'moderate' | 'fatigued' | 'critical'
}

export interface PerformanceReport {
  id: string
  taskId: string
  workerId: string
  completionTime: string
  efficiency: number
  quality: number
  notes: string
  issues?: string[]
}

export const mockWorkers: Worker[] = [
  {
    id: 'W001',
    name: 'John Anderson',
    role: 'Machine Operator',
    competencies: ['CNC Operation', 'Quality Control', 'Welding'],
    fatigueScore: 25,
    availability: 'Available',
    hoursWorked: 38,
    lastTaskDate: '2025-10-30',
    certifications: ['CNC Level 3', 'Safety Training'],
    experience: 8
  },
  {
    id: 'W002',
    name: 'Sarah Mitchell',
    role: 'Technical Specialist',
    competencies: ['CAD Design', 'Programming', 'Troubleshooting'],
    fatigueScore: 45,
    availability: 'Available',
    hoursWorked: 42,
    lastTaskDate: '2025-10-30',
    certifications: ['AutoCAD Professional', 'PLC Programming'],
    experience: 6
  },
  {
    id: 'W003',
    name: 'Michael Chen',
    role: 'Quality Inspector',
    competencies: ['Quality Control', 'Documentation', 'Testing'],
    fatigueScore: 15,
    availability: 'Available',
    hoursWorked: 35,
    lastTaskDate: '2025-10-29',
    certifications: ['ISO 9001 Auditor', 'Six Sigma Green Belt'],
    experience: 10
  },
  {
    id: 'W004',
    name: 'Emily Rodriguez',
    role: 'Maintenance Tech',
    competencies: ['Equipment Maintenance', 'Electrical Systems', 'Diagnostics'],
    fatigueScore: 70,
    availability: 'On Break',
    hoursWorked: 48,
    lastTaskDate: '2025-10-30',
    certifications: ['Electrical License', 'HVAC Certified'],
    experience: 12
  },
  {
    id: 'W005',
    name: 'David Thompson',
    role: 'Assembly Technician',
    competencies: ['Assembly', 'Hand Tools', 'Blueprint Reading'],
    fatigueScore: 30,
    availability: 'Available',
    hoursWorked: 40,
    lastTaskDate: '2025-10-30',
    certifications: ['Assembly Specialist', 'Forklift Operator'],
    experience: 5
  }
]

export const mockTasks: Task[] = [
  {
    id: 'T001',
    name: 'CNC Milling Operation',
    location: 'Workshop A - Station 3',
    machine: 'CNC-M500',
    requiredCompetencies: ['CNC Operation', 'Quality Control'],
    assignedWorker: 'W001',
    status: 'in-progress',
    startTime: '2025-10-31T08:00:00',
    priority: 'high'
  },
  {
    id: 'T002',
    name: 'CAD Design Review',
    location: 'Design Lab - Desk 12',
    machine: 'Workstation-DL12',
    requiredCompetencies: ['CAD Design', 'Programming'],
    assignedWorker: 'W002',
    status: 'in-progress',
    startTime: '2025-10-31T09:00:00',
    priority: 'medium'
  },
  {
    id: 'T003',
    name: 'Quality Inspection Batch 445',
    location: 'QC Department',
    machine: 'Inspection-Table-2',
    requiredCompetencies: ['Quality Control', 'Documentation'],
    assignedWorker: 'W003',
    status: 'completed',
    startTime: '2025-10-31T07:00:00',
    endTime: '2025-10-31T11:30:00',
    priority: 'high'
  },
  {
    id: 'T004',
    name: 'Equipment Maintenance - Press 7',
    location: 'Workshop B - Bay 4',
    machine: 'Hydraulic-Press-7',
    requiredCompetencies: ['Equipment Maintenance', 'Diagnostics'],
    status: 'pending',
    startTime: '2025-10-31T14:00:00',
    priority: 'high'
  },
  {
    id: 'T005',
    name: 'Component Assembly Line 3',
    location: 'Assembly Floor - Line 3',
    machine: 'Assembly-Station-3A',
    requiredCompetencies: ['Assembly', 'Hand Tools'],
    assignedWorker: 'W005',
    status: 'in-progress',
    startTime: '2025-10-31T08:30:00',
    priority: 'medium'
  },
  {
    id: 'T006',
    name: 'Welding Fabrication',
    location: 'Workshop A - Welding Bay',
    machine: 'Welding-Station-W2',
    requiredCompetencies: ['Welding', 'Blueprint Reading'],
    status: 'pending',
    startTime: '2025-10-31T13:00:00',
    priority: 'low'
  }
]

export const mockCompetencies: CompetencyRecord[] = [
  {
    id: 'C001',
    workerId: 'W001',
    skill: 'CNC Operation',
    level: 'expert',
    lastUsed: '2025-10-30',
    certificationDate: '2020-03-15',
    expiryDate: '2026-03-15'
  },
  {
    id: 'C002',
    workerId: 'W001',
    skill: 'Welding',
    level: 'advanced',
    lastUsed: '2025-10-28',
    certificationDate: '2019-06-20'
  },
  {
    id: 'C003',
    workerId: 'W002',
    skill: 'CAD Design',
    level: 'expert',
    lastUsed: '2025-10-30',
    certificationDate: '2021-01-10',
    expiryDate: '2026-01-10'
  },
  {
    id: 'C004',
    workerId: 'W003',
    skill: 'Quality Control',
    level: 'expert',
    lastUsed: '2025-10-30',
    certificationDate: '2018-09-05'
  },
  {
    id: 'C005',
    workerId: 'W004',
    skill: 'Electrical Systems',
    level: 'expert',
    lastUsed: '2025-10-29',
    certificationDate: '2017-04-12',
    expiryDate: '2027-04-12'
  }
]

export const mockFatigueRecords: FatigueRecord[] = [
  {
    id: 'F001',
    workerId: 'W001',
    date: '2025-10-30',
    hoursWorked: 8,
    tasksCompleted: 3,
    fatigueScore: 25,
    restRequired: 16,
    status: 'well-rested'
  },
  {
    id: 'F002',
    workerId: 'W002',
    date: '2025-10-30',
    hoursWorked: 9,
    tasksCompleted: 2,
    fatigueScore: 45,
    restRequired: 14,
    status: 'moderate'
  },
  {
    id: 'F003',
    workerId: 'W003',
    date: '2025-10-30',
    hoursWorked: 7,
    tasksCompleted: 4,
    fatigueScore: 15,
    restRequired: 16,
    status: 'well-rested'
  },
  {
    id: 'F004',
    workerId: 'W004',
    date: '2025-10-30',
    hoursWorked: 10,
    tasksCompleted: 2,
    fatigueScore: 70,
    restRequired: 10,
    status: 'fatigued'
  },
  {
    id: 'F005',
    workerId: 'W005',
    date: '2025-10-30',
    hoursWorked: 8,
    tasksCompleted: 3,
    fatigueScore: 30,
    restRequired: 15,
    status: 'well-rested'
  }
]

export const mockPerformanceReports: PerformanceReport[] = [
  {
    id: 'P001',
    taskId: 'T003',
    workerId: 'W003',
    completionTime: '2025-10-31T11:30:00',
    efficiency: 95,
    quality: 98,
    notes: 'Excellent work. All items passed inspection on first review.',
    issues: []
  },
  {
    id: 'P002',
    taskId: 'T001',
    workerId: 'W001',
    completionTime: '2025-10-30T16:00:00',
    efficiency: 92,
    quality: 96,
    notes: 'Completed ahead of schedule. Minor adjustments needed.',
    issues: ['Minor calibration adjustment required']
  },
  {
    id: 'P003',
    taskId: 'T002',
    workerId: 'W002',
    completionTime: '2025-10-30T17:30:00',
    efficiency: 88,
    quality: 94,
    notes: 'Design review completed. Some revisions requested by client.',
    issues: ['Client requested dimension changes']
  }
]
