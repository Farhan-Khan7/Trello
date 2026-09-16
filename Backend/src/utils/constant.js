export const UserRoleEnum = {
    ADMIN : "admin",
    PROJECT : "project_admin",
    MEMBER : "member"
}

export const AvailableUserRoles = Object.values(UserRoleEnum);

export const TaskStatusEnum = {
    TODO : "todo",
    INPROGRESS : "in_progress",
    COMPLETED : "completed"
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum);``