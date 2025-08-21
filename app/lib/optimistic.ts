import { toast } from 'sonner';

export type RollbackFn = () => void;

export async function optimisticAction(
  apply: () => RollbackFn,
  request: () => Promise<Response>,
  failureMessage = 'Server rejected change'
): Promise<void> {
  const rollback = apply();
  try {
    const res = await request();
    if (!res.ok) {
      rollback();
      toast.error(failureMessage);
    }
  } catch (_err) {
  rollback();
  toast.error(failureMessage);
  }
}

export default optimisticAction;
