import { z } from 'zod'
import { optionSchema } from '@/models/common'
import { getAllBookingStatuses } from '@/utils/bookingStatus'

const bookingStatuses = getAllBookingStatuses() as [
  string,
  ...string[],
]

export const schema = z.object({
  driver: optionSchema.optional(),
  car: optionSchema.optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  status: z.enum(bookingStatuses),
  cancellation: z.boolean().default(false).optional(),
  theftProtection: z.boolean().default(false).optional(),
  fullInsurance: z.boolean().default(false).optional(),
  toolsIncluded: z.boolean(),
  chauffeurRequested: z.boolean(),
})

export type FormFields = z.infer<typeof schema>
