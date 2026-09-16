<?php

declare(strict_types=1);

namespace ParticleAcademy\MicrosoftTeams\Actions;

use ParticleAcademy\MicrosoftTeams\MicrosoftTeams;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/meeting-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/meeting-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */
/**
 * Create a Teams meeting on behalf of a user and get its join link.
 *
 * POST /v1.0/users/{userId}/onlineMeetings —
 * https://learn.microsoft.com/en-us/graph/api/application-post-onlinemeetings
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Microsoft Teams or calls the faker.
 */
final class MeetingCreate
{
    public const OPERATION = 'meeting_create';
    public const METHOD = 'POST';
    public const PATH = '/v1.0/users/{userId}/onlineMeetings';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Microsoft Teams.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['userId'] ?? null) === null || ($config['userId'] ?? null) === '') {
            throw new ConnectorConfigException('meeting_create: "userId" is required (User ID).');
        }

        if (($config['startDateTime'] ?? null) === null || ($config['startDateTime'] ?? null) === '') {
            throw new ConnectorConfigException('meeting_create: "startDateTime" is required (Start).');
        }

        if (($config['endDateTime'] ?? null) === null || ($config['endDateTime'] ?? null) === '') {
            throw new ConnectorConfigException('meeting_create: "endDateTime" is required (End).');
        }

        $body = [];

        $value = $config['subject'] ?? null;
        if ($value !== null && $value !== '') {
            $body['subject'] = (string) $value;
        }

        $value = $config['startDateTime'] ?? null;
        $body['startDateTime'] = (string) $value;

        $value = $config['endDateTime'] ?? null;
        $body['endDateTime'] = (string) $value;

        $value = $config['passcodeRequired'] ?? null;
        if ($value !== null && $value !== '') {
            $body['joinMeetingIdSettings.isPasscodeRequired'] = (bool) $value;
        }

        $body = self::nestFields($body);
        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/v1.0/users/'.rawurlencode((string) ($config['userId'] ?? '')).'/onlineMeetings';
    }

    /**
     * `['properties.email' => x]` -> `['properties' => ['email' => x]]`.
     *
     * A dotted `as` means NESTING, and only a JSON body can nest — in a form
     * body that spelling already means a literal dotted key.
     *
     * @param  array<string,mixed>  $flat
     * @return array<string,mixed>
     */
    private static function nestFields(array $flat): array
    {
        $out = [];

        foreach ($flat as $path => $value) {
            $parts = explode('.', (string) $path);
            $node = &$out;

            while (count($parts) > 1) {
                $key = array_shift($parts);

                if (! isset($node[$key]) || ! is_array($node[$key])) {
                    $node[$key] = [];
                }

                $node = &$node[$key];
            }

            $node[$parts[0]] = $value;
            unset($node);
        }

        return $out;
    }
}
