use serde::Serialize;
use tauri::{AppHandle, Emitter, Window};

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SetHeadingOptions {
    pub level: u8,
}

// editor

pub fn set_heading(app: &AppHandle, level: u8) {
    app.emit_to("editor", "set-heading", SetHeadingOptions { level })
        .unwrap();
}

pub fn set_quote_block(app: &AppHandle) {
    app.emit_to("editor", "set-quote-block", ()).unwrap();
}

pub fn set_code_block(app: &AppHandle) {
    app.emit_to("editor", "set-code-block", ()).unwrap();
}

pub fn insert_table(app: &AppHandle) {
    app.emit_to("editor", "insert-table", ()).unwrap();
}

pub fn toggle_ordered_list(app: &AppHandle) {
    app.emit_to("editor", "toggle-ordered-list", ()).unwrap();
}

pub fn toggle_bullet_list(app: &AppHandle) {
    app.emit_to("editor", "toggle-bullet-list", ()).unwrap();
}

pub fn toggle_task_list(app: &AppHandle) {
    app.emit_to("editor", "toggle-task-list", ()).unwrap();
}

// file
pub fn close_editor_window(window: &Window) {
    window.emit_to("editor", "close_editor_window", ()).unwrap();
}
