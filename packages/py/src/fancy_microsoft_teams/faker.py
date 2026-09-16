# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- microsoft_teams

"""The Microsoft Teams faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _as_number(value: Any) -> float | None:
    """The coercion an `"as": "integer" | "number"` config binding uses: a value
    that IS a number, never int(float(...))'s uncaught ValueError on one that
    merely looks like text (a text field's auto-generated example, before an
    author has typed a real one).
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _meeting_create(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "id": fake.id("MSo"),
        "creationDateTime": "2026-09-16T09:00:00.0000000Z",
        "subject": (
            str(_v)
            if (_v := config.get("subject")) is not None and _v != ""
            else "Weekly sync"
        ),
        "startDateTime": (
            str(_v)
            if (_v := config.get("startDateTime")) is not None and _v != ""
            else "2026-09-22T14:00:00Z"
        ),
        "endDateTime": (
            str(_v)
            if (_v := config.get("endDateTime")) is not None and _v != ""
            else "2026-09-22T14:30:00Z"
        ),
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
            "joinMeetingId": "".join(str(fake.int(0, 9)) for _ in range(9)),
            "isPasscodeRequired": (
                bool(_v)
                if (_v := config.get("passcodeRequired")) is not None and _v != ""
                else False
            ),
            "passcode": "".join(str(fake.int(0, 9)) for _ in range(6)),
        },
    }


def _meeting_get(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "id": (
            str(_v)
            if (_v := config.get("meetingId")) is not None and _v != ""
            else fake.id("MSo")
        ),
        "subject": "Weekly sync",
        "startDateTime": "2026-09-22T14:00:00Z",
        "endDateTime": "2026-09-22T14:30:00Z",
        "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0",
        "participants": {
            "organizer": {
                "identity": {
                    "user": {
                        "id": (
                            str(_v)
                            if (_v := config.get("userId")) is not None and _v != ""
                            else fake.id("u")
                        ),
                        "displayName": "Ada Lovelace",
                    },
                },
            },
        },
    }


def _transcript_list(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "value": [
            {
                "id": fake.id("transcript"),
                "meetingId": (
                    str(_v)
                    if (_v := config.get("meetingId")) is not None and _v != ""
                    else fake.id("MSo")
                ),
                "callId": "-".join(
                    [fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]
                ),
                "createdDateTime": "2026-09-16T09:30:05.0000000Z",
                "endDateTime": "2026-09-16T09:30:10.0000000Z",
                "contentCorrelationId": "-".join(
                    [fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]
                ),
                "transcriptContentUrl": (
                                            "https://graph.microsoft.com/v1.0/users/u/online"
                                            "Meetings/m/transcripts/t/content"
                                        ),
                "meetingOrganizer": {
                    "user": {
                        "id": fake.id("u"),
                        "displayName": "Ada Lovelace",
                    },
                },
            },
        ],
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "meeting_create":
        return _meeting_create(config, fake)

    if operation == "meeting_get":
        return _meeting_get(config, fake)

    if operation == "transcript_list":
        return _transcript_list(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'microsoft_teams: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
