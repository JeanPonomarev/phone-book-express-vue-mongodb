<template>
    <div id="app" v-cloak class="container">
        <h1 class="text-center mt-5 text-white">Phone Book</h1>

        <div class="row mt-5">
            <div class="col-md-6 mx-auto">
                <ValidationObserver v-slot="{ invalid }" ref="observer">
                    <form class="shadow bg-transparent rounded bg-white px-3 pt-4 pb-3 custom-form"
                          @submit.prevent="addContact">

                        <validation-provider name="Name" rules="required|alpha|max:20" v-slot="{ errors }">
                            <div class="col-12 form-group">
                                <label for="input-name" class="col-form-label">Name
                                    <span class="text-danger">*</span>
                                </label>

                                <input v-model="name" type="text" class="form-control" id="input-name" placeholder="Enter name">
                                <div class="error-message">{{ errors[0] }}</div>
                            </div>
                        </validation-provider>

                        <validation-provider name="Surname" rules="required|alpha|max:30" v-slot="{ errors }">
                            <div class="col-12 form-group">
                                <label for="input-surname" class="col-form-label">Surname
                                    <span class="text-danger">*</span>
                                </label>

                                <input v-model="surname" type="text" class="form-control" id="input-surname" placeholder="Enter surname">
                                <div class="error-message">{{ errors[0] }}</div>
                            </div>
                        </validation-provider>

                        <validation-provider name="Phone number" rules="required|numeric|min:7|max:11" v-slot="{ errors }">
                            <div class="col-12 form-group">
                                <label for="input-phone" class="col-form-label">Phone number
                                    <span class="text-danger">*</span>
                                </label>

                                <input v-model="phoneNumber" type="text" class="form-control" id="input-phone" placeholder="Enter phone number">
                                <div class="error-message">{{ errors[0] }}</div>
                            </div>
                        </validation-provider>

                        <div class="col-12 form-group text-center">
                            <button @click="addContact" :disabled="invalid" type="button" class="btn btn-success mt-2 col-4">Add contact</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>

        <div class="row mt-4 mb-3">
            <div class="col-md-6 mx-auto">
                <form class="form-inline px-2 py-3 custom-form justify-content-center">
                    <input v-model.trim="term" type="text" class="form-control mr-sm-2 mb-2 mb-sm-0"
                           placeholder="Enter target value">

                    <button @click="loadContacts" type="button" class="btn btn-success">Search Contact</button>
                    <button @click="clearSearch" type="button" class="btn btn-secondary ml-2">Clear Search</button>
                </form>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-8 mx-auto">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Phone number</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody v-for="(contact, index) in contacts">
                        <tr>
                            <th>{{ index + 1 }}</th>
                            <td>{{ contact.name }}</td>
                            <td>{{ contact.surname }}</td>
                            <td>{{ contact.phoneNumber }}</td>
                            <td>
                                <button @click="deleteContactConfirm(contact)" type="button" class="btn btn-danger delete">
                                    <i class="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <modal ref="confirmDeleteDialog">
            <p>Do you want to delete the contact?</p>

            <template v-slot:title>
                Delete confirmation
            </template>

            <template v-slot:cancel-button-text>
                Cancel
            </template>

            <template v-slot:ok-button-text>
                OK
            </template>
        </modal>
    </div>
</template>

<script>
    import PhoneBookService from "./phoneBookService";
    import Modal from "./Modal.vue";

    export default {
        data() {
            return {
                contacts: [],
                name: "",
                surname: "",
                phoneNumber: "",
                term: "",
                service: new PhoneBookService()
            };
        },

        components: {
            Modal
        },

        created() {
            this.loadContacts();
        },

        methods: {
            loadContacts() {
                let self = this;

                this.service.getContacts(this.term).done(function (response) {
                    self.contacts = response;
                }).fail(function () {
                    alert("Failed to load contacts' list")
                })
            },

            clearSearch() {
                this.term = "";
                this.loadContacts();
            },

            addContact() {
                const contact = {
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                };

                let self = this;

                this.service.createContact(contact).done(function (response) {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }

                    self.name = "";
                    self.surname = "";
                    self.phoneNumber = "";

                    self.loadContacts();
                }).fail(function () {
                    alert("Failed to create contact")
                });

                this.$refs.observer.reset();
            },

            deleteContactConfirm(contact) {
                this.$refs.confirmDeleteDialog.show(() => {
                    this.service.deleteContact(contact._id).done(response => {
                        if (!response.success) {
                            alert(response.message);
                            return;
                        }

                        this.loadContacts();
                    }).fail(function () {
                        alert("Failed to delete contact");
                    });
                });
            }
        }
    }
</script>