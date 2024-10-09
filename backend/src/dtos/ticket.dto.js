export default class TicketDTO {
    fromModel(model) {
        return {
            id: model.id,
            code: model.code,
            amount: model.amount,
            purchaser: model.purchaser,
        };
    }

    fromData(data) {
        return {
            amount: data.amount ? Number(data.amount) : null,
            purchaser: data.purchaser ? data.purchaser : null,
        };
    }
}