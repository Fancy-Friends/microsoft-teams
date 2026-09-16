# Changelog — Microsoft Teams

All four packages — `@particle-academy/microsoft-teams-ui`, `@particle-academy/microsoft-teams-js`,
`particle-academy/microsoft-teams-php` and `fancy-microsoft-teams` — are released together
under one version. They are generated from one `provider/` definition, so a
change to it changes all four, and separate version lines would only record
which of the four somebody remembered to bump.

**Write entries HERE**, in the weaver envelope at `providers/microsoft-teams/CHANGELOG.md`,
then regenerate. This file is the one thing in a release that cannot be
derived — somebody has to write what changed — but writing it in the
provider repo would be a hand-edit that `.weaver.json` flags and the next
sync destroys.

## [0.1.0] — 2026-09-16

### Added

- **`meeting_create`** — create a Teams meeting on behalf of a user and get its join link (`POST /users/{userId}/onlineMeetings`, application permission `OnlineMeetings.ReadWrite.All`).
- **`meeting_get`** — read a meeting's current details (`GET /users/{userId}/onlineMeetings/{meetingId}`).
- **`transcript_list`** — a finished meeting's transcripts (`GET /users/{userId}/onlineMeetings/{meetingId}/transcripts`, application permission `OnlineMeetingTranscript.Read.All`). Only `transcriptContentUrl` is published, a raw-VTT download reached directly — unlike Google Meet, Graph exposes no structured per-utterance JSON here, so no text-extraction action was built, the same "bytes never pass through the connector" call Resend already made.
- OAuth2 at `login.microsoftonline.com`, reusing microsoft-outlook's already-verified `refreshTokenRotates: false` reasoning and M365 Developer Program sandbox note. Every operation additionally requires a tenant administrator to grant this app an application access policy naming the target user — consent alone is not enough.

**This is the THIRD and LAST connector prerequisite for Tynn #9 (MOIC's
meeting bot), after Zoom and Google Meet.** The BOT RUNTIME — a service that
actually joins a call and streams live media — is the owner's architecture
decision, not this connector's; Graph's own path there is an
application-hosted media bot (a .NET/Azure service), not a REST connector.
What ships here: create a meeting, read it back, and find a finished
meeting's transcript.

Verified against Microsoft Learn's own reference pages
(`application-post-onlinemeetings`, `onlinemeeting-get`,
`onlinemeeting-list-transcripts`) on 2026-09-16.
