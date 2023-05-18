export interface GetAnnouncePriceFacadeInterface {
    execute(announceId: string): Promise<number | undefined>
}