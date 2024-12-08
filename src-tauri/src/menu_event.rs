use tauri::{AppHandle, Theme, WebviewUrl, WebviewWindowBuilder};

pub fn on_settings(app: &AppHandle) {
    WebviewWindowBuilder::new(app, "settings", WebviewUrl::App("/settings".into()))
        .inner_size(800.0, 400.0)
        .position(48.0, 96.0)
        .build()
        .unwrap();
}

pub fn on_theme_light(app: &AppHandle) {
    app.set_theme(Some(Theme::Light));
    app.menu()
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

pub fn on_theme_dark(app: &AppHandle) {
    app.set_theme(Some(Theme::Dark));
    app.menu()
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
}
