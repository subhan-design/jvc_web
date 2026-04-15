import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export interface MarketAreaError {
  code: 'MARKET_AREA_RESTRICTED';
  message: string;
  state: string;
  allowedStates: string[];
}

interface MarketAreaRestrictedModalProps {
  open: boolean;
  onClose: () => void;
  error: MarketAreaError | null;
}

/** Checks whether an API error is a MARKET_AREA_RESTRICTED 403 response. */
export function isMarketAreaRestricted(err: any): MarketAreaError | null {
  if (err?.status !== 403) return null;

  try {
    const body =
      typeof err.responseText === 'string'
        ? JSON.parse(err.responseText)
        : err.responseText;

    if (body?.code === 'MARKET_AREA_RESTRICTED') {
      return body as MarketAreaError;
    }
  } catch {
    // responseText wasn't JSON – not a market-area error
  }

  return null;
}

export default function MarketAreaRestrictedModal({
  open,
  onClose,
  error,
}: MarketAreaRestrictedModalProps) {
  if (!error) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <MapPin className="h-8 w-8 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-[#043C6B]">
            Service Not Available in Your Area
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed text-gray-600">
            {error.message}
          </DialogDescription>
        </DialogHeader>

        {error.allowedStates?.length > 0 && (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Currently Available In
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {error.allowedStates.map((st) => (
                <span
                  key={st}
                  className="inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-blue-800 shadow-sm"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-center pt-2">
          <Button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#043C6B] hover:bg-[#032d52]"
          >
            Got It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
