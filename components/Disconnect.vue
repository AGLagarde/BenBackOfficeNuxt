<!--AUTHENTIFIED-->
<template>
    <div class="authentified">
        <button class="authentified__disconnect" @click="disconnect">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>switch</title>
                <path d="M20 4.581v4.249c1.131 0.494 2.172 1.2 3.071 2.099 1.889 1.889 2.929 4.4 2.929 7.071s-1.040 5.182-2.929 7.071c-1.889 1.889-4.4 2.929-7.071 2.929s-5.182-1.040-7.071-2.929c-1.889-1.889-2.929-4.4-2.929-7.071s1.040-5.182 2.929-7.071c0.899-0.899 1.94-1.606 3.071-2.099v-4.249c-5.783 1.721-10 7.077-10 13.419 0 7.732 6.268 14 14 14s14-6.268 14-14c0-6.342-4.217-11.698-10-13.419zM14 0h4v16h-4z"></path>
            </svg>
        </button>
        <button class="authentified__up" @click="scrollTop">Go Up</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // endpoint (/me) missing in the api
            authUser: this.$store.state.authUser
        }
    },
    computed: {
        token() {
            return this.$store.state.token
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollAppear);
    },
    methods: {
        // so many users you have to scroll --> appearance of button to scroll to top
        scrollAppear() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.querySelector('.authentified__up').classList.add('appear');
            } else {
                document.querySelector('.authentified__up').classList.remove('appear');
            }
        },
        // so many users you have to scroll --> smooth scroll to top
        scrollTop() {
            const totop = document.documentElement.scrollTop || document.body.scrollTop;
            if (totop > 0) {
                window.requestAnimationFrame(this.scrollTop);
                window.scrollTo(0, totop - totop / 8);
            }
        },
        // disconnect and redirect to login - empty the token of localstorage and store
        disconnect() {
            this.$store.commit('setToken', null)
            localStorage.clear()
            if (this.token == null) {
                this.$router.push({ path: '/' })
            }
        }
    }
}
</script>
