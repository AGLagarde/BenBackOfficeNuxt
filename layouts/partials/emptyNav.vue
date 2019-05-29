<!--EMPTY NAVIGATION-->
<template>
    <div class="empty">
        <div class="navigation"></div>
        <div class="content"></div>
        <nuxt />
    </div>
</template>


<style>
    .empty {
        .content {
            width: calc(100% - $widthNav);
        }
    }
</style>