use tauri::{
    menu::{CheckMenuItem, MenuItem, PredefinedMenuItem, Submenu, SubmenuBuilder},
    AppHandle, Manager, Theme, Wry,
};

pub fn get_app_submenu(app: &AppHandle) -> Submenu<Wry> {
    SubmenuBuilder::new(app, "Mdme")
        .id("mdme")
        .items(&[
            &PredefinedMenuItem::about(app, None, None).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &MenuItem::with_id(app, "settings", "Settings", true, None::<&str>).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &PredefinedMenuItem::services(app, None).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &PredefinedMenuItem::hide(app, None).unwrap(),
            &PredefinedMenuItem::hide_others(app, None).unwrap(),
            &PredefinedMenuItem::show_all(app, None).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &PredefinedMenuItem::quit(app, None).unwrap(),
        ])
        .build()
        .unwrap()
}

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

    (light, dark)
}
pub fn get_theme_submenu(app: &AppHandle) -> Submenu<Wry> {
    let (light, dark) = get_theme_menu_items(app);

    SubmenuBuilder::new(app, "Theme")
        .id("theme")
        .items(&[&light, &dark])
        .build()
        .unwrap()
}

pub fn get_window_submenu(app: &AppHandle) -> Submenu<Wry> {
    SubmenuBuilder::new(app, "Window")
        .id("theme")
        .items(&[
            &PredefinedMenuItem::minimize(app, None).unwrap(),
            &PredefinedMenuItem::maximize(app, None).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &PredefinedMenuItem::fullscreen(app, None).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &PredefinedMenuItem::close_window(app, None).unwrap(),
        ])
        .build()
        .unwrap()
}
