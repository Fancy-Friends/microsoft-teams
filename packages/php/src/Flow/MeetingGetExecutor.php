<?php

declare(strict_types=1);

namespace ParticleAcademy\MicrosoftTeams\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\MicrosoftTeams\Actions\MeetingGet;
use ParticleAcademy\MicrosoftTeams\MicrosoftTeams;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/meeting-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/meeting-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- microsoft_teams
 */
/**
 * Get meeting, run on a fancy-flow-php host.
 *
 * The PHP twin of `microsoftTeamsMeetingGetExecutor` in
 * @particle-academy/microsoft-teams-js: the same request, built from the
 * node's config by the same `Actions\MeetingGet` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Microsoft Teams. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/microsoft_teams_meeting_get',
    aliases: [
        'microsoft_teams_meeting_get',
    ],
    category: 'io',
    label: 'Get meeting',
    description: 'Read a Teams meeting\'s current details.',
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
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The meeting\'s id.',
        ],
        [
            'path' => 'data.joinWebUrl',
            'type' => 'string',
            'description' => 'The join link.',
        ],
        [
            'path' => 'data.subject',
            'type' => 'string',
            'description' => 'The meeting\'s subject.',
        ],
        [
            'path' => 'data.startDateTime',
            'type' => 'string',
            'description' => 'ISO 8601.',
        ],
        [
            'path' => 'data.endDateTime',
            'type' => 'string',
            'description' => 'ISO 8601.',
        ],
        [
            'path' => 'data.participants.organizer.identity.user.id',
            'type' => 'string',
            'description' => 'The organizer\'s user id.',
        ],
        [
            'path' => 'data.participants.organizer.identity.user.displayName',
            'type' => 'string',
            'description' => 'The organizer\'s display name.',
        ],
    ],
)]
final class MeetingGetExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            MicrosoftTeams::descriptor(),
            MeetingGet::OPERATION,
            $config,
            [
                'method' => MeetingGet::METHOD,
                'path' => MeetingGet::path($config),
                'query' => MeetingGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'microsoft_teams meeting_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
