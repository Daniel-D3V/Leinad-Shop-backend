export interface CheckAnnounceExistsFacadeInterface {
    execute(announceId: string): Promise<boolean>
}