# v3.8.0 | Linux Port

> [!IMPORTANT]
> This is a Linux build and as such will NOT work on Windows.

This release ports upstream **v3.8.0** to Linux, including all OS-agnostic improvements from the main project.

## New
- Ported upstream v3.8.0 UI/UX overhaul to Linux.
- New button-based hotkey capture input.
- Preset system for saving and applying clicker configurations.
- Cadence/duration input mode alongside rate mode.
- Background image support in the appearance settings.
- Settings are now descriptor-driven and synced with the Rust backend schema.
- System dependency warning banner on startup.

## Linux-specific
- X11 click/move backend via XTEST.
- Wayland click backend via `uinput` (requires user in the `input` group).
- Linux evdev-based global hotkey and scroll-wheel detection.
- Cached monitor geometry from Tauri for failsafes and overlay.
- Sequence point picking via the overlay window.

## Assets
- `BlurAutoClicker Linux_3.8.0_amd64.deb`
- `BlurAutoClicker Linux-3.8.0-1.x86_64.rpm`
- `BlurAutoClicker-3.8.0-x86_64.tar.gz` (portable archive)

> [!NOTE]
- Always on Top works on X11; on pure Wayland use your compositor's window rules.
- The overlay-based sequence picker works on both X11 and Wayland.
- Keyboard auto-press requires access to `/dev/uinput`. Make sure your user is in the `input` group.

> [!WARNING]
> `.deb` and `.rpm` packages are provided for convenience but may need testing on your specific distribution. If they don't install or run, use the portable `.tar.gz` or report it in the Blur Discord.
