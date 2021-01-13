import { get, post } from "./ajax";

export default class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/";
    }

    getContacts(term) {
        return get(this.baseUrl + "getContacts", { term });
    }

    createContact(contact) {
        return post(this.baseUrl + "addContact", { contact });
    }

    deleteContact(_id) {
        return post(this.baseUrl + "deleteContact", { _id });
    }
}