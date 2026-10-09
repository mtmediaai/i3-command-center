import { NextRequest, NextResponse } from 'next/server';
import { IntakePayloadSchema } from '@/src/lib/validations/intake';
import { processTerritoryIntake } from '@/src/lib/intake-service';

function secureJsonResponse(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
      Pragma: 'no-cache',
      ...extraHeaders,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Content-Length Safety Check (<16KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 16384) {
      return secureJsonResponse({ error: 'PAYLOAD_TOO_LARGE' }, 413);
    }

    // 2. Client IP Extraction
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfIp = request.headers.get('cf-connecting-ip');
    const clientIp = cfIp || realIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

    // 3. Parse JSON Body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return secureJsonResponse({ error: 'INVALID_JSON_BODY' }, 400);
    }

    // 4. Strict Zod Schema Validation
    const parseResult = IntakePayloadSchema.safeParse(body);
    if (!parseResult.success) {
      return secureJsonResponse(
        {
          error: 'VALIDATION_FAILED',
          details: parseResult.error.flatten(),
        },
        400
      );
    }

    // 5. Process Territory Intake through Citadel, TIF v1.0, and CRM
    const outcome = await processTerritoryIntake(parseResult.data, clientIp);

    return secureJsonResponse(outcome.data, outcome.status, outcome.headers);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[POST /api/intake Error]:', message);
    return secureJsonResponse(
      {
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Intake processing error encountered',
      },
      500
    );
  }
}
