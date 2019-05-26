<!--PAGINATION-->
<template>
    <div class="pagination">
        <button class="first" v-on:click="firstPage">
            <img src="../assets/img/first.png" alt="first page"><span class="tooltip">Page 1</span>
        </button>
        <button class="previous" v-on:click="previousPage">
            <img src="../assets/img/previous.png" alt="previous page"><span class="tooltip">Previous {{current_page - 1}}</span>
        </button>
        <span class="current">{{current_page}}</span>
        <button class="next" v-on:click="nextPage">
            <img src="../assets/img/next.png" alt="next page"><span class="tooltip">Next {{current_page + 1}}</span>
        </button>
        <button class="last" v-on:click="lastPage">
            <img src="../assets/img/last.png" alt="last page"><span class="tooltip">Last {{total_pages}}</span>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            number_per_page: 20,
            current_page: 1,
            page_list: []
        }
    },
    computed: {
        // users from the store
        users() {
            return this.$store.state.users
        },
        // houses from the store
        houses() {
            return this.$store.state.houses
        },
        // total items are linked to data from the DB
        total_items() {
            return this.users
        },
        // total pages are obtained depending on total items and number per page
        total_pages () {
            return Math.ceil(this.total_items.length / this.number_per_page)
        },
    },
    // loadList is called as soon as total_pages changes
    watch: {
        total_pages (newValue, oldValue) {
            this.loadList()
        }
    },
    methods: {
        nextPage() {
            const current_number = document.querySelector('.current')
            this.current_page += 1;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        previousPage() {
            const current_number = document.querySelector('.current')
            this.current_page -= 1;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        firstPage() {
            const current_number = document.querySelector('.current')
            this.current_page = 1;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        lastPage() {
            const current_number = document.querySelector('.current')
            this.current_page = this.total_pages;
            current_number.innerHTML = this.current_page;
            this.loadList()
        },
        // select portion
        loadList() {
            let begin = ((this.current_page - 1) * this.number_per_page),
                end = begin + this.number_per_page;
            this.$emit('pageChange', {begin, end});
            this.check();
        },
        // disable buttons depending on page number
        check() {
            document.querySelector('.next').disabled = this.current_page === this.total_pages ? true : false;
            document.querySelector('.previous').disabled = this.current_page === 1 ? true : false;
            document.querySelector('.first').disabled = this.current_page === 1 ? true : false;
            document.querySelector('.last').disabled = this.current_page === this.total_pages ? true : false;
        }
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/styles.scss';
    .pagination {
        display: flex;
        align-items: center;
        opacity: 0.8;
        .tooltip {
            visibility: hidden;
            width: 100px;
            text-align: center;
            border-radius: 6px;
            padding: 5px 10px;
            position: absolute;
            z-index: 1;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-image: linear-gradient(to right, $pink , $redish);
            color: $white;
        }
        button {
            position: relative;
            border: none;
            &:hover .tooltip {
                visibility: visible;
            }
        }
        .current {
            font-size: 16px;
            font-weight: 600;
            color: $greyInk;
        }
    }
</style>
