# Setting up Microsoft Teams

Generated from `provider/manifest.json`; do not edit. Each step cites the provider page it
came from. Words in **bold** are values from YOUR app, filled in where a host shows these steps.

## 1. Register an app and add the OAuth redirect URL

In the Microsoft Entra admin center, App registrations, register (or reuse) an app and add **your host's OAuth redirect URL** under Authentication as a Web redirect URI. Record the Application (client) ID and create a client secret.

**Copy:**

- Redirect URI (Web): **your host's OAuth redirect URL**

**Yields:** `clientId`, `clientSecret`

Source: [learn.microsoft.com](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

## 2. Grant the app an application access policy naming the target user

OAuth consent alone does not authorize meeting_create, meeting_get or transcript_list -- Microsoft Graph refuses every call with "No application access policy found for this app" until a tenant administrator runs New-CsApplicationAccessPolicy (with this app's client ID) and Grant-CsApplicationAccessPolicy naming the userId these operations will act on. Changes take up to 30 minutes to reach the Graph REST API.

**Done when:** meeting_get answers instead of Graph refusing with "No application access policy found for this app" (allow up to 30 minutes after granting the policy).

Source: [learn.microsoft.com](https://learn.microsoft.com/en-us/graph/cloud-communication-online-meeting-application-access-policy)
