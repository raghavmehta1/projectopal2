package tasktracker

default allow = false

# Allow all authenticated users to view tasks
allow {
    input.action == "view_tasks"
    input.user.role == "admin"
}

allow {
    input.action == "view_tasks"
    input.user.role == "guest"
}

# Allow only admin to add tasks
allow {
    input.action == "add_task"
    input.user.role == "admin"
}

# Allow only admin to update tasks
allow {
    input.action == "update_task"
    input.user.role == "admin"
}

# Allow only admin to delete tasks
allow {
    input.action == "delete_task"
    input.user.role == "admin"
}