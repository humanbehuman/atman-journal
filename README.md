# Atman Journal

A private, local voice journaling app.

Record your spoken thoughts, have them transcribed entirely on your machine with Whisper (or Parakeet), and turn them into journal entries summarized by a local LLM (Ollama) or a cloud provider of your choice. Nothing leaves your computer unless you explicitly configure a cloud model.

- **Local first:** audio capture, transcription, and storage all happen on-device.
- **Speak, don't type:** capture how you feel out loud; get a clean written entry back.
- **Your choice of model:** local models via Ollama, or bring your own API key for Claude, Groq, OpenRouter, or any OpenAI-compatible endpoint.

## Fork of Meetily

Atman Journal is a fork of [Meetily](https://github.com/Zackriya-Solutions/meetily) (also published as [meeting-minutes](https://github.com/Zackriya-Solutions/meeting-minutes)), an open-source, privacy-first meeting assistant released under the MIT license. Many thanks to Zackriya Solutions and the Meetily contributors for building and open-sourcing the foundation this app is built on. See [LICENSE.md](LICENSE.md) for license details.

This fork does not auto-update from upstream Meetily releases; the upstream updater configuration has been removed.

## Building from source (macOS)

Prerequisites: Rust, Node.js, pnpm, and CMake.

```bash
# Install required tools (Homebrew)
brew install cmake node pnpm

# Install frontend dependencies
cd frontend
pnpm install

# Development mode (with hot reload)
pnpm tauri:dev

# Production build
pnpm tauri:build
```

On macOS the build enables Metal GPU acceleration automatically. For Windows, Linux, and GPU details, see [docs/BUILDING.md](docs/BUILDING.md).

## License

MIT License — see [LICENSE.md](LICENSE.md).

## Acknowledgments

- Built on [Meetily](https://github.com/Zackriya-Solutions/meetily) by Zackriya Solutions (MIT).
- Code borrowed from [Whisper.cpp](https://github.com/ggerganov/whisper.cpp), [Screenpipe](https://github.com/mediar-ai/screenpipe), and [transcribe-rs](https://crates.io/crates/transcribe-rs).
- Thanks to NVIDIA for the Parakeet model and [istupakov](https://huggingface.co/istupakov/parakeet-tdt-0.6b-v3-onnx) for the ONNX conversion.
