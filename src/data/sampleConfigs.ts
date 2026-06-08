import { PageConfig } from '@/types/schema';

export const sampleConfigs: Record<string, { label: string; config: PageConfig }> = {
  'employee-dashboard': {
    label: '👥 Employee Dashboard',
    config: {
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
  },

  'contact-form': {
    label: '📝 Contact Form',
    config: {
      title: 'Contact Us',
      layout: 'form',
      components: [
        {
          type: 'section',
          title: 'Get in Touch',
          description: 'Fill out the form below and we\'ll get back to you within 24 hours.',
          children: [
            {
              type: 'form',
              title: 'Contact Form',
              submitLabel: 'Send Message',
              children: [
                {
                  type: 'grid',
                  columns: 2,
                  children: [
                    { type: 'input', label: 'First Name', name: 'firstName', placeholder: 'John', required: true },
                    { type: 'input', label: 'Last Name', name: 'lastName', placeholder: 'Doe', required: true },
                  ],
                },
                { type: 'input', label: 'Email', name: 'email', inputType: 'email', placeholder: 'john@example.com', required: true },
                {
                  type: 'select',
                  label: 'Subject',
                  name: 'subject',
                  placeholder: 'Select a topic',
                  options: [
                    { label: 'General Inquiry', value: 'general' },
                    { label: 'Technical Support', value: 'support' },
                    { label: 'Billing', value: 'billing' },
                    { label: 'Partnership', value: 'partnership' },
                  ],
                },
                { type: 'textarea', label: 'Message', name: 'message', placeholder: 'Tell us what you need help with...', rows: 5, required: true },
                { type: 'checkbox', label: 'I agree to the terms and conditions', name: 'terms' },
                { type: 'button', label: 'Send Message', variant: 'primary', size: 'lg' },
              ],
            },
          ],
        },
      ],
    },
  },

  'analytics-dashboard': {
    label: '📊 Analytics Dashboard',
    config: {
      title: 'Analytics Overview',
      layout: 'dashboard',
      components: [
        {
          type: 'grid',
          columns: 3,
          children: [
            { type: 'card', title: 'Total Revenue', value: '$124,500', icon: 'dollar-sign', trend: '+18.2%', trendDirection: 'up', variant: 'gradient' },
            { type: 'card', title: 'Active Users', value: '8,942', icon: 'users', trend: '+7.1%', trendDirection: 'up' },
            { type: 'card', title: 'Bounce Rate', value: '24.5%', icon: 'activity', trend: '-2.3%', trendDirection: 'down' },
          ],
        },
        {
          type: 'grid',
          columns: 2,
          children: [
            {
              type: 'chart',
              title: 'Revenue Over Time',
              chartType: 'area',
              data: [
                { name: 'Mon', value: 4200 },
                { name: 'Tue', value: 5100 },
                { name: 'Wed', value: 4800 },
                { name: 'Thu', value: 6200 },
                { name: 'Fri', value: 7100 },
                { name: 'Sat', value: 5600 },
                { name: 'Sun', value: 4900 },
              ],
            },
            {
              type: 'chart',
              title: 'Traffic Sources',
              chartType: 'pie',
              data: [
                { name: 'Organic', value: 42 },
                { name: 'Direct', value: 28 },
                { name: 'Social', value: 18 },
                { name: 'Referral', value: 12 },
              ],
            },
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Overview',
              children: [
                {
                  type: 'datacard',
                  title: 'Key Metrics',
                  fields: [
                    { label: 'Avg. Session Duration', value: '4m 32s' },
                    { label: 'Pages per Session', value: '3.8' },
                    { label: 'Conversion Rate', value: '3.2%' },
                    { label: 'New vs Returning', value: '62% / 38%' },
                  ],
                },
              ],
            },
            {
              label: 'Performance',
              children: [
                {
                  type: 'chart',
                  title: 'Weekly Performance',
                  chartType: 'line',
                  data: [
                    { name: 'Week 1', value: 85 },
                    { name: 'Week 2', value: 92 },
                    { name: 'Week 3', value: 78 },
                    { name: 'Week 4', value: 95 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },

  'settings-page': {
    label: '⚙️ Settings Page',
    config: {
      title: 'Application Settings',
      layout: 'form',
      components: [
        {
          type: 'section',
          title: 'Profile Settings',
          description: 'Manage your account information and preferences.',
          children: [
            {
              type: 'form',
              submitLabel: 'Save Changes',
              children: [
                {
                  type: 'grid',
                  columns: 2,
                  children: [
                    { type: 'input', label: 'Display Name', name: 'displayName', defaultValue: 'John Doe' },
                    { type: 'input', label: 'Email', name: 'email', inputType: 'email', defaultValue: 'john@example.com' },
                  ],
                },
                { type: 'textarea', label: 'Bio', name: 'bio', rows: 3, placeholder: 'Tell us about yourself...' },
                {
                  type: 'radio',
                  label: 'Theme Preference',
                  name: 'theme',
                  defaultValue: 'dark',
                  options: [
                    { label: 'Light Mode', value: 'light' },
                    { label: 'Dark Mode', value: 'dark' },
                    { label: 'System Default', value: 'system' },
                  ],
                },
                { type: 'checkbox', label: 'Enable email notifications', name: 'emailNotifications', checked: true },
                { type: 'checkbox', label: 'Enable two-factor authentication', name: 'twoFactor' },
                {
                  type: 'grid',
                  columns: 2,
                  children: [
                    { type: 'button', label: 'Save Changes', variant: 'primary' },
                    { type: 'button', label: 'Cancel', variant: 'ghost' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
