<?php

declare(strict_types=1);

namespace ParticleAcademy\MicrosoftTeams\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\MicrosoftTeams\Actions\MeetingCreate;
use ParticleAcademy\MicrosoftTeams\MicrosoftTeams;

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
 * Create meeting, run on a fancy-flow-php host.
 *
 * The PHP twin of `microsoftTeamsMeetingCreateExecutor` in
 * @particle-academy/microsoft-teams-js: the same request, built from the
 * node's config by the same `Actions\MeetingCreate` a host would call
 * directly, and the same value on `out` — the client's `{data, mode,
 * connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Microsoft Teams. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/microsoft_teams_meeting_create',
    aliases: [
        'microsoft_teams_meeting_create',
    ],
    category: 'io',
    label: 'Create meeting',
    description: 'Create a Teams meeting on behalf of a user and get its join link.',
    icon: '🎥',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The meeting\'s id -- what meeting_get and transcript_list need.',
        ],
        [
            'path' => 'data.joinWebUrl',
            'type' => 'string',
            'description' => 'The join link. Its format may change -- Microsoft\'s own docs say not to parse it.',
        ],
        [
            'path' => 'data.subject',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.startDateTime',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.endDateTime',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.creationDateTime',
            'type' => 'string',
            'description' => 'When Graph created the meeting resource.',
        ],
        [
            'path' => 'data.participants.organizer.identity.user.id',
            'type' => 'string',
            'description' => 'The organizer\'s user id -- should equal the userId that was asked for.',
        ],
        [
            'path' => 'data.participants.organizer.identity.user.displayName',
            'type' => 'string',
            'description' => 'The organizer\'s display name.',
        ],
        [
            'path' => 'data.joinMeetingIdSettings.joinMeetingId',
            'type' => 'string',
            'description' => 'The numeric id shown in the Teams client to join by phone or the join screen.',
        ],
        [
            'path' => 'data.joinMeetingIdSettings.isPasscodeRequired',
            'type' => 'boolean',
            'description' => 'Echoes what was asked, or Teams\' default.',
        ],
        [
            'path' => 'data.joinMeetingIdSettings.passcode',
            'type' => 'unknown',
            'description' => 'The auto-generated passcode when one was required; null otherwise.',
        ],
    ],
)]
final class MeetingCreateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            MicrosoftTeams::descriptor(),
            MeetingCreate::OPERATION,
            $config,
            [
                'method' => MeetingCreate::METHOD,
                'path' => MeetingCreate::path($config),
                'json' => MeetingCreate::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'microsoft_teams meeting_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
