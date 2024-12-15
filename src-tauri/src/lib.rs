mod commands;
mod emits;
mod menu;
mod menu_event;
mod window_event;

use commands::{destroy_window, on_change_editor_active};
use menu::{
    get_app_submenu, get_help_submenu, get_paragraph_submenu, get_theme_submenu, get_window_submenu,
};
use menu_event::handle_menu_event;
use tauri::{generate_handler, menu::Menu};
use window_event::handle_window_event;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(generate_handler![on_change_editor_active, destroy_window])
        .menu(|handle| {
            let app = get_app_submenu(handle);
            let paragraph = get_paragraph_submenu(handle);
            let theme = get_theme_submenu(handle);
            let window = get_window_submenu(handle);
            let help = get_help_submenu(handle);

            Menu::with_items(handle, &[&app, &paragraph, &theme, &window, &help])
        })
        .on_menu_event(|app, event| {
            handle_menu_event(app, event);
        })
        .on_window_event(|window, event| {
            handle_window_event(window, event);
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
