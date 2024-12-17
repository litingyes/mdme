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

pub fn get_edit_submenu(app: &AppHandle) -> Submenu<Wry> {
    SubmenuBuilder::new(app, "Edit")
        .id("edit")
        .items(&[
            &PredefinedMenuItem::undo(app, None).unwrap(),
            &PredefinedMenuItem::redo(app, None).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &PredefinedMenuItem::select_all(app, None).unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &PredefinedMenuItem::cut(app, None).unwrap(),
            &PredefinedMenuItem::copy(app, None).unwrap(),
            &PredefinedMenuItem::paste(app, None).unwrap(),
        ])
        .build()
        .unwrap()
}

pub fn get_paragraph_submenu(app: &AppHandle) -> Submenu<Wry> {
    SubmenuBuilder::new(app, "Paragraph")
        .id("paragraph")
        .items(&[
            &CheckMenuItem::with_id(app, "heading-1", "Heading 1", true, false, None::<&str>)
                .unwrap(),
            &CheckMenuItem::with_id(app, "heading-2", "Heading 2", true, false, None::<&str>)
                .unwrap(),
            &CheckMenuItem::with_id(app, "heading-3", "Heading 3", true, false, None::<&str>)
                .unwrap(),
            &CheckMenuItem::with_id(app, "heading-4", "Heading 4", true, false, None::<&str>)
                .unwrap(),
            &CheckMenuItem::with_id(app, "heading-5", "Heading 5", true, false, None::<&str>)
                .unwrap(),
            &CheckMenuItem::with_id(app, "heading-6", "Heading 6", true, false, None::<&str>)
                .unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &CheckMenuItem::with_id(app, "paragraph", "Paragraph", true, false, None::<&str>)
                .unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &CheckMenuItem::with_id(app, "blockquote", "Quote block", true, false, None::<&str>)
                .unwrap(),
            &CheckMenuItem::with_id(app, "code-block", "Code block", true, false, None::<&str>)
                .unwrap(),
            &SubmenuBuilder::new(app, "Table")
                .id("table")
                .items(&[&MenuItem::with_id(
                    app,
                    "table-insert",
                    "Insert table",
                    true,
                    None::<&str>,
                )
                .unwrap()])
                .build()
                .unwrap(),
            &PredefinedMenuItem::separator(app).unwrap(),
            &CheckMenuItem::with_id(
                app,
                "ordered-list",
                "Ordered list",
                true,
                false,
                None::<&str>,
            )
            .unwrap(),
            &CheckMenuItem::with_id(
                app,
                "bullet-list",
                "Unordered list",
                true,
                false,
                None::<&str>,
            )
            .unwrap(),
            &CheckMenuItem::with_id(app, "task-list", "Task list", true, false, None::<&str>)
                .unwrap(),
        ])
        .build()
        .unwrap()
}

pub fn get_theme_submenu(app: &AppHandle) -> Submenu<Wry> {
    let focused_window = app.get_focused_window();
    let mut theme = Theme::Light;
    match focused_window {
        Some(window) => {
            theme = window.theme().unwrap();
        }
        None => {}
    }

    SubmenuBuilder::new(app, "Theme")
        .id("theme")
        .items(&[
            &CheckMenuItem::with_id(
                app,
                "theme-light",
                "Light",
                true,
                theme == Theme::Light,
                None::<&str>,
            )
            .unwrap(),
            &CheckMenuItem::with_id(
                app,
                "theme-dark",
                "Dark",
                true,
                theme == Theme::Dark,
                None::<&str>,
            )
            .unwrap(),
        ])
        .build()
        .unwrap()
}

pub fn get_window_submenu(app: &AppHandle) -> Submenu<Wry> {
    SubmenuBuilder::new(app, "Window")
        .id("window")
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

pub fn get_help_submenu(app: &AppHandle) -> Submenu<Wry> {
    SubmenuBuilder::new(app, "Help")
        .id("help")
        .items(&[&MenuItem::with_id(app, "github", "Github", true, None::<&str>).unwrap()])
        .build()
        .unwrap()
}
