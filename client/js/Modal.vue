<template>
    <div ref="modal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <slot name="title"></slot>
                    </h5>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div class="modal-body">
                    <slot></slot>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        <slot name="cancel-button-text"></slot>
                    </button>

                    <button @click="ok" type="button" class="btn btn-primary">
                        <slot name="ok-button-text"></slot>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        data() {
            return {
                onOk: null
            };
        },

        methods: {
            show(onOk) {
                this.onOk = onOk;
                $(this.$refs.modal).modal("show");
            },

            ok() {
                this.onOk();
                $(this.$refs.modal).modal("hide");
            }
        }
    };
</script>