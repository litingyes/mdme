use menu::{get_app_submenu, get_theme_submenu, get_window_submenu};
use menu_event::{on_settings, on_theme_dark, on_theme_light};
use tauri::menu::Menu;
mod menu;
mod menu_event;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .menu(|handle| {
            let app = get_app_submenu(handle);
            let theme = get_theme_submenu(handle);
            let window = get_window_submenu(handle);

            Menu::with_items(handle, &[&app, &theme, &window])
        })
        .on_menu_event(|app, e| {
            let id = e.id.0;

            match id.as_str() {
                "settings" => {
                    on_settings(app);
                }
                "theme-light" => {
                    on_theme_light(app);
                }
                "theme-dark" => {
                    on_theme_dark(app);
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
