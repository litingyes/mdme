mod commands;
mod emits;
mod menu;
mod menu_event;

use commands::on_change_editor_active;
use menu::{get_app_submenu, get_paragraph_submenu, get_theme_submenu, get_window_submenu};
use menu_event::handle_menu_event;
use tauri::{generate_handler, menu::Menu, Theme, WindowEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(generate_handler![on_change_editor_active])
        .menu(|handle| {
            let app = get_app_submenu(handle);
            let paragraph = get_paragraph_submenu(handle);
            let theme = get_theme_submenu(handle);
            let window = get_window_submenu(handle);

            Menu::with_items(handle, &[&app, &paragraph, &theme, &window])
        })
        .on_menu_event(|app, event| {
            handle_menu_event(app, event);
        })
        .on_window_event(|window, event| match event {
            WindowEvent::Focused(focused) => {
                if *focused {
                    let theme = window.theme().unwrap();

                    match theme {
                        Theme::Light => {
                            window
                                .menu()
                                .unwrap()
                                .get("theme")
                                .unwrap()
                                .as_submenu()
                                .unwrap()
                                .get("theme-light")
                                .unwrap()
                                .as_check_menuitem()
                                .unwrap()
                                .set_checked(true)
                                .unwrap();
                            window
                                .menu()
                                .unwrap()
                                .get("theme")
                                .unwrap()
                                .as_submenu()
                                .unwrap()
                                .get("theme-dark")
                                .unwrap()
                                .as_check_menuitem()
                                .unwrap()
                                .set_checked(false)
                                .unwrap();
                        }
                        Theme::Dark => {
                            window
                                .menu()
                                .unwrap()
                                .get("theme")
                                .unwrap()
                                .as_submenu()
                                .unwrap()
                                .get("theme-light")
                                .unwrap()
                                .as_check_menuitem()
                                .unwrap()
                                .set_checked(false)
                                .unwrap();
                            window
                                .menu()
                                .unwrap()
                                .get("theme")
                                .unwrap()
                                .as_submenu()
                                .unwrap()
                                .get("theme-dark")
                                .unwrap()
                                .as_check_menuitem()
                                .unwrap()
                                .set_checked(true)
                                .unwrap();
                        }
                        _ => {}
                    }
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
