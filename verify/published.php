<?php

declare(strict_types=1);

/*
 * Microsoft Teams — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/microsoft-teams-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\MicrosoftTeams\MicrosoftTeamsFaker;

$goldens = [
    [
        'operation' => 'meeting_create',
        'config' => [],
        'expected' => [
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
        ],
    ],
    [
        'operation' => 'meeting_get',
        'config' => [],
        'expected' => [
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
        ],
    ],
    [
        'operation' => 'transcript_list',
        'config' => [],
        'expected' => [
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
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('microsoft_teams', $operation, $config));
    $faked = MicrosoftTeamsFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
