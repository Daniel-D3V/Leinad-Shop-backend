import { eventEmitterInterface } from "@/modules/@shared/events";

export const mockEventEmiter = (): eventEmitterInterface => {
    return {
        emit: jest.fn(),
    }
}
