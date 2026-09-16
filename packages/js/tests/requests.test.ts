/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */

/**
 * What Microsoft Teams actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { microsoftTeamsMeetingCreate } from "../src/actions/meeting-create.js";
import { microsoftTeamsMeetingGet } from "../src/actions/meeting-get.js";
import { microsoftTeamsTranscriptList } from "../src/actions/transcript-list.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "clientId": "test_clientId",
  "clientSecret": "test_clientSecret",
  "accessToken": "test_accessToken",
  "refreshToken": "test_refreshToken"
};

test("meeting_create sends POST /v1.0/users/{userId}/onlineMeetings", async () => {
  const { seen, transport } = capture();

  await microsoftTeamsMeetingCreate({
    config: {
      "userId": "example-userId",
      "subject": "example-subject",
      "startDateTime": "example-startDateTime",
      "endDateTime": "example-endDateTime",
      "passcodeRequired": true
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/v1.0/users/example-userId/onlineMeetings"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "subject": "example-subject",
    "startDateTime": "example-startDateTime",
    "endDateTime": "example-endDateTime",
    "joinMeetingIdSettings": {
      "isPasscodeRequired": true
    }
  });
});

test("meeting_get sends GET /v1.0/users/{userId}/onlineMeetings/{meetingId}", async () => {
  const { seen, transport } = capture();

  await microsoftTeamsMeetingGet({
    config: {
      "userId": "example-userId",
      "meetingId": "example-meetingId"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "GET");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/v1.0/users/example-userId/onlineMeetings/example-meetingId"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URL(seen[0]!.url).searchParams),
    {},
  );
});

test("transcript_list sends GET /v1.0/users/{userId}/onlineMeetings/{meetingId}/transcripts", async () => {
  const { seen, transport } = capture();

  await microsoftTeamsTranscriptList({
    config: {
      "userId": "example-userId",
      "meetingId": "example-meetingId"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "GET");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/v1.0/users/example-userId/onlineMeetings/example-meetingId/transcripts"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URL(seen[0]!.url).searchParams),
    {},
  );
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await microsoftTeamsMeetingCreate({
    config: {
      "userId": "example-userId",
      "subject": "example-subject",
      "startDateTime": "example-startDateTime",
      "endDateTime": "example-endDateTime",
      "passcodeRequired": true
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen[0]!.headers.Authorization, "Bearer test_accessToken");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    microsoftTeamsMeetingCreate({
      config: {
        "subject": "example-subject",
        "startDateTime": "example-startDateTime",
        "endDateTime": "example-endDateTime",
        "passcodeRequired": true
      },
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("userId"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
