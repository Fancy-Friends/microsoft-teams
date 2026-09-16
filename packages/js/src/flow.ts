/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */

/**
 * Microsoft Teams's node kinds with their TypeScript executors attached — for
 * hosts that EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/microsoft-teams-ui carries no
 * executor: the editor is React on every host, so a PHP or Python project
 * installs the ui package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { MICROSOFT_TEAMS } from "./service.js";

import {
  microsoftTeamsMeetingCreateKind,
  microsoftTeamsMeetingGetKind,
  microsoftTeamsTranscriptListKind,
} from "@particle-academy/microsoft-teams-ui";

import { microsoftTeamsMeetingCreate } from "./actions/meeting-create.js";
import { microsoftTeamsMeetingGet } from "./actions/meeting-get.js";
import { microsoftTeamsTranscriptList } from "./actions/transcript-list.js";

export const microsoftTeamsMeetingCreateExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await microsoftTeamsMeetingCreate({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `microsoft_teams meeting_create ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const microsoftTeamsMeetingGetExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await microsoftTeamsMeetingGet({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `microsoft_teams meeting_get ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const microsoftTeamsTranscriptListExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await microsoftTeamsTranscriptList({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `microsoft_teams transcript_list ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

/** The kinds a TypeScript host registers. */
export const MICROSOFT_TEAMS_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...microsoftTeamsMeetingCreateKind, executor: microsoftTeamsMeetingCreateExecutor },
  { ...microsoftTeamsMeetingGetKind, executor: microsoftTeamsMeetingGetExecutor },
  { ...microsoftTeamsTranscriptListKind, executor: microsoftTeamsTranscriptListExecutor },
];
