
export interface announceInfoFacadeInterface {
    checkExistsByAnnounceId(announceId: string): Promise<boolean>
}