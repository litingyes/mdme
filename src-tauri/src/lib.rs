use menu::get_theme_menu_items;
use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem, Submenu, SubmenuBuilder},
    Theme, WebviewUrl, WebviewWindowBuilder,
};
mod menu;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .menu(|handle| {
            let (light, dark) = get_theme_menu_items(handle);

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
                    &SubmenuBuilder::new(handle, "Theme")
                        .id("theme")
                        .items(&[&light, &dark])
                        .build()?,
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
            let (light, dark) = get_theme_menu_items(app);

            match id.as_str() {
                "settings" => {
                    WebviewWindowBuilder::new(app, "settings", WebviewUrl::App("/settings".into()))
                        .inner_size(800.0, 400.0)
                        .position(48.0, 96.0)
                        .build()
                        .unwrap();
                }
                "theme-light" => {
                    app.set_theme(Some(Theme::Light));

                    app.menu()
                        .unwrap()
                        .get("theme")
                        .unwrap()
                        .as_submenu()
                        .unwrap()
                        .get(dark.id())
                        .unwrap()
                        .as_check_menuitem()
                        .unwrap()
                        .set_checked(false)
                        .unwrap();
                }
                "theme-dark" => {
                    app.set_theme(Some(Theme::Dark));
                    app.menu()
                        .unwrap()
                        .get("theme")
                        .unwrap()
                        .as_submenu()
                        .unwrap()
                        .get(light.id())
                        .unwrap()
                        .as_check_menuitem()
                        .unwrap()
                        .set_checked(false)
                        .unwrap();
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
