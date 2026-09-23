export const UserRoleEnum = {
    PROJECT_ADMIN : "project_admin",
    MEMBER : "member"
}

export const AvailableUserRoles = Object.values(UserRoleEnum);

export const CompanyRoleEnum = {
    ADMIN : "admin",
    MEMBER : "member"
}


export const AvailableCompanyRoles = Object.values(CompanyRoleEnum);

export const TaskStatusEnum = {
    TODO : "todo",
    INPROGRESS : "in_progress",
    COMPLETED : "completed"
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum);