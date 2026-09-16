# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- microsoft_teams

"""Microsoft Teams, as one service descriptor shared by every Microsoft Teams
operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Microsoft's test estate is a Microsoft 365 Developer Program sandbox: a
separate E5 tenant with its own users and its own OAuth consent, on the SAME
host -- the same fact microsoft-outlook already verified for Graph
generally. Eligibility is limited (Visual Studio Professional/Enterprise,
ISV Success / MAICPP partners, or Premier/Unified Support) and the tenant
expires after 90 days of no development activity. Without one, every call
reaches a real tenant.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "microsoft_teams"
TITLE = "Microsoft Teams"
SANDBOX = "separate-account"
BASE_URLS = {
    "live": "https://graph.microsoft.com",
    "sandbox": "https://graph.microsoft.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "accessToken",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Microsoft Teams's auth scheme to an outgoing request.
    
    
    """
    request.headers["Authorization"] = f"Bearer {credentials.get('accessToken') or ''}"


def descriptor() -> ServiceDescriptor:
    """The Microsoft Teams service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
