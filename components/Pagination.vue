<!--PAGINATION-->
<template>
    <div id="pagination" v-on:click="getNumberOfPages">
        <button id="first" v-on:click="firstPage">FIRST: {{1}}</button>
        <button id="previous" v-on:click="previousPage">PREVIOUS: {{current_page - 1}}</button>
        <span class="current">current: {{current_page}}</span>
        <button id="next" v-on:click="nextPage">NEXT: {{current_page + 1}}</button>
        <button id="last" v-on:click="lastPage">LAST: {{total_pages}}</button>
        <!--<span>{{rangeWithDots}}</span>-->
        <span>range: {{number_per_page}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {

            // list = document.querySelector('.list');
            users: this.$store.state.users,
            // total_items: this.users,
            number_per_page: 5,
            current_page: 1,
            total_pages: [],
            page_list: []
            // current_number: document.querySelector('.current')
        }
    },
    computed: {
        total_items() {
            return this.users
        }
    },
    mounted () {
        //this.getNumberOfPages()
    },
    methods: {
       // https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
        getNumberOfPages () {
            console.log('mes users ', this.users)
            this.total_pages = Math.ceil(this.users.length / this.number_per_page)
            console.log('mes users ', this.users)
            // console.log('mes items ', this.total_items)
            this.loadList()
            return this.total_pages
        },
        nextPage() {
            const current_number = document.querySelector('.current')
            this.getNumberOfPages();
            this.current_page += 1;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        previousPage() {
            const current_number = document.querySelector('.current')
            this.getNumberOfPages();
            this.current_page -= 1;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        firstPage() {
            const current_number = document.querySelector('.current')
            this.getNumberOfPages();
            this.current_page = 1;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        lastPage() {
            const current_number = document.querySelector('.current')
            this.getNumberOfPages();
            this.current_page = this.total_pages;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        loadList() {
            let begin = ((this.current_page - 1) * this.number_per_page),
                end = begin + this.number_per_page;
            this.page_list = this.users.slice(begin, end)
            console.log(this.page_list)
            // this.drawList();
            this.check();
        },
        drawList() {
            // document.querySelector('.list').innerHTML = "";
            // this.page_list.forEach(function(item){
            //     document.querySelector('.list').innerHTML += item.textContent + "<br/>";
            // })
        },
        check() {
            document.getElementById("next").disabled = this.current_page === this.total_pages ? true : false;
            document.getElementById("previous").disabled = this.current_page === 1 ? true : false;
            document.getElementById("first").disabled = this.current_page === 1 ? true : false;
            document.getElementById("last").disabled = this.current_page === this.total_pages ? true : false;
        }
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
