import { create } from 'zustand';
import { AppState, PageConfig } from '@/types/schema';
import { safeJsonParse } from '@/lib/utils';

const DEFAULT_JSON = JSON.stringify(
  {
    title: 'Employee Management',
    layout: 'dashboard',
    components: [
      {
        type: 'grid',
        columns: 4,
        children: [
          { type: 'card', title: 'Total Employees', value: '1,250', icon: 'users', trend: '+12%', trendDirection: 'up', variant: 'gradient' },
          { type: 'card', title: 'Active Projects', value: '48', icon: 'folder', trend: '+5%', trendDirection: 'up' },
          { type: 'card', title: 'Departments', value: '12', icon: 'building', trend: '0%', trendDirection: 'neutral' },
          { type: 'card', title: 'Open Positions', value: '23', icon: 'briefcase', trend: '-3%', trendDirection: 'down' },
        ],
      },
      {
        type: 'grid',
        columns: 2,
        children: [
          {
            type: 'chart',
            title: 'Hiring Trends',
            chartType: 'bar',
            data: [
              { name: 'Jan', value: 12 },
              { name: 'Feb', value: 19 },
              { name: 'Mar', value: 8 },
              { name: 'Apr', value: 15 },
              { name: 'May', value: 22 },
              { name: 'Jun', value: 18 },
            ],
          },
          {
            type: 'chart',
            title: 'Department Distribution',
            chartType: 'pie',
            data: [
              { name: 'Engineering', value: 45 },
              { name: 'Design', value: 20 },
              { name: 'Marketing', value: 15 },
              { name: 'Sales', value: 12 },
              { name: 'HR', value: 8 },
            ],
          },
        ],
      },
      {
        type: 'table',
        title: 'Recent Employees',
        columns: ['Name', 'Role', 'Department', 'Status'],
        data: [
          { Name: 'Alice Johnson', Role: 'Senior Developer', Department: 'Engineering', Status: 'Active' },
          { Name: 'Bob Smith', Role: 'UI Designer', Department: 'Design', Status: 'Active' },
          { Name: 'Carol White', Role: 'Product Manager', Department: 'Product', Status: 'On Leave' },
          { Name: 'David Brown', Role: 'Data Analyst', Department: 'Analytics', Status: 'Active' },
          { Name: 'Eve Davis', Role: 'DevOps Engineer', Department: 'Engineering', Status: 'Active' },
        ],
      },
    ],
  },
  null,
  2
);

import { validatePageConfig } from '@/lib/validation';

export const useAppStore = create<AppState>((set, get) => ({
  // JSON config
  jsonString: DEFAULT_JSON,
  parsedConfig: JSON.parse(DEFAULT_JSON) as PageConfig,
  jsonError: null,
  validationErrors: [],

  // Form state
  formData: {},

  // UI state
  isLoading: false,
  isDarkMode: true,
  activeModal: null,
  activeSample: 'employee-dashboard',
  sidebarOpen: false,

  // Actions
  setJsonString: (json: string) => {
    set({ jsonString: json });
    // Auto-parse
    get().parseJson();
  },

  parseJson: () => {
    const { jsonString } = get();
    const { data, error } = safeJsonParse(jsonString);
    if (error) {
      set({ jsonError: error, parsedConfig: null, validationErrors: [] });
    } else {
      const validation = validatePageConfig(data);
      if (!validation.success) {
        set({
          jsonError: 'Config validation failed',
          parsedConfig: null,
          validationErrors: validation.errors,
        });
      } else {
        set({
          jsonError: null,
          parsedConfig: data as PageConfig,
          validationErrors: [],
        });
      }
    }
  },

  setFormField: (key: string, value: unknown) => {
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    }));
  },

  resetFormData: () => set({ formData: {} }),

  toggleDarkMode: () =>
    set((state) => ({ isDarkMode: !state.isDarkMode })),

  setActiveModal: (id: string | null) => set({ activeModal: id }),

  setActiveSample: (key: string) => set({ activeSample: key }),

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
