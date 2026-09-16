/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/meeting-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/meeting-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */

/**
 * Create a Teams meeting on behalf of a user and get its join link.
 *
 * POST /v1.0/users/{userId}/onlineMeetings —
 * https://learn.microsoft.com/en-us/graph/api/application-post-onlinemeetings
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Microsoft Teams or calls the
 * faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { MICROSOFT_TEAMS } from "../service.js";

export const MEETING_CREATE_OPERATION = "meeting_create";

export type MeetingCreateOptions = {
  /** The node's resolved config. Keys: userId, subject, startDateTime, endDateTime, passcodeRequired. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function microsoftTeamsMeetingCreate(options: MeetingCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.userId === undefined || config.userId === null || config.userId === "") {
    throw new Error(`meeting_create: "userId" is required (User ID).`);
  }

  if (config.startDateTime === undefined || config.startDateTime === null || config.startDateTime === "") {
    throw new Error(`meeting_create: "startDateTime" is required (Start).`);
  }

  if (config.endDateTime === undefined || config.endDateTime === null || config.endDateTime === "") {
    throw new Error(`meeting_create: "endDateTime" is required (End).`);
  }

  return callConnector(MICROSOFT_TEAMS, {
    operation: MEETING_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/v1.0/users/${encodeURIComponent(String(config.userId))}/onlineMeetings`,
      json: nestFields({
        ...(config.subject !== undefined && config.subject !== null && config.subject !== "" ? { "subject": String(config.subject) } : {}),
        "startDateTime": String(config.startDateTime),
        "endDateTime": String(config.endDateTime),
        ...(config.passcodeRequired !== undefined && config.passcodeRequired !== null && config.passcodeRequired !== "" ? { "joinMeetingIdSettings.isPasscodeRequired": Boolean(config.passcodeRequired) } : {}),
      }),
    },
  });
}

/**
 * `{"properties.email": x}` -> `{properties: {email: x}}`.
 *
 * A dotted `as` means NESTING, and only a JSON body can nest. The validator
 * refuses that spelling anywhere else, because in a form body it already means
 * something different — a literal dotted key.
 */
function nestFields(flat: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let node = out;

    while (parts.length > 1) {
      const key = parts.shift() as string;
      // A NUMERIC segment is an array index: `dateRanges.0.startDate` has to
      // become `[{startDate}]`, not `{"0": {startDate}}`. PHP produced the
      // array by accident (its integer-keyed arrays serialise as JSON lists)
      // and the other two produced an object, which the provider rejects as
      // the wrong type. The parity suite is what caught the disagreement.
      const wantsArray = /^\d+$/.test(parts[0] ?? "");

      if (typeof node[key] !== "object" || node[key] === null) node[key] = wantsArray ? [] : {};
      node = node[key] as Record<string, unknown>;
    }

    node[parts[0] as string] = value;
  }

  return out;
}
