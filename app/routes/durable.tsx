import { EventDashboard } from '~/components/event-dashboard';
import { useSearchParams } from 'react-router';
import { z } from 'zod';

// Validate role using zod enum
const RoleSchema = z.enum(['registration', 'backstage']);
type Role = z.infer<typeof RoleSchema>;

export default function Durable() {
  const [searchParams] = useSearchParams();
  const parsed = RoleSchema.safeParse(searchParams.get('role'));
  const role: Role = parsed.success ? parsed.data : 'registration';
  
  return (
    <div>
      <h1>Event timer dashboard</h1>
      <EventDashboard role={role} />
    </div>
  );
}