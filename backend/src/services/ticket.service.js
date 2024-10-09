import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import TicketRepository from "../repositories/ticket.repository.js";

export default class TicketService {
    #ticketRepository;

    constructor (){
        this.#ticketRepository = new TicketRepository();
    }

    async findAll(paramFilters) {

        return await this.#ticketRepository.findAll(paramFilters);
    }

    async findOneById(id) {
        const ticketFound = await this.#ticketRepository.findOneById(id);
        if (!ticketFound) throw new Error(ERROR_NOT_FOUND_ID);

        return ticketFound;
    }

    async insertOne(data) {
        return await this.#ticketRepository.save(data);
    }

    async updateOneById(id, data){
        const ticketFound = await this.findOneById(id);
        const newValues = { ...ticketFound, ...data };
        return await this.#ticketRepository.save(newValues);
    }

    async deleteOneById(id){
        const ticketFound = await this.findOneById(id);
        await this.#ticketRepository.deleteOneById(id);
        return ticketFound;
    }
}