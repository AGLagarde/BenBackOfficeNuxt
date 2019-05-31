<!--PAGINATION-->
<template>
    <div class="pagination">
        <button class="first" @click="firstPage">
            <img src="../assets/img/first.png" alt="first page"><span class="tooltip">Page 1</span>
        </button>
        <button class="previous" @click="previousPage">
            <img src="../assets/img/previous.png" alt="previous page"><span class="tooltip">Previous</span>
        </button>
        <span class="current">{{currentPage}} / {{total_pages}}</span>
        <button class="next" @click="nextPage">
            <img src="../assets/img/next.png" alt="next page"><span class="tooltip">Next</span>
        </button>
        <button class="last" @click="lastPage">
            <img src="../assets/img/last.png" alt="last page"><span class="tooltip">Last {{total_pages}}</span>
        </button>
    </div>
</template>

<script>
export default {
    props: ['items'],
    data() {
        return {
            path: '',
            currentPage: this.$store.state.currentPage,
            number_per_page: 20,
            //current_page: 1,
            page_list: []
        }
    },
    mounted() {
        this.path = window.location.pathname
        this.loadList()
    },
    computed: {
        // total items are linked to data from the DB
        total_items() {
            return this.items;
        },
        // total pages are obtained depending on total items and number per page
        total_pages () {
            return Math.ceil(this.total_items.length / this.number_per_page)
        },
    },
    // loadList is called as soon as total_pages changes
    watch: {
        total_pages(newValue, oldValue) {
            this.loadList()
        }
    },
    methods: {
        nextPage() {
            this.currentPage += 1;
            this.updatePage()
            this.loadList()
        },
        previousPage() {
            this.currentPage -= 1;
            this.updatePage()
            this.loadList()
        },
        firstPage() {
            this.currentPage = 1;
            this.updatePage()
            this.loadList()
        },
        lastPage() {
            this.currentPage = this.total_pages;
            this.updatePage()
            this.loadList()
        },
        // update page in DOM and transfer data to the store
        updatePage() {
            const current_number = document.querySelector('.current')
            current_number.innerHTML = `${this.currentPage}/${this.total_pages}`;;
            this.$store.commit('setCurrentPage', this.currentPage)
        },
        // select portion to show
        loadList() {
            let begin = ((this.currentPage - 1) * this.number_per_page),
                end = begin + this.number_per_page;
            this.$emit('pageChange', {begin, end});
            this.check();
        },
        // disable buttons depending on page number
        check() {
            document.querySelector('.next').disabled = this.currentPage === this.total_pages ? true : false;
            document.querySelector('.previous').disabled = this.currentPage === 1 ? true : false;
            document.querySelector('.first').disabled = this.currentPage === 1 ? true : false;
            document.querySelector('.last').disabled = this.currentPage === this.total_pages ? true : false;
        }
    }
}
</script>
