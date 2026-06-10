export interface ProfileTypeOption {
  value: string;
  label: string;
}

export interface ProfileTypeGroup {
  label: string;
  types: ProfileTypeOption[];
}

export const PROFILE_TYPE_GROUPS: ProfileTypeGroup[] = [
  {
    label: 'Builder',
    types: [
      { value: 'Founder', label: 'Founder' },
      { value: 'Startup Founder', label: 'Startup Founder' },
      { value: 'Co-founder', label: 'Co-founder' },
      { value: 'Solo Founder', label: 'Solo Founder' },
    ],
  },
  {
    label: 'Professional',
    types: [
      { value: 'Developer', label: 'Developer' },
      { value: 'Designer', label: 'Designer' },
      { value: 'Engineer', label: 'Engineer' },
      { value: 'Researcher', label: 'Researcher' },
      { value: 'Architect', label: 'Architect' },
      { value: 'Data Scientist', label: 'Data Scientist' },
      { value: 'Product Manager', label: 'Product Manager' },
      { value: 'Marketing Professional', label: 'Marketing Professional' },
      { value: 'Sales Professional', label: 'Sales Professional' },
      { value: 'Operations Professional', label: 'Operations Professional' },
    ],
  },
  {
    label: 'Service',
    types: [
      { value: 'Freelancer', label: 'Freelancer' },
      { value: 'Consultant', label: 'Consultant' },
      { value: 'Agency', label: 'Agency' },
      { value: 'Service Provider', label: 'Service Provider' },
      { value: 'Legal Professional', label: 'Legal Professional' },
      { value: 'Finance Professional', label: 'Finance Professional' },
      { value: 'Healthcare Professional', label: 'Healthcare Professional' },
    ],
  },
  {
    label: 'Business',
    types: [
      { value: 'Business Owner', label: 'Business Owner' },
      { value: 'Company', label: 'Company' },
      { value: 'Manufacturer', label: 'Manufacturer' },
      { value: 'Vendor', label: 'Vendor' },
      { value: 'Supplier', label: 'Supplier' },
    ],
  },
  {
    label: 'Talent',
    types: [
      { value: 'Job Seeker', label: 'Job Seeker' },
      { value: 'Student', label: 'Student' },
      { value: 'Intern', label: 'Intern' },
    ],
  },
  {
    label: 'Capital',
    types: [
      { value: 'Investor', label: 'Investor' },
      { value: 'Angel Investor', label: 'Angel Investor' },
      { value: 'VC', label: 'VC' },
      { value: 'Fund', label: 'Fund' },
    ],
  },
  {
    label: 'Growth',
    types: [
      { value: 'Mentor', label: 'Mentor' },
      { value: 'Coach', label: 'Coach' },
      { value: 'Trainer', label: 'Trainer' },
      { value: 'Educator', label: 'Educator' },
    ],
  },
  {
    label: 'Community',
    types: [
      { value: 'Creator', label: 'Creator' },
      { value: 'Influencer', label: 'Influencer' },
      { value: 'Community Builder', label: 'Community Builder' },
      { value: 'Event Organizer', label: 'Event Organizer' },
      { value: 'NGO Representative', label: 'NGO Representative' },
      { value: 'Normal User', label: 'Normal User' },
    ],
  },
];

export const ALL_PROFILE_TYPES = PROFILE_TYPE_GROUPS.flatMap((g) => g.types);

export function isFounderType(type: string) {
  const t = type.toLowerCase();
  return ['founder', 'startup', 'business owner', 'company'].some((k) => t.includes(k));
}

export function isInvestorType(type: string) {
  const t = type.toLowerCase();
  return ['investor', 'angel', 'vc', 'fund'].some((k) => t.includes(k));
}

export function isTalentType(type: string) {
  const t = type.toLowerCase();
  return ['job seeker', 'student', 'intern'].some((k) => t.includes(k));
}
