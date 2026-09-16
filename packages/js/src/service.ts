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
 * Microsoft Teams, as one service descriptor shared by every Microsoft Teams
 * operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Microsoft Teams: its base URL, its
 * auth scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Microsoft's test estate is a Microsoft 365 Developer Program sandbox: a
 * separate E5 tenant with its own users and its own OAuth consent, on the SAME
 * host -- the same fact microsoft-outlook already verified for Graph
 * generally. Eligibility is limited (Visual Studio Professional/Enterprise,
 * ISV Success / MAICPP partners, or Premier/Unified Support) and the tenant
 * expires after 90 days of no development activity. Without one, every call
 * reaches a real tenant.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { microsoftTeamsFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const MICROSOFT_TEAMS_BASE_URLS = {
  "live": "https://graph.microsoft.com",
  "sandbox": "https://graph.microsoft.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const MICROSOFT_TEAMS_REQUIRES = [
  "accessToken"
] as const;

/**
 * Apply Microsoft Teams's auth scheme to an outgoing request.
 *
 *
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function microsoftTeamsAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The Microsoft Teams service, for the TypeScript runtime. */
export const MICROSOFT_TEAMS: ServiceDescriptor = {
  service: "microsoft_teams",
  title: "Microsoft Teams",
  sandbox: "separate-account",
  baseUrls: { ...MICROSOFT_TEAMS_BASE_URLS },
  requires: [...MICROSOFT_TEAMS_REQUIRES],
  authorize: microsoftTeamsAuthorize,
  faker: microsoftTeamsFaker,
};
