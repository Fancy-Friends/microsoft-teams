/*
 * Microsoft Teams — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { microsoftTeamsFaker } from "@particle-academy/microsoft-teams-js";
import { MICROSOFT_TEAMS_KINDS } from "@particle-academy/microsoft-teams-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/microsoft-teams-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "meeting_create",
    "config": {},
    "expected": {
      "id": "MSo_fake_6308b263ddd9",
      "creationDateTime": "2026-09-16T09:00:00.0000000Z",
      "subject": "Weekly sync",
      "startDateTime": "2026-09-22T14:00:00Z",
      "endDateTime": "2026-09-22T14:30:00Z",
      "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0",
      "participants": {
        "organizer": {
          "identity": {
            "user": {
              "id": "u_fake_9b718163c0eb",
              "displayName": "Ada Lovelace"
            }
          }
        }
      },
      "joinMeetingIdSettings": {
        "joinMeetingId": "223834363",
        "isPasscodeRequired": false,
        "passcode": "780731"
      }
    }
  },
  {
    "operation": "meeting_get",
    "config": {},
    "expected": {
      "id": "MSo_fake_f0a34ec0b61b",
      "subject": "Weekly sync",
      "startDateTime": "2026-09-22T14:00:00Z",
      "endDateTime": "2026-09-22T14:30:00Z",
      "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0",
      "participants": {
        "organizer": {
          "identity": {
            "user": {
              "id": "u_fake_2bb0c3ad4b6a",
              "displayName": "Ada Lovelace"
            }
          }
        }
      }
    }
  },
  {
    "operation": "transcript_list",
    "config": {},
    "expected": {
      "value": [
        {
          "id": "transcript_fake_a534ca11b2a8",
          "meetingId": "MSo_fake_2c288a2890df",
          "callId": "76ab17c4-9e20-df10-a83a-819cf75ef190",
          "createdDateTime": "2026-09-16T09:30:05.0000000Z",
          "endDateTime": "2026-09-16T09:30:10.0000000Z",
          "contentCorrelationId": "560727e9-edb1-5a5f-7b71-12ca35dbda5e",
          "transcriptContentUrl": "https://graph.microsoft.com/v1.0/users/u/onlineMeetings/m/transcripts/t/content",
          "meetingOrganizer": {
            "user": {
              "id": "u_fake_4ff234142766",
              "displayName": "Ada Lovelace"
            }
          }
        }
      ]
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = microsoftTeamsFaker(operation, fakeRequest("microsoft_teams", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(MICROSOFT_TEAMS_KINDS.length, 3);
for (const kind of MICROSOFT_TEAMS_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/microsoft-teams-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
