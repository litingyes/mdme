use tauri::{menu::CheckMenuItem, AppHandle, Manager, Theme, Wry};

pub fn get_theme_menu_items(app: &AppHandle) -> (CheckMenuItem<Wry>, CheckMenuItem<Wry>) {
    let focused_window = app.get_focused_window();
    let mut theme = Theme::Light;
    match focused_window {
        Some(window) => {
            theme = window.theme().unwrap();
        }
        None => {}
    }

    let light = CheckMenuItem::with_id(
        app,
        "theme-light",
        "Light",
        true,
        theme == Theme::Light,
        None::<&str>,
    )
    .unwrap();
    let dark = CheckMenuItem::with_id(
        app,
        "theme-dark",
        "Dark",
        true,
        theme == Theme::Dark,
        None::<&str>,
    )
    .unwrap();

    return (light, dark);
}
