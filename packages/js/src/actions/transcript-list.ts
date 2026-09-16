/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/transcript-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/transcript-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */

/**
 * List a finished meeting's transcripts and their download URLs.
 *
 * GET /v1.0/users/{userId}/onlineMeetings/{meetingId}/transcripts —
 * https://learn.microsoft.com/en-us/graph/api/onlinemeeting-list-transcripts
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Microsoft Teams or calls the
 * faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { MICROSOFT_TEAMS } from "../service.js";

export const TRANSCRIPT_LIST_OPERATION = "transcript_list";

export type TranscriptListOptions = {
  /** The node's resolved config. Keys: userId, meetingId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function microsoftTeamsTranscriptList(options: TranscriptListOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.userId === undefined || config.userId === null || config.userId === "") {
    throw new Error(`transcript_list: "userId" is required (User ID).`);
  }

  if (config.meetingId === undefined || config.meetingId === null || config.meetingId === "") {
    throw new Error(`transcript_list: "meetingId" is required (Meeting ID).`);
  }

  return callConnector(MICROSOFT_TEAMS, {
    operation: TRANSCRIPT_LIST_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/v1.0/users/${encodeURIComponent(String(config.userId))}/onlineMeetings/${encodeURIComponent(String(config.meetingId))}/transcripts`,
      query: {},
    },
  });
}
