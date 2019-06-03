<!--EMPTY NAVIGATION-->
<template>
    <div class="empty">
        <div class="navigation"></div>
        <div class="content"></div>
        <nuxt />
    </div>
</template>


<style lang="scss">
    @import '~/assets/scss/styles.scss';
    .empty {
        .content {
            width: calc(100% - 170px);
        }
    }
</style>