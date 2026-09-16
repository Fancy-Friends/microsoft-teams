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
 * List transcripts — List a finished meeting's transcripts and their download
 * URLs.
 *
 * https://learn.microsoft.com/en-us/graph/api/onlinemeeting-list-transcripts
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { microsoftTeamsMeta } from "../service.js";

export const MICROSOFT_TEAMS_TRANSCRIPT_LIST_KIND = "@particle-academy/microsoft_teams_transcript_list";
export const MICROSOFT_TEAMS_TRANSCRIPT_LIST_OPERATION = "transcript_list";

export const MICROSOFT_TEAMS_TRANSCRIPT_LIST_META = microsoftTeamsMeta("action", "a meeting's transcripts", "https://learn.microsoft.com/en-us/graph/api/onlinemeeting-list-transcripts");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const MICROSOFT_TEAMS_TRANSCRIPT_LIST_OUTPUT: OutputField[] = [
  {
    "path": "data.value",
    "type": "array",
    "description": "Usually one. Each has id, meetingId, createdDateTime, endDateTime, and transcriptContentUrl -- a Graph URL that answers with the VTT caption file (text/vtt), not JSON. Download it with the same access token; this connector does not fetch it for you."
  }
];

export const microsoftTeamsTranscriptListKind: NodeKindDefinition = defineConnectorKind(MICROSOFT_TEAMS_TRANSCRIPT_LIST_META, {
  name: MICROSOFT_TEAMS_TRANSCRIPT_LIST_KIND,
  aliases: ["microsoft_teams_transcript_list"],
  label: "List transcripts",
  description: "List a finished meeting's transcripts and their download URLs.",
  icon: "📝",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: MICROSOFT_TEAMS_TRANSCRIPT_LIST_OUTPUT,
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
    summarize(MICROSOFT_TEAMS_TRANSCRIPT_LIST_META, config as Record<string, unknown>, "a meeting's transcripts"),
});
