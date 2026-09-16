/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/meeting-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/meeting-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */

/**
 * Get meeting — Read a Teams meeting's current details.
 *
 * https://learn.microsoft.com/en-us/graph/api/onlinemeeting-get
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { microsoftTeamsMeta } from "../service.js";

export const MICROSOFT_TEAMS_MEETING_GET_KIND = "@particle-academy/microsoft_teams_meeting_get";
export const MICROSOFT_TEAMS_MEETING_GET_OPERATION = "meeting_get";

export const MICROSOFT_TEAMS_MEETING_GET_META = microsoftTeamsMeta("action", "a Teams meeting", "https://learn.microsoft.com/en-us/graph/api/onlinemeeting-get");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const MICROSOFT_TEAMS_MEETING_GET_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The meeting's id."
  },
  {
    "path": "data.joinWebUrl",
    "type": "string",
    "description": "The join link."
  },
  {
    "path": "data.subject",
    "type": "string",
    "description": "The meeting's subject."
  },
  {
    "path": "data.startDateTime",
    "type": "string",
    "description": "ISO 8601."
  },
  {
    "path": "data.endDateTime",
    "type": "string",
    "description": "ISO 8601."
  },
  {
    "path": "data.participants.organizer.identity.user.id",
    "type": "string",
    "description": "The organizer's user id."
  },
  {
    "path": "data.participants.organizer.identity.user.displayName",
    "type": "string",
    "description": "The organizer's display name."
  }
];

export const microsoftTeamsMeetingGetKind: NodeKindDefinition = defineConnectorKind(MICROSOFT_TEAMS_MEETING_GET_META, {
  name: MICROSOFT_TEAMS_MEETING_GET_KIND,
  aliases: ["microsoft_teams_meeting_get"],
  label: "Get meeting",
  description: "Read a Teams meeting's current details.",
  icon: "🎥",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: MICROSOFT_TEAMS_MEETING_GET_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "userId",
      "label": "User ID",
      "required": true,
      "description": "The meeting organizer's Microsoft Entra object id."
    },
    {
      "type": "text",
      "key": "meetingId",
      "label": "Meeting ID",
      "required": true,
      "description": "From meeting_create's data.id."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(MICROSOFT_TEAMS_MEETING_GET_META, config as Record<string, unknown>, "a Teams meeting"),
});
