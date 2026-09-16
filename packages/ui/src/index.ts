/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */

/**
 * Microsoft Teams's node kinds for fancy-flow.
 *
 * Install this on every host. The TypeScript executors live in the js
 * package's `./flow` subpath; PHP and Python hosts run their own and need only
 * this.
 */

export * from "./service.js";
export * from "./kinds/meeting-create.js";
export * from "./kinds/meeting-get.js";
export * from "./kinds/transcript-list.js";

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { microsoftTeamsMeetingCreateKind } from "./kinds/meeting-create.js";
import { microsoftTeamsMeetingGetKind } from "./kinds/meeting-get.js";
import { microsoftTeamsTranscriptListKind } from "./kinds/transcript-list.js";

/** Every Microsoft Teams kind, for a host that registers the lot. */
export const MICROSOFT_TEAMS_KINDS: NodeKindDefinition[] = [
  microsoftTeamsMeetingCreateKind,
  microsoftTeamsMeetingGetKind,
  microsoftTeamsTranscriptListKind,
];
