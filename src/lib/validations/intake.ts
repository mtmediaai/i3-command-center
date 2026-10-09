import { z } from 'zod';

const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'throwawaymail.com',
];

export const IntakePayloadSchema = z
  .object({
    zipCode: z.string().trim().regex(/^\d{5}$/, 'Invalid 5-digit US postal code'),
    companyName: z.string().trim().min(2, 'Company name too short').max(100, 'Company name too long'),
    workEmail: z
      .string()
      .trim()
      .email('Invalid email address')
      .refine((email) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return !DISPOSABLE_EMAIL_DOMAINS.includes(domain);
      }, 'Disposable email addresses are not permitted'),
    craftVector: z.enum([
      'REALTOR',
      'BUILDER',
      'POOL_OUTDOOR',
      'EURO_AUTO',
      'SMART_HOME_AV',
      'REMODEL_LANDSCAPE',
      'OTHER',
    ]),
    craftOtherSpecification: z.string().trim().max(100).optional(),
    turnstileToken: z.string().optional(),
    hp_confirm: z.string().optional(),
    rendered_at: z.number().optional(),
  })
  .refine(
    (data) => {
      if (
        data.craftVector === 'OTHER' &&
        (!data.craftOtherSpecification || data.craftOtherSpecification.length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Specification required when craft is set to OTHER',
      path: ['craftOtherSpecification'],
    }
  );

export type IntakePayload = z.infer<typeof IntakePayloadSchema>;
