# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/meeting-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/meeting-create.json (or weaver's template/) and regenerate:
#
# npm run provider -- microsoft_teams

"""Create a Teams meeting on behalf of a user and get its join link.

POST /v1.0/users/{userId}/onlineMeetings —
https://learn.microsoft.com/en-us/graph/api/application-post-onlinemeetings

This describes the request. `call` resolves the connection, picks the
estate, and either calls Microsoft Teams or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "meeting_create"
METHOD = "POST"
PATH = "/v1.0/users/{userId}/onlineMeetings"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("userId") is None or config.get("userId") == "":
        raise ConnectorConfigError(
            "meeting_create: \"userId\" is required (User ID)."
        )

    if config.get("startDateTime") is None or config.get("startDateTime") == "":
        raise ConnectorConfigError(
            "meeting_create: \"startDateTime\" is required (Start)."
        )

    if config.get("endDateTime") is None or config.get("endDateTime") == "":
        raise ConnectorConfigError(
            "meeting_create: \"endDateTime\" is required (End)."
        )

    out: dict[str, Any] = {}
    _value = config.get("subject")
    if _value is not None and _value != "":
        out["subject"] = str(_value)
    _value = config.get("startDateTime")
    if _value is None or _value == "":
        raise ConnectorConfigError("meeting_create: \"startDateTime\" is required.")

    out["startDateTime"] = str(_value)
    _value = config.get("endDateTime")
    if _value is None or _value == "":
        raise ConnectorConfigError("meeting_create: \"endDateTime\" is required.")

    out["endDateTime"] = str(_value)
    _value = config.get("passcodeRequired")
    if _value is not None and _value != "":
        out["joinMeetingIdSettings.isPasscodeRequired"] = bool(_value)

    return _nest_fields(out)



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
        + "/onlineMeetings"
    )

def meeting_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Create a Teams meeting on behalf of a user and get its join link."""
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



def _nest_fields(flat: dict[str, Any]) -> dict[str, Any]:
    """`{"properties.email": x}` -> `{"properties": {"email": x}}`.

    A dotted `as` means NESTING, and only a JSON body can nest -- in a form body
    that spelling already means a literal dotted key.
    """
    out: dict[str, Any] = {}

    for path, value in flat.items():
        parts = path.split(".")
        node = out

        for key in parts[:-1]:
            found = node.get(key)
            if not isinstance(found, dict):
                found = {}
                node[key] = found
            node = found

        node[parts[-1]] = value

    # The ROOT is always an object -- a JSON body's top level is never a list
    # -- so only its VALUES are converted. That also keeps the return type
    # honest: `_listify` returns Any, and returning it directly is a
    # no-any-return error under mypy --strict.
    return {key: _listify(value) for key, value in out.items()}


def _listify(node: Any) -> Any:
    """A mapping whose keys are 0, 1, 2 ... is an ARRAY, not an object.

    `dateRanges.0.startDate` has to become `[{...}]`. PHP produced the list by
    accident -- its integer-keyed arrays serialise as JSON arrays -- while
    TypeScript and Python produced `{"0": {...}}`, which the provider refuses
    as the wrong type. The parity suite is what caught the disagreement, and
    converting at the END keeps the walk above simple.
    """
    if not isinstance(node, dict):
        return node

    walked = {key: _listify(value) for key, value in node.items()}
    wanted = [str(index) for index in range(len(walked))]

    if walked and list(walked.keys()) == wanted:
        return [walked[key] for key in wanted]

    return walked