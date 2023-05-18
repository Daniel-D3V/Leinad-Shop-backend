import { EventEmitterInterface } from "@/modules/@shared/events";

export const mockEventEmiter = (): EventEmitterInterface => {
    return {
        emit: jest.fn(),
    }
}
