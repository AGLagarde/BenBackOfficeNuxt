<template>
    <tr class="listItems__table__body">
        <th class="listItems__table__body-entries">{{ house.id }}</th>
        <th class="listItems__table__body-entries">{{ house.name }}</th>
        <th class="listItems__table__body-entries">{{ house.created }}</th>
        <th class="listItems__table__body-entries">
            <span>{{ names.join() }}</span>
        </th>
        <th class="listItems__table__body-actions">
            <HouseDelete
                :house="house" 
                v-on:delete-house="transmitToParent"
                class="buttonRow"
            />
            <button class="buttonRow"
                v-on:click="goInvitation"
            >Invitation</button>
            <!-- <HouseButton
                title="Editer"
                :house="house"
                v-on:modified-house="receiveModifiedHouse"
                v-on:delete-house="transmitToParent"
            >
            </HouseButton> -->
        </th>
    </tr>
</template>


<script>
import HouseDelete from './HouseDelete'

export default {
    components: {
        HouseDelete
    },
    props: {
        house: Object
    },
    data() {
        return {
            token: this.$store.state.token,
            houses: this.$store.state.houses
        }
    },
    methods: {
        goInvitation() {
            this.isActive = true
            this.$router.push({ path: 'houses/invitation' })
        },
        // API PUT request transmission --> parent ListUser
        receiveModifiedHouse(houseUpdated) {
            this.house.name = houseUpdated.name
            this.house.created = houseUpdated.created
            this.house.users = houseUpdated.users
        }, 
        // API DELETE request transmission --> parent ListHouse
        transmitToParent(id) {
            this.$emit('delete-house-suite', id)
        }
    },
    computed: {
        // get names of users in the house
        names() {
            return this.house.users.map(user => {
                return `${user.firstname} ${user.lastname}`
            });
        }
    }
}
 
</script>