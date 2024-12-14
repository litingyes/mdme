use tauri::{Theme, Window, WindowEvent};

use crate::emits::close_editor_window;

pub fn handle_window_event(window: &Window, event: &WindowEvent) {
    match event {
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
        WindowEvent::CloseRequested { api, .. } => {
            if window.label() == "editor" {
                api.prevent_close();
                close_editor_window(window);
            }
        }
        _ => {}
    }
}
