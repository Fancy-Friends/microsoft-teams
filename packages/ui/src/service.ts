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
 * Microsoft Teams's identity on the authoring surface, shared by every
 * Microsoft Teams node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * Microsoft's test estate is a Microsoft 365 Developer Program sandbox: a
 * separate E5 tenant with its own users and its own OAuth consent, on the SAME
 * host -- the same fact microsoft-outlook already verified for Graph
 * generally. Eligibility is limited (Visual Studio Professional/Enterprise,
 * ISV Success / MAICPP partners, or Premier/Unified Support) and the tenant
 * expires after 90 days of no development activity. Without one, every call
 * reaches a real tenant.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const MICROSOFT_TEAMS_SERVICE = {
  service: "microsoft_teams",
  serviceTitle: "Microsoft Teams",
  domain: "messaging",
  sandbox: "separate-account",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Microsoft Teams connection holds. */
export const MICROSOFT_TEAMS_CREDENTIALS = [
  {
    "key": "clientId",
    "label": "Application (client) ID",
    "scope": "provider",
    "secret": false,
    "help": "From the Microsoft Entra admin center -> App registrations. ONE value for the whole installation, not per connected account."
  },
  {
    "key": "clientSecret",
    "label": "Client secret",
    "scope": "provider",
    "secret": true,
    "help": "A client secret of the same app registration. One value for the whole installation; Entra expires them, so record the expiry."
  },
  {
    "key": "accessToken",
    "label": "Access token",
    "scope": "account",
    "secret": true,
    "help": "Per connected Microsoft account, and it expires after about ONE HOUR. The host refreshes it with the refresh token."
  },
  {
    "key": "refreshToken",
    "label": "Refresh token",
    "scope": "account",
    "secret": true,
    "optional": true,
    "help": "Per connected Microsoft account; issued only when the consent request includes offline_access. Every refresh answers with a NEW one -- persist it."
  }
] as const;

/**
 * The OAuth2 exchange Microsoft Teams requires — DECLARED here, performed by
 * the host.
 *
 * A consent screen needs a browser, a redirect URI and somewhere to persist
 * the result, and all three belong to the host; a package that ran the dance
 * itself would have to own a web server. So this says precisely enough for a
 * host to do it.
 *
 * The access token lasts 3600 seconds. A host that never refreshes will work
 * all afternoon and be broken by morning, which is why the lifetime is stated
 * rather than left to be discovered.
 *
 * Its refresh tokens do NOT rotate: the same one is reusable, so a refresh may
 * safely be retried and may run concurrently. That is stated rather than
 * assumed because the opposite — a provider that spends the token and revokes
 * the grant on a replay — looks identical until it happens.
 */
export const MICROSOFT_TEAMS_OAUTH = {
  "flow": "authorization_code",
  "authorizeUrl": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  "tokenUrl": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  "scopes": [
    "OnlineMeetings.ReadWrite.All",
    "OnlineMeetingTranscript.Read.All",
    "offline_access"
  ],
  "accessTokenCredential": "accessToken",
  "refreshTokenCredential": "refreshToken",
  "refreshTokenRotates": false,
  "accessTokenTtlSeconds": 3600
} as const;

/** Build a Microsoft Teams node's connector metadata from the operation it performs. */
export function microsoftTeamsMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...MICROSOFT_TEAMS_SERVICE, role, operation, docs };
}
