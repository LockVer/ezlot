<template>
    <div class="infocard">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfoCardView",
    data() {
        return {
        };
    }
};
</script>

<style lang="scss">
.infocard{
    display: flex;
    flex-direction: column;
    width: 50vw;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 15px 0 rgba(255,255,255,.5);
    padding: 20px;
}
</style>