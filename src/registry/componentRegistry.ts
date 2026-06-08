import { ElementType } from 'react';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { DynamicTable } from '@/components/ui/DynamicTable';
import { DynamicForm } from '@/components/ui/DynamicForm';
import { DynamicInput } from '@/components/ui/DynamicInput';
import { DynamicTextarea } from '@/components/ui/DynamicTextarea';
import { DynamicSelect } from '@/components/ui/DynamicSelect';
import { DynamicCheckbox } from '@/components/ui/DynamicCheckbox';
import { DynamicRadioGroup } from '@/components/ui/DynamicRadioGroup';
import { DynamicButton } from '@/components/ui/DynamicButton';
import { ChartComponent } from '@/components/ui/ChartComponent';
import { DynamicSection } from '@/components/ui/DynamicSection';
import { DynamicContainer } from '@/components/ui/DynamicContainer';
import { DynamicGrid } from '@/components/ui/DynamicGrid';
import { DynamicTabs } from '@/components/ui/DynamicTabs';
import { DynamicModal } from '@/components/ui/DynamicModal';
import { DynamicDataCard } from '@/components/ui/DynamicDataCard';
import { UnknownComponent } from '@/components/ui/UnknownComponent';

// ============================================================
// Component Registry Metadata & System
// Provides descriptions, expected fields, and default mock states
// ============================================================

export interface ComponentMetadata {
  type: string;
  name: string;
  description: string;
  component: ElementType;
  defaultState: Record<string, unknown>;
  expectedProps: Record<string, string>;
}

const componentRegistry: Record<string, ComponentMetadata> = {
  card: {
    type: 'card',
    name: 'Dashboard Card',
    description: 'Displays metrics, values, trends and indicator icons.',
    component: DashboardCard,
    expectedProps: {
      title: 'string (label)',
      value: 'string (value metrics)',
      icon: 'users | folder | building | briefcase | dollar-sign | activity',
      trend: 'string (e.g. +12%)',
      trendDirection: 'up | down | neutral',
      variant: 'default | gradient | outline',
    },
    defaultState: {
      type: 'card',
      title: 'Metrics Label',
      value: '1,200',
      icon: 'activity',
      trend: '+5%',
      trendDirection: 'up',
      variant: 'gradient',
    },
  },
  datacard: {
    type: 'datacard',
    name: 'Data Card',
    description: 'Shows structured key-value detail arrays.',
    component: DynamicDataCard,
    expectedProps: {
      title: 'string (card label)',
      fields: 'array({ label: string, value: string })',
    },
    defaultState: {
      type: 'datacard',
      title: 'Profile Information',
      fields: [
        { label: 'Role', value: 'Administrator' },
        { label: 'Permissions', value: 'All' },
      ],
    },
  },
  table: {
    type: 'table',
    name: 'Data Table',
    description: 'Tabular rendering with headers, status tags, search & sorting.',
    component: DynamicTable,
    expectedProps: {
      title: 'string (header)',
      columns: 'array(string)',
      data: 'array(object)',
    },
    defaultState: {
      type: 'table',
      title: 'Recent Activity',
      columns: ['Action', 'Operator', 'Status'],
      data: [
        { Action: 'Update DB', Operator: 'System Admin', Status: 'Active' },
        { Action: 'Create User', Operator: 'HR Manager', Status: 'Active' },
      ],
    },
  },
  form: {
    type: 'form',
    name: 'Form Container',
    description: 'Encapsulates input widgets and handles submit triggers.',
    component: DynamicForm,
    expectedProps: {
      title: 'string (form header)',
      submitLabel: 'string (submit action label)',
      children: 'array(components)',
    },
    defaultState: {
      type: 'form',
      title: 'Submit Inquiry',
      submitLabel: 'Send Inquiry',
      children: [],
    },
  },
  input: {
    type: 'input',
    name: 'Text Input',
    description: 'Single-line text entry block with Zod integration.',
    component: DynamicInput,
    expectedProps: {
      label: 'string (label text)',
      placeholder: 'string (empty hints)',
      inputType: 'text | email | password | number',
      name: 'string (form state identifier key)',
      required: 'boolean',
      defaultValue: 'string',
    },
    defaultState: {
      type: 'input',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      name: 'fullName',
      required: true,
    },
  },
  textarea: {
    type: 'textarea',
    name: 'Textarea Field',
    description: 'Multi-line message input widget.',
    component: DynamicTextarea,
    expectedProps: {
      label: 'string',
      placeholder: 'string',
      name: 'string',
      rows: 'number',
      required: 'boolean',
    },
    defaultState: {
      type: 'textarea',
      label: 'Details',
      placeholder: 'Explain the issue in detail...',
      name: 'details',
      rows: 4,
    },
  },
  select: {
    type: 'select',
    name: 'Dropdown Selection',
    description: 'Selector menu for array choices.',
    component: DynamicSelect,
    expectedProps: {
      label: 'string',
      name: 'string',
      placeholder: 'string',
      options: 'array({ label: string, value: string })',
      required: 'boolean',
    },
    defaultState: {
      type: 'select',
      label: 'Priority',
      name: 'priority',
      placeholder: 'Choose priority status',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Normal', value: 'normal' },
        { label: 'Low', value: 'low' },
      ],
    },
  },
  checkbox: {
    type: 'checkbox',
    name: 'Checkbox Selection',
    description: 'Single selection binary toggles.',
    component: DynamicCheckbox,
    expectedProps: {
      label: 'string',
      name: 'string',
      checked: 'boolean',
    },
    defaultState: {
      type: 'checkbox',
      label: 'Accept terms of service',
      name: 'acceptTerms',
      checked: false,
    },
  },
  radio: {
    type: 'radio',
    name: 'Radio Choices',
    description: 'Exclusive multi-choice radio items.',
    component: DynamicRadioGroup,
    expectedProps: {
      label: 'string',
      name: 'string',
      options: 'array({ label: string, value: string })',
      defaultValue: 'string',
    },
    defaultState: {
      type: 'radio',
      label: 'Select Plan',
      name: 'plan',
      options: [
        { label: 'Basic Option', value: 'basic' },
        { label: 'Premium Option', value: 'premium' },
      ],
      defaultValue: 'basic',
    },
  },
  button: {
    type: 'button',
    name: 'Action Button',
    description: 'State triggers with variant styles.',
    component: DynamicButton,
    expectedProps: {
      label: 'string',
      variant: 'primary | secondary | danger | ghost | outline',
      size: 'sm | md | lg',
      disabled: 'boolean',
      loading: 'boolean',
    },
    defaultState: {
      type: 'button',
      label: 'Proceed Workspace',
      variant: 'primary',
      size: 'md',
    },
  },
  chart: {
    type: 'chart',
    name: 'Data Chart',
    description: 'Renders dynamic Bar, Line, Pie, and Area charts.',
    component: ChartComponent,
    expectedProps: {
      title: 'string',
      chartType: 'bar | line | pie | area',
      data: 'array(objects)',
      dataKey: 'string',
      xKey: 'string',
    },
    defaultState: {
      type: 'chart',
      title: 'Monthly Progress',
      chartType: 'bar',
      data: [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 800 },
      ],
    },
  },
  section: {
    type: 'section',
    name: 'Header Section',
    description: 'Divides page views with a title and paragraph description.',
    component: DynamicSection,
    expectedProps: {
      title: 'string',
      description: 'string',
      children: 'array(components)',
    },
    defaultState: {
      type: 'section',
      title: 'Overview Section',
      description: 'Review details below.',
      children: [],
    },
  },
  container: {
    type: 'container',
    name: 'Layout Container',
    description: 'Bounds and spaces children within padding rules.',
    component: DynamicContainer,
    expectedProps: {
      padding: 'string (CSS padding rules)',
      maxWidth: 'string (CSS max-width rules)',
      children: 'array(components)',
    },
    defaultState: {
      type: 'container',
      padding: '1.5rem',
      maxWidth: '1200px',
      children: [],
    },
  },
  grid: {
    type: 'grid',
    name: 'Grid Layout',
    description: 'Grid layout structures for aligning child columns.',
    component: DynamicGrid,
    expectedProps: {
      columns: 'number (1-12 columns)',
      gap: 'string (e.g. 1rem)',
      children: 'array(components)',
    },
    defaultState: {
      type: 'grid',
      columns: 2,
      gap: '1rem',
      children: [],
    },
  },
  tabs: {
    type: 'tabs',
    name: 'Tab Panels',
    description: 'Displays a set of tab panels selectable by labels.',
    component: DynamicTabs,
    expectedProps: {
      tabs: 'array({ label: string, children: array(components) })',
    },
    defaultState: {
      type: 'tabs',
      tabs: [
        { label: 'Tab Panel A', children: [] },
        { label: 'Tab Panel B', children: [] },
      ],
    },
  },
  modal: {
    type: 'modal',
    name: 'Overlay Modal',
    description: 'Triggered overlay modals containing recursive component structures.',
    component: DynamicModal,
    expectedProps: {
      title: 'string',
      triggerLabel: 'string',
      size: 'sm | md | lg',
      children: 'array(components)',
    },
    defaultState: {
      type: 'modal',
      title: 'Operation Panel',
      triggerLabel: 'Launch Action',
      size: 'md',
      children: [],
    },
  },
};

/**
 * Retrieve component by type string.
 * Returns UnknownComponent if unregistered.
 */
export function getComponent(type: string): ElementType {
  const norm = type?.toLowerCase() || '';
  return componentRegistry[norm]?.component ?? UnknownComponent;
}

/**
 * Get the metadata profile of a registered type.
 */
export function getComponentMetadata(type: string): ComponentMetadata | undefined {
  return componentRegistry[type?.toLowerCase()];
}

/**
 * List all metadata profiles registered in system directory
 */
export function getAllComponentMetadata(): ComponentMetadata[] {
  return Object.values(componentRegistry);
}

/**
 * Get registered type keys
 */
export function getRegisteredTypes(): string[] {
  return Object.keys(componentRegistry);
}
