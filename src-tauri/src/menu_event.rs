use tauri::{menu::MenuEvent, AppHandle, Theme, WebviewUrl, WebviewWindowBuilder};

use crate::emits::{
    insert_table, set_code_block, set_heading, set_quote_block, toggle_bullet_list,
    toggle_ordered_list, toggle_task_list,
};

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

pub fn handle_menu_event(app: &AppHandle, event: MenuEvent) {
    let id = event.id.0;

    match id.as_str() {
        // app
        "settings" => {
            on_settings(app);
        }

        // paragraph
        "heading-1" => {
            set_heading(app, 1);
        }
        "heading-2" => {
            set_heading(app, 2);
        }
        "heading-3" => {
            set_heading(app, 3);
        }
        "heading-4" => {
            set_heading(app, 4);
        }
        "heading-5" => {
            set_heading(app, 5);
        }
        "heading-6" => {
            set_heading(app, 6);
        }
        "blockquote" => {
            set_quote_block(app);
        }
        "code-block" => {
            set_code_block(app);
        }
        "table-insert" => {
            insert_table(app);
        }
        "ordered-list" => {
            toggle_ordered_list(app);
        }
        "bullet-list" => {
            toggle_bullet_list(app);
        }
        "task-list" => {
            toggle_task_list(app);
        }

        // theme
        "theme-light" => {
            on_theme_light(app);
        }
        "theme-dark" => {
            on_theme_dark(app);
        }

        _ => {}
    }
}
