// ============================================================
// AI App Generator — Type-Safe Configuration Schema
// ============================================================

// --------------- Base ---------------

export interface BaseComponent {
  type: string;
  id?: string;
  className?: string;
  children?: ComponentConfig[];
}

// --------------- Card ---------------

export interface CardConfig extends BaseComponent {
  type: 'card';
  title?: string;
  value?: string;
  description?: string;
  icon?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'gradient' | 'outline';
}

// --------------- Data Card ---------------

export interface DataCardConfig extends BaseComponent {
  type: 'datacard';
  title?: string;
  fields?: { label: string; value: string }[];
}

// --------------- Table ---------------

export interface TableConfig extends BaseComponent {
  type: 'table';
  title?: string;
  columns?: string[];
  data?: Record<string, string | number>[];
}

// --------------- Form ---------------

export interface FormConfig extends BaseComponent {
  type: 'form';
  title?: string;
  submitLabel?: string;
}

// --------------- Input ---------------

export interface InputConfig extends BaseComponent {
  type: 'input';
  label?: string;
  placeholder?: string;
  inputType?: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
}

// --------------- Textarea ---------------

export interface TextareaConfig extends BaseComponent {
  type: 'textarea';
  label?: string;
  placeholder?: string;
  name?: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string;
}

// --------------- Select ---------------

export interface SelectConfig extends BaseComponent {
  type: 'select';
  label?: string;
  name?: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
}

// --------------- Checkbox ---------------

export interface CheckboxConfig extends BaseComponent {
  type: 'checkbox';
  label?: string;
  name?: string;
  checked?: boolean;
}

// --------------- Radio Group ---------------

export interface RadioGroupConfig extends BaseComponent {
  type: 'radio';
  label?: string;
  name?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
}

// --------------- Button ---------------

export interface ButtonConfig extends BaseComponent {
  type: 'button';
  label?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

// --------------- Chart ---------------

export interface ChartConfig extends BaseComponent {
  type: 'chart';
  title?: string;
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  data?: { name: string; value: number; [key: string]: string | number }[];
  dataKey?: string;
  xKey?: string;
}

// --------------- Section ---------------

export interface SectionConfig extends BaseComponent {
  type: 'section';
  title?: string;
  description?: string;
}

// --------------- Container ---------------

export interface ContainerConfig extends BaseComponent {
  type: 'container';
  padding?: string;
  maxWidth?: string;
}

// --------------- Grid ---------------

export interface GridConfig extends BaseComponent {
  type: 'grid';
  columns?: number;
  gap?: string;
}

// --------------- Tabs ---------------

export interface TabItem {
  label: string;
  children?: ComponentConfig[];
}

export interface TabsConfig extends BaseComponent {
  type: 'tabs';
  tabs?: TabItem[];
}

// --------------- Modal ---------------

export interface ModalConfig extends BaseComponent {
  type: 'modal';
  title?: string;
  triggerLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

// --------------- Union ---------------

export type ComponentConfig =
  | CardConfig
  | DataCardConfig
  | TableConfig
  | FormConfig
  | InputConfig
  | TextareaConfig
  | SelectConfig
  | CheckboxConfig
  | RadioGroupConfig
  | ButtonConfig
  | ChartConfig
  | SectionConfig
  | ContainerConfig
  | GridConfig
  | TabsConfig
  | ModalConfig
  | BaseComponent;

// --------------- Page Config ---------------

export interface PageConfig {
  title?: string;
  description?: string;
  layout?: 'dashboard' | 'form' | 'blank';
  theme?: 'light' | 'dark';
  components?: ComponentConfig[];
}

// --------------- Store Types ---------------

export interface AppState {
  // JSON config
  jsonString: string;
  parsedConfig: PageConfig | null;
  jsonError: string | null;
  validationErrors: { path: string; message: string }[];

  // Form state
  formData: Record<string, unknown>;

  // UI state
  isLoading: boolean;
  isDarkMode: boolean;
  activeModal: string | null;
  activeSample: string;
  sidebarOpen: boolean;

  // Actions
  setJsonString: (json: string) => void;
  parseJson: () => void;
  setFormField: (key: string, value: unknown) => void;
  resetFormData: () => void;
  toggleDarkMode: () => void;
  setActiveModal: (id: string | null) => void;
  setActiveSample: (key: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}
