# Atman Journal — fork notes & roadmap

Atman Journal is a fork of [Meetily](https://github.com/Zackriya-Solutions/meetily) (MIT, by
Zackriya Solutions) repurposed from an AI meeting-notes app into a **private, local-first voice
journal**: speak your thoughts, they're transcribed on-device (Whisper/Parakeet), and a local or
cloud LLM turns them into a reflective journal digest — how you felt, what happened, who came up,
and gentle prompts to sit with. Intended to be incorporated into the Atman project.

Upstream remote is kept as `upstream` for pulling audio/transcription fixes:

```bash
git fetch upstream && git merge upstream/main
```

## What changed from meetily (v0.1 pivot)

**Journaling semantics** (the core of the pivot)
- New builtin summary templates: `frontend/src-tauri/templates/daily_journal.json` (default) and
  `reflection.json`; registered in `summary/templates/defaults.rs`, defaults switched in
  `summary/commands.rs` and `frontend/src/hooks/meeting-details/useTemplates.ts`.
- All summarization prompts rewritten in `frontend/src-tauri/src/summary/processor.rs`: "expert
  meeting summarizer" → "thoughtful journaling companion"; chunk/combine prompts now capture
  feelings, experiences, people, gratitude, worries, intentions; final report prompt is warm,
  non-judgmental, never diagnoses, and only invents content in the Reflection Prompts section.
- Recordings are titled `Journal <timestamp>` instead of `Meeting <timestamp>`.

**Privacy hardening**
- Mic-only recording by default (system-audio capture no longer defaults on; explicit device
  selection still works). Journals don't need other people's audio.
- PostHog analytics neutered — no telemetry leaves the machine.

**Identity**
- Rebranded to "Atman Journal" (`com.atman.journal`); upstream auto-updater disabled so the app
  can never update itself back into meetily.
- MIT license and attribution to Zackriya Solutions retained (see LICENSE.md and README).

**Kept as-is (deliberately)**
- DB schema still uses `meetings`/`transcripts` table names — they're shape-compatible with
  journal entries, and renaming would touch ~1100 references for zero user-visible gain.
- Internal Rust crate name is still `meetily` (build scripts reference it).
- Meeting templates (`standard_meeting`, `daily_standup`, …) still ship as non-default options.

## Roadmap

- [ ] UI wording sweep: "meeting" → "entry" across sidebar, dialogs, settings; also remaining
      "meetily" strings in `PermissionWarning.tsx`, `TranscriptView.tsx`,
      `VirtualizedTranscriptView.tsx`, `PreferenceSettings.tsx`, `Sidebar/index.tsx`,
      `BluetoothPlaybackWarning.tsx`.
- [ ] Rewrite `PRIVACY_POLICY.md` (still describes upstream meetily's PostHog policy; telemetry
      is now fully removed) and remove the now-decorative analytics consent switch.
- [ ] Mood over time: extract a simple mood/valence tag per entry, chart trends by week/month.
- [ ] Recurring-themes view across entries (the journaling feature a meeting tool would never have).
- [ ] Calendar/timeline browsing of entries instead of a flat list.
- [ ] Typed entries (journaling by keyboard, not just voice).
- [ ] Remove dead weight: `/backend` (archived Python server), `frontend/src/app/notes/` demo
      route, PRO licensing tables/UI, screen-recording permission step in onboarding.
- [ ] New app icon (still meetily's icons in `frontend/src-tauri/icons/`).
- [ ] Atman integration: define an export/API surface (likely JSON export of entries + digests,
      or direct SQLite read) so Atman can consume journal data.

## Build & run (macOS)

```bash
brew install cmake node pnpm   # + rustup, Xcode CLT
cd frontend
pnpm install
./dev-gpu.sh                   # first run: also builds the llama-helper sidecar
pnpm run tauri:dev             # subsequent runs
```

See `docs/BUILDING.md` and `CLAUDE.md` for details (both still describe upstream meetily layout,
which this fork largely shares).
