<?php

declare(strict_types=1);

namespace ParticleAcademy\MicrosoftTeams;

use ParticleAcademy\Connectors\FakeRequest;

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
 * The Microsoft Teams faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class MicrosoftTeamsFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'meeting_create' => self::MeetingCreate($config, $fake),
            'meeting_get' => self::MeetingGet($config, $fake),
            'transcript_list' => self::TranscriptList($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'microsoft_teams: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function MeetingCreate(array $config, mixed $fake): array|\stdClass
    {
        return [
        'id' => $fake->id('MSo'),
        'creationDateTime' => '2026-09-16T09:00:00.0000000Z',
        'subject' => ((($v = $config['subject'] ?? null) !== null && $v !== '') ? (string) $v : 'Weekly sync'),
        'startDateTime' => ((($v = $config['startDateTime'] ?? null) !== null && $v !== '') ? (string) $v : '2026-09-22T14:00:00Z'),
        'endDateTime' => ((($v = $config['endDateTime'] ?? null) !== null && $v !== '') ? (string) $v : '2026-09-22T14:30:00Z'),
        'joinWebUrl' => 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0',
        'participants' => [
            'organizer' => [
                'identity' => [
                    'user' => [
                        'id' => $fake->id('u'),
                        'displayName' => 'Ada Lovelace',
                    ],
                ],
            ],
        ],
        'joinMeetingIdSettings' => [
            'joinMeetingId' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 9))),
            'isPasscodeRequired' => ((($v = $config['passcodeRequired'] ?? null) !== null && $v !== '') ? (bool) $v : false),
            'passcode' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 6))),
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function MeetingGet(array $config, mixed $fake): array|\stdClass
    {
        return [
        'id' => ((($v = $config['meetingId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('MSo')),
        'subject' => 'Weekly sync',
        'startDateTime' => '2026-09-22T14:00:00Z',
        'endDateTime' => '2026-09-22T14:30:00Z',
        'joinWebUrl' => 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123%40thread.v2/0',
        'participants' => [
            'organizer' => [
                'identity' => [
                    'user' => [
                        'id' => ((($v = $config['userId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('u')),
                        'displayName' => 'Ada Lovelace',
                    ],
                ],
            ],
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function TranscriptList(array $config, mixed $fake): array|\stdClass
    {
        return [
        'value' => [
            [
                'id' => $fake->id('transcript'),
                'meetingId' => ((($v = $config['meetingId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('MSo')),
                'callId' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
                'createdDateTime' => '2026-09-16T09:30:05.0000000Z',
                'endDateTime' => '2026-09-16T09:30:10.0000000Z',
                'contentCorrelationId' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
                'transcriptContentUrl' => 'https://graph.microsoft.com/v1.0/users/u/onlineMeetings/m/transcripts/t/content',
                'meetingOrganizer' => [
                    'user' => [
                        'id' => $fake->id('u'),
                        'displayName' => 'Ada Lovelace',
                    ],
                ],
            ],
        ],
    ];
    }
}
