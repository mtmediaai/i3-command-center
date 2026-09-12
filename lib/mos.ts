/**
 * MOS Telemetry Client
 * Sends local telemetry signals to the MOS Command Center on http://127.0.0.1:8721.
 * Failure-isolated: all calls timeout after 1.5s and never block lead submission.
 */

export interface MosSignalPayload {
  type: string;
  entity?: string;
  level?: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export async function sendMosSignal(payload: MosSignalPayload): Promise<boolean> {
  const mosUrl = process.env.MOS_ENDPOINT || 'http://127.0.0.1:8721/api/gev/ingest';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);

  try {
    const res = await fetch(mosUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signals: [
          {
            type: payload.type,
            entity: payload.entity || 'woodlands',
            level: payload.level || 'zip',
            text: payload.text,
            metadata: payload.metadata || {},
            ts: new Date().toISOString(),
          },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    return res.ok;
  } catch (err) {
    clearTimeout(timer);
    // Non-fatal: MOS may be running on another machine or port
    return false;
  }
}
