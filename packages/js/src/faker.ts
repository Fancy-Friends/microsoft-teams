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
 * The Microsoft Teams faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Microsoft Teams actually publishes, so an author can wire {{
 * $json.data.id }} against a fake and have it keep working against the real
 * thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeMeetingCreate({ config, fake }: FakeRequest): unknown {
  return {
    "id": fake.id("MSo"),
    "creationDateTime": "2026-09-16T09:00:00.0000000Z",
    "subject": (config.subject !== undefined && config.subject !== null && config.subject !== "" ? String(config.subject) : "Weekly sync"),
    "startDateTime": (config.startDateTime !== undefined && config.startDateTime !== null && config.startDateTime !== "" ? String(config.startDateTime) : "2026-09-22T14:00:00Z"),
    "endDateTime": (config.endDateTime !== undefined && config.endDateTime !== null && config.endDateTime !== "" ? String(config.endDateTime) : "2026-09-22T14:30:00Z"),
    "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0",
    "participants": {
      "organizer": {
        "identity": {
          "user": {
            "id": fake.id("u"),
            "displayName": "Ada Lovelace",
          },
        },
      },
    },
    "joinMeetingIdSettings": {
      "joinMeetingId": Array.from({ length: 9 }, () => fake.int(0, 9)).join(""),
      "isPasscodeRequired": (config.passcodeRequired !== undefined && config.passcodeRequired !== null && config.passcodeRequired !== "" ? Boolean(config.passcodeRequired) : false),
      "passcode": Array.from({ length: 6 }, () => fake.int(0, 9)).join(""),
    },
  };
}

function fakeMeetingGet({ config, fake }: FakeRequest): unknown {
  return {
    "id": (config.meetingId !== undefined && config.meetingId !== null && config.meetingId !== "" ? String(config.meetingId) : fake.id("MSo")),
    "subject": "Weekly sync",
    "startDateTime": "2026-09-22T14:00:00Z",
    "endDateTime": "2026-09-22T14:30:00Z",
    "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0",
    "participants": {
      "organizer": {
        "identity": {
          "user": {
            "id": (config.userId !== undefined && config.userId !== null && config.userId !== "" ? String(config.userId) : fake.id("u")),
            "displayName": "Ada Lovelace",
          },
        },
      },
    },
  };
}

function fakeTranscriptList({ config, fake }: FakeRequest): unknown {
  return {
    "value": [
      {
        "id": fake.id("transcript"),
        "meetingId": (config.meetingId !== undefined && config.meetingId !== null && config.meetingId !== "" ? String(config.meetingId) : fake.id("MSo")),
        "callId": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
        "createdDateTime": "2026-09-16T09:30:05.0000000Z",
        "endDateTime": "2026-09-16T09:30:10.0000000Z",
        "contentCorrelationId": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
        "transcriptContentUrl": "https://graph.microsoft.com/v1.0/users/u/onlineMeetings/m/transcripts/t/content",
        "meetingOrganizer": {
          "user": {
            "id": fake.id("u"),
            "displayName": "Ada Lovelace",
          },
        },
      },
    ],
  };
}

export const microsoftTeamsFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "meeting_create":
      return fakeMeetingCreate(request);

    case "meeting_get":
      return fakeMeetingGet(request);

    case "transcript_list":
      return fakeTranscriptList(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `microsoft_teams: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
