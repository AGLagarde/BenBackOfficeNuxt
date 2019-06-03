<!--PAGINATION-->
<template>
    <div class="pagination">
        <button class="first" @click="firstPage">
            <img src="../assets/img/first.png" alt="first page"><span class="tooltip">Page 1</span>
        </button>
        <button class="previous" @click="previousPage">
            <img src="../assets/img/previous.png" alt="previous page"><span class="tooltip">Previous</span>
        </button>
        <span class="current">{{currentPage}} / {{totalPages}}</span>
        <button class="next" @click="nextPage">
            <img src="../assets/img/next.png" alt="next page"><span class="tooltip">Next</span>
        </button>
        <button class="last" @click="lastPage">
            <img src="../assets/img/last.png" alt="last page"><span class="tooltip">Last {{totalPages}}</span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        items: Array, 
        totalPages: Number
    },

    data() {
        return {
            currentPage: this.$store.state.currentPage
        }
    },

    methods: {
        updatePage() {
            const current_number = document.querySelector('.current')
            current_number.innerHTML = `${this.currentPage} / ${this.totalPages}`
            this.$store.commit('setCurrentPage', this.currentPage)
            this.check()
        },
        /**
        * Behaviors of arrows depending on the current page
        */
        nextPage() {
            this.currentPage += 1;
            this.updatePage()
            this.$store.commit('setCurrentPage', this.currentPage)
        },
        previousPage() {
            this.currentPage -= 1;
            this.updatePage()
            this.$store.commit('setCurrentPage', this.currentPage)
        },
        firstPage() {
            this.currentPage = 1;
            this.updatePage()
            this.$store.commit('setCurrentPage', this.currentPage)
        },
        lastPage() {
            this.currentPage = this.totalPages;
            this.updatePage()
        },
        check() {
            document.querySelector('.next').disabled = this.currentPage === this.totalPages ? true : false;
            document.querySelector('.previous').disabled = this.currentPage === 1 ? true : false;
            document.querySelector('.first').disabled = this.currentPage === 1 ? true : false;
            document.querySelector('.last').disabled = this.currentPage === this.totalPages ? true : false;
        }
    }
}
</script>
