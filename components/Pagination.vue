<!--PAGINATION-->
<template>
    <div id="pagination"></div>
</template>

<script>
export default {
    data() {
        return {
            code: '', 
            pagination: {
                code: '',
                size: 30, 
                page: 1, 
                step: 3
            }
        }
    }, 
    mounted() {
    },
    methods: {
       // https://jsfiddle.net/solodev/yw7y4wez/
        // https://pagination.js.org/docs/index.html
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/styles.scss';
    .authentified {
        display: flex; 
        justify-content: flex-end;
        text-align: right;
        align-items: center;
        margin-bottom: 40px;
        p {
            @include font (26px, $grey, 300, 1.2em);
        }
        &__disconnect {
            margin: 10px 20px;
            border: none;
            fill: $grey;
            cursor: pointer;
            &:hover {
                fill: $redish;
            }
        }
        &__up {
            position: fixed; 
            bottom: 3%; 
            right: 3%;
            width: 140px;
            height: 45px;
            text-transform: uppercase;
            @include font (26px, $grey, 500, 1.2em);
            letter-spacing: 2.5px;
            color: $grey;
            background-color: $white;
            border: none;
            outline: none;
            border-radius: 45px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease 0s;
            cursor: pointer;
            opacity: 0;

            &:hover {
                background-color: $redish;
                box-shadow: 0px 15px 20px rgba(249, 31, 76, 0.4);
                color: $white;
                transform: translateY(-7px);
            }
        }
        .appear {
            opacity: 1;
        }
    }
</style>
