<?php

declare(strict_types=1);

namespace ParticleAcademy\MicrosoftTeams\Actions;

use ParticleAcademy\MicrosoftTeams\MicrosoftTeams;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/transcript-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/transcript-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */
/**
 * List a finished meeting's transcripts and their download URLs.
 *
 * GET /v1.0/users/{userId}/onlineMeetings/{meetingId}/transcripts —
 * https://learn.microsoft.com/en-us/graph/api/onlinemeeting-list-transcripts
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Microsoft Teams or calls the faker.
 */
final class TranscriptList
{
    public const OPERATION = 'transcript_list';
    public const METHOD = 'GET';
    public const PATH = '/v1.0/users/{userId}/onlineMeetings/{meetingId}/transcripts';
    public const SIDE_EFFECTS = 'none';

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
            throw new ConnectorConfigException('transcript_list: "userId" is required (User ID).');
        }

        if (($config['meetingId'] ?? null) === null || ($config['meetingId'] ?? null) === '') {
            throw new ConnectorConfigException('transcript_list: "meetingId" is required (Meeting ID).');
        }

        $body = [];

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
        return '/v1.0/users/'.rawurlencode((string) ($config['userId'] ?? '')).'/onlineMeetings/'.rawurlencode((string) ($config['meetingId'] ?? '')).'/transcripts';
    }
}
