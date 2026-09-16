# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/meeting-get.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/meeting-get.json (or weaver's template/) and regenerate:
#
# npm run provider -- microsoft_teams

"""Read a Teams meeting's current details.

GET /v1.0/users/{userId}/onlineMeetings/{meetingId} —
https://learn.microsoft.com/en-us/graph/api/onlinemeeting-get

This describes the request. `call` resolves the connection, picks the
estate, and either calls Microsoft Teams or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "meeting_get"
METHOD = "GET"
PATH = "/v1.0/users/{userId}/onlineMeetings/{meetingId}"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("userId") is None or config.get("userId") == "":
        raise ConnectorConfigError(
            "meeting_get: \"userId\" is required (User ID)."
        )

    if config.get("meetingId") is None or config.get("meetingId") == "":
        raise ConnectorConfigError(
            "meeting_get: \"meetingId\" is required (Meeting ID)."
        )

    out: dict[str, Any] = {}

    return out



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/v1.0/users/"
        + quote(str(config.get("userId") or ""), safe="")
        + "/onlineMeetings/"
        + quote(str(config.get("meetingId") or ""), safe="")
    )

def meeting_get(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Read a Teams meeting's current details."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
