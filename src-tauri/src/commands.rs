use tauri::{AppHandle, Window};

#[tauri::command]
pub fn on_change_editor_active(app: AppHandle, active_name: String) {
    let paragraph_submenu = app.menu().unwrap().get("paragraph").unwrap();
    for item in paragraph_submenu.as_submenu().unwrap().items().unwrap() {
        if let Some(check_menu_item) = item.as_check_menuitem() {
            let menu_id = check_menu_item.id().0.clone();
            check_menu_item.set_checked(menu_id == active_name).unwrap();
        }
    }
}

#[tauri::command]
pub fn destroy_window(window: Window) {
    window.destroy().unwrap();
}
