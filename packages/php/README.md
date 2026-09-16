# Microsoft Teams

[![Fancified](art/fancified.svg)](https://particle.academy)

Microsoft Teams for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/microsoft-teams-ui` | `npm install @particle-academy/microsoft-teams-ui` |
| Node | `@particle-academy/microsoft-teams-js` | `npm install @particle-academy/microsoft-teams-js` |
| PHP 8.4+ | `particle-academy/microsoft-teams-php` | `composer require particle-academy/microsoft-teams-php` |
| Python 3.11+ | `fancy-microsoft-teams` | `pip install fancy-microsoft-teams` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Microsoft Teams SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Microsoft Teams connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **Application (client) ID** | per installation | not secret | From the Microsoft Entra admin center -> App registrations. ONE value for the whole installation, not per connected account. |
| **Client secret** | per installation | **secret** | A client secret of the same app registration. One value for the whole installation; Entra expires them, so record the expiry. |
| **Access token** | per connected account | **secret** | Per connected Microsoft account, and it expires after about ONE HOUR. The host refreshes it with the refresh token. |
| **Refresh token** *(optional)* | per connected account | **secret** | Per connected Microsoft account; issued only when the consent request includes offline_access. Every refresh answers with a NEW one -- persist it. |

### Authorising

Microsoft Teams uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://login.microsoftonline.com/common/oauth2/v2.0/authorize
- **Token URL** — https://login.microsoftonline.com/common/oauth2/v2.0/token
- **Scopes** — `OnlineMeetings.ReadWrite.All`, `OnlineMeetingTranscript.Read.All`, `offline_access`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.

The refresh tokens do **not** rotate: the same one is reusable, so a refresh may safely be retried and may run concurrently. Stated rather than assumed, because the opposite — a provider that spends the token and revokes the grant on a replay — looks identical until it happens.

### The estate

Microsoft Teams has a test estate on the same host, reached with credentials from a SEPARATE test account you register. Selecting sandbox mode uses those credentials.

> Microsoft's test estate is a Microsoft 365 Developer Program sandbox: a separate E5 tenant with its own users and its own OAuth consent, on the SAME host -- the same fact microsoft-outlook already verified for Graph generally. Eligibility is limited (Visual Studio Professional/Enterprise, ISV Success / MAICPP partners, or Premier/Unified Support) and the tenant expires after 90 days of no development activity. Without one, every call reaches a real tenant.

## What it can do

### Actions

#### `meeting_create` — Create meeting

Create a Teams meeting on behalf of a user and get its join link.

`POST /v1.0/users/{userId}/onlineMeetings` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `userId` | yes | The Microsoft Entra object id of the user the meeting is created on behalf of -- the one named in the application access policy a tenant admin granted this app. |
| `subject` | no | Subject |
| `startDateTime` | yes | ISO 8601 with an offset or Z, e.g. 2026-09-22T14:00:00Z. |
| `endDateTime` | yes | ISO 8601 with an offset or Z. |
| `passcodeRequired` | no | Passcodes are auto-generated by Teams; a custom one is not supported. Leave off for no passcode. |

#### `meeting_get` — Get meeting

Read a Teams meeting's current details.

`GET /v1.0/users/{userId}/onlineMeetings/{meetingId}` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `userId` | yes | The meeting organizer's Microsoft Entra object id. |
| `meetingId` | yes | From meeting_create's data.id. |

#### `transcript_list` — List transcripts

List a finished meeting's transcripts and their download URLs.

`GET /v1.0/users/{userId}/onlineMeetings/{meetingId}/transcripts` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `userId` | yes | The meeting organizer's Microsoft Entra object id. |
| `meetingId` | yes | From meeting_create's data.id. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Microsoft Teams has a sandbox. Set a
node's mode to `fake` and it returns the shape Microsoft Teams actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/microsoft-teams`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
