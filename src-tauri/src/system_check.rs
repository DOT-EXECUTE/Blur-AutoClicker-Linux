use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SystemCheckResult {
    pub ok: bool,
    pub message: String,
}

#[tauri::command]
pub fn check_system_deps() -> Result<SystemCheckResult, String> {
    #[cfg(target_os = "linux")]
    {
        let mouse = crate::engine::mouse::linux_mouse_diagnostic();
        let keyboard = crate::engine::keyboard::keyboard_diagnostic();
        let message = format!("{}\n{}", mouse, keyboard);
        let ok = crate::engine::mouse::uinput_available()
            || crate::engine::mouse::linux_use_x11()
            || crate::engine::keyboard::linux_key_available();
        Ok(SystemCheckResult { ok, message })
    }
    #[cfg(target_os = "windows")]
    {
        Ok(SystemCheckResult {
            ok: true,
            message: String::from("Windows backend is active."),
        })
    }
}
