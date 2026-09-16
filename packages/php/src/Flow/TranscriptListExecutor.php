<?php

declare(strict_types=1);

namespace ParticleAcademy\MicrosoftTeams\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\MicrosoftTeams\Actions\TranscriptList;
use ParticleAcademy\MicrosoftTeams\MicrosoftTeams;

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
 * List transcripts, run on a fancy-flow-php host.
 *
 * The PHP twin of `microsoftTeamsTranscriptListExecutor` in
 * @particle-academy/microsoft-teams-js: the same request, built from the
 * node's config by the same `Actions\TranscriptList` a host would call
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
    name: '@particle-academy/microsoft_teams_transcript_list',
    aliases: [
        'microsoft_teams_transcript_list',
    ],
    category: 'io',
    label: 'List transcripts',
    description: 'List a finished meeting\'s transcripts and their download URLs.',
    icon: '📝',
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
            'path' => 'data.value',
            'type' => 'array',
            'description' => 'Usually one. Each has id, meetingId, createdDateTime, endDateTime, and transcriptContentUrl -- a Graph URL that answers with the VTT caption file (text/vtt), not JSON. Download it with the same access token; this connector does not fetch it for you.',
        ],
    ],
)]
final class TranscriptListExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            MicrosoftTeams::descriptor(),
            TranscriptList::OPERATION,
            $config,
            [
                'method' => TranscriptList::METHOD,
                'path' => TranscriptList::path($config),
                'query' => TranscriptList::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'microsoft_teams transcript_list'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
