"""
Microsoft Teams — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_microsoft_teams._fake import FakeValues, seed_for_call
from fancy_microsoft_teams.faker import respond

GOLDENS = [
    {
        "operation": "meeting_create",
        "config": {},
        "expected": {
            "id": "MSo_fake_6308b263ddd9",
            "creationDateTime": "2026-09-16T09:00:00.0000000Z",
            "subject": "Weekly sync",
            "startDateTime": "2026-09-22T14:00:00Z",
            "endDateTime": "2026-09-22T14:30:00Z",
            "joinWebUrl": (
                              "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123"
                              "%40thread.v2/0"
                          ),
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
        },
    },
    {
        "operation": "meeting_get",
        "config": {},
        "expected": {
            "id": "MSo_fake_f0a34ec0b61b",
            "subject": "Weekly sync",
            "startDateTime": "2026-09-22T14:00:00Z",
            "endDateTime": "2026-09-22T14:30:00Z",
            "joinWebUrl": (
                              "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123"
                              "%40thread.v2/0"
                          ),
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
        },
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
                    "transcriptContentUrl": (
                                                "https://graph.microsoft.com/v1.0/users/u/on"
                                                "lineMeetings/m/transcripts/t/content"
                                            ),
                    "meetingOrganizer": {
                        "user": {
                            "id": "u_fake_4ff234142766",
                            "displayName": "Ada Lovelace",
                        },
                    },
                },
            ],
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-microsoft-teams")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("microsoft_teams", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
