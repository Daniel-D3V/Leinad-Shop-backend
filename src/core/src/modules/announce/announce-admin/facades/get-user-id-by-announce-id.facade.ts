export interface GetUserIdByAnnounceIdFacadeInterface {
    execute(announceId: string): Promise<string | undefined>
}