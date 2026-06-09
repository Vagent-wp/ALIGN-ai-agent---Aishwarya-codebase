import { z } from 'zod';

/** Placeholder schemas — fields will be injected when onboarding architecture is provided */
export const earlyAccessStepSchemas = [
  z.object({}), // Step 1 placeholder
  z.object({}), // Step 2 placeholder
  z.object({}), // Step 3 placeholder
];

export type EarlyAccessFormData = Record<string, unknown>;

export function validateStep(stepIndex: number, data: EarlyAccessFormData) {
  const schema = earlyAccessStepSchemas[stepIndex];
  if (!schema) return { success: true as const, data };
  const result = schema.safeParse(data);
  if (result.success) return { success: true as const, data: result.data };
  return { success: false as const, errors: result.error.flatten().fieldErrors };
}

/** Contact form validation (implemented) */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/** Upload framework placeholder */
export const uploadConstraints = {
  maxSizeBytes: 5 * 1024 * 1024,
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  maxFiles: 3,
};

export function validateUpload(file: File): string | null {
  if (!uploadConstraints.acceptedTypes.includes(file.type)) {
    return 'File type not supported';
  }
  if (file.size > uploadConstraints.maxSizeBytes) {
    return 'File must be under 5MB';
  }
  return null;
}
