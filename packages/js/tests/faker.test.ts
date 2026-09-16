/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { microsoftTeamsFaker } from "../src/faker.js";

test("meeting_create fakes the shape Microsoft Teams publishes", () => {
  const config = {};

  const faked = microsoftTeamsFaker("meeting_create", fakeRequest("microsoft_teams", "meeting_create", config));

  assert.deepEqual(faked, {
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
  });
});

test("meeting_get fakes the shape Microsoft Teams publishes", () => {
  const config = {};

  const faked = microsoftTeamsFaker("meeting_get", fakeRequest("microsoft_teams", "meeting_get", config));

  assert.deepEqual(faked, {
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
  });
});

test("transcript_list fakes the shape Microsoft Teams publishes", () => {
  const config = {};

  const faked = microsoftTeamsFaker("transcript_list", fakeRequest("microsoft_teams", "transcript_list", config));

  assert.deepEqual(faked, {
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
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => microsoftTeamsFaker("no_such_operation", fakeRequest("microsoft_teams", "no_such_operation", {})), /no fake response/);
});
