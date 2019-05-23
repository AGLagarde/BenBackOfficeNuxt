<!--AUTHENTIFIED-->
<template>
    <div class="authentified">
        <p>Hello {{authUser.email}}</p>
        <button class="authentified__disconnect" v-on:click="disconnect">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>switch</title>
                <path d="M20 4.581v4.249c1.131 0.494 2.172 1.2 3.071 2.099 1.889 1.889 2.929 4.4 2.929 7.071s-1.040 5.182-2.929 7.071c-1.889 1.889-4.4 2.929-7.071 2.929s-5.182-1.040-7.071-2.929c-1.889-1.889-2.929-4.4-2.929-7.071s1.040-5.182 2.929-7.071c0.899-0.899 1.94-1.606 3.071-2.099v-4.249c-5.783 1.721-10 7.077-10 13.419 0 7.732 6.268 14 14 14s14-6.268 14-14c0-6.342-4.217-11.698-10-13.419zM14 0h4v16h-4z"></path>
            </svg>
        </button>
        <button class="authentified__up" v-on:click="scrollTop">Go Up</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // endpoint quand on envoie notre token, renvoie utilisateur connecté (endpoint /me) ...
            //token: this.$store.state.token,
            authUser: this.$store.state.authUser,
            login: 'admin'
        }
    },
    computed: {
        token() {
            return this.$store.state.token
        }
    },
    // if no token redirect to login page -----> not working 
    middleware: 'authenticated',
    mounted() {
        window.addEventListener('scroll', this.scrollAppear);
    },
    methods: {
        // appearance of button to scroll to top
        scrollAppear() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.querySelector('.authentified__up').classList.add('appear');
            } else {
                document.querySelector('.authentified__up').classList.remove('appear');
            }
        },
        // smooth scroll to top
        scrollTop() {
            const totop = document.documentElement.scrollTop || document.body.scrollTop;
            if (totop > 0) {
                window.requestAnimationFrame(this.scrollTop);
                window.scrollTo(0, totop - totop / 8);
            }
        },
        // NOT WORKING 
        disconnect() {
            console.log('mon token initial ', this.$store.state.token)
            console.log('mon localstorage token initial ', localStorage.token)
            this.$store.commit('setToken', null)
            console.log('mon token vidé ', this.$store.state.token)
            localStorage.clear()
            console.log('mon localstorage token vidé ', localStorage.token)
            if (this.token == null) { // condition inverse à mon raisonnement... 
                // middleware: 'authenticated' -- not working
                console.log(this.token)
                //return redirect('/login')
                this.$router.push({ path: '/login' })
            } else {
                console.log('no need')
            }
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
