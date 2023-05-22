export type MysqlConfigInterface = {
    name: string
    expression: string
    statement: "INSERT" | "UPDATE" | "DELETE"
}