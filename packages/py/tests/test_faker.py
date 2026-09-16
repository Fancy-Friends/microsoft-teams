# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- microsoft_teams

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_microsoft_teams._fake import FakeValues, seed_for_call
from fancy_microsoft_teams.faker import respond


def test_meeting_create_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("microsoft_teams", "meeting_create", config))

    faked = respond("meeting_create", {"config": config, "fake": fake})

    assert faked == {
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
                        "displayName": "Ada Lovelace",
                    },
                },
            },
        },
        "joinMeetingIdSettings": {
            "joinMeetingId": "223834363",
            "isPasscodeRequired": False,
            "passcode": "780731",
        },
    }


def test_meeting_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("microsoft_teams", "meeting_get", config))

    faked = respond("meeting_get", {"config": config, "fake": fake})

    assert faked == {
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
                        "displayName": "Ada Lovelace",
                    },
                },
            },
        },
    }


def test_transcript_list_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("microsoft_teams", "transcript_list", config))

    faked = respond("transcript_list", {"config": config, "fake": fake})

    assert faked == {
        "value": [
            {
                "id": "transcript_fake_a534ca11b2a8",
                "meetingId": "MSo_fake_2c288a2890df",
                "callId": "76ab17c4-9e20-df10-a83a-819cf75ef190",
                "createdDateTime": "2026-09-16T09:30:05.0000000Z",
                "endDateTime": "2026-09-16T09:30:10.0000000Z",
                "contentCorrelationId": "560727e9-edb1-5a5f-7b71-12ca35dbda5e",
                "transcriptContentUrl": (
                                            "https://graph.microsoft.com/v1.0/users/u/online"
                                            "Meetings/m/transcripts/t/content"
                                        ),
                "meetingOrganizer": {
                    "user": {
                        "id": "u_fake_4ff234142766",
                        "displayName": "Ada Lovelace",
                    },
                },
            },
        ],
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("microsoft_teams", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
