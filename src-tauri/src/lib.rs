use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem, Submenu},
    WebviewUrl, WebviewWindowBuilder,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .menu(|handle| {
            Menu::with_items(
                handle,
                &[
                    &Submenu::with_items(
                        handle,
                        "Mdme",
                        true,
                        &[
                            &PredefinedMenuItem::about(handle, None, None)?,
                            &PredefinedMenuItem::separator(handle)?,
                            &MenuItem::with_id(handle, "settings", "Settings", true, None::<&str>)?,
                            &PredefinedMenuItem::separator(handle)?,
                            &PredefinedMenuItem::services(handle, None)?,
                            &PredefinedMenuItem::separator(handle)?,
                            &PredefinedMenuItem::hide(handle, None)?,
                            &PredefinedMenuItem::hide_others(handle, None)?,
                            &PredefinedMenuItem::show_all(handle, None)?,
                            &PredefinedMenuItem::separator(handle)?,
                            &PredefinedMenuItem::quit(handle, None)?,
                        ],
                    )?,
                    &Submenu::with_items(
                        handle,
                        "Edit",
                        true,
                        &[
                            &PredefinedMenuItem::undo(handle, None)?,
                            &PredefinedMenuItem::redo(handle, None)?,
                            &PredefinedMenuItem::separator(handle)?,
                            &PredefinedMenuItem::copy(handle, None)?,
                            &PredefinedMenuItem::cut(handle, None)?,
                            &PredefinedMenuItem::paste(handle, None)?,
                        ],
                    )?,
                    &Submenu::with_items(
                        handle,
                        "Window",
                        true,
                        &[
                            &PredefinedMenuItem::minimize(handle, None)?,
                            &PredefinedMenuItem::maximize(handle, None)?,
                            &PredefinedMenuItem::separator(handle)?,
                            &PredefinedMenuItem::fullscreen(handle, None)?,
                            &PredefinedMenuItem::separator(handle)?,
                            &PredefinedMenuItem::close_window(handle, None)?,
                        ],
                    )?,
                ],
            )
        })
        .on_menu_event(|app, e| {
            let id = e.id.0;

            if id == "settings" {
                WebviewWindowBuilder::new(app, "settings", WebviewUrl::App("/settings".into()))
                    .inner_size(800.0, 400.0)
                    .position(48.0, 96.0)
                    .build()
                    .unwrap();
            }
        })
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
