<?php

declare(strict_types=1);

use ParticleAcademy\MicrosoftTeams\MicrosoftTeamsFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('meeting_create fakes the shape Microsoft Teams publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('microsoft_teams', 'meeting_create', $config));

    $faked = MicrosoftTeamsFaker::respond('meeting_create', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'id' => 'MSo_fake_6308b263ddd9',
        'creationDateTime' => '2026-09-16T09:00:00.0000000Z',
        'subject' => 'Weekly sync',
        'startDateTime' => '2026-09-22T14:00:00Z',
        'endDateTime' => '2026-09-22T14:30:00Z',
        'joinWebUrl' => 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0',
        'participants' => [
            'organizer' => [
                'identity' => [
                    'user' => [
                        'id' => 'u_fake_9b718163c0eb',
                        'displayName' => 'Ada Lovelace',
                    ],
                ],
            ],
        ],
        'joinMeetingIdSettings' => [
            'joinMeetingId' => '223834363',
            'isPasscodeRequired' => false,
            'passcode' => '780731',
        ],
    ]);
});

it('meeting_get fakes the shape Microsoft Teams publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('microsoft_teams', 'meeting_get', $config));

    $faked = MicrosoftTeamsFaker::respond('meeting_get', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'id' => 'MSo_fake_f0a34ec0b61b',
        'subject' => 'Weekly sync',
        'startDateTime' => '2026-09-22T14:00:00Z',
        'endDateTime' => '2026-09-22T14:30:00Z',
        'joinWebUrl' => 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0',
        'participants' => [
            'organizer' => [
                'identity' => [
                    'user' => [
                        'id' => 'u_fake_2bb0c3ad4b6a',
                        'displayName' => 'Ada Lovelace',
                    ],
                ],
            ],
        ],
    ]);
});

it('transcript_list fakes the shape Microsoft Teams publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('microsoft_teams', 'transcript_list', $config));

    $faked = MicrosoftTeamsFaker::respond('transcript_list', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'value' => [
            [
                'id' => 'transcript_fake_a534ca11b2a8',
                'meetingId' => 'MSo_fake_2c288a2890df',
                'callId' => '76ab17c4-9e20-df10-a83a-819cf75ef190',
                'createdDateTime' => '2026-09-16T09:30:05.0000000Z',
                'endDateTime' => '2026-09-16T09:30:10.0000000Z',
                'contentCorrelationId' => '560727e9-edb1-5a5f-7b71-12ca35dbda5e',
                'transcriptContentUrl' => 'https://graph.microsoft.com/v1.0/users/u/onlineMeetings/m/transcripts/t/content',
                'meetingOrganizer' => [
                    'user' => [
                        'id' => 'u_fake_4ff234142766',
                        'displayName' => 'Ada Lovelace',
                    ],
                ],
            ],
        ],
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('microsoft_teams', 'no_such_operation', []));

    expect(fn () => MicrosoftTeamsFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
