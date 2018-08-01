<template lang='pug'>

#addbadge
    shared-title(title='Add A Badge to name')
    form-box(btntxt="Add Badge"  event='badge-added' v-bind:data='member')
        label badge name
        input(v-model='member.badge' type='text')

</template>

<script>
import SharedTitle from '../slotUtils/SharedTitle'
import FormBox from '../slotUtils/FormBox'

export default {
    mounted(){
        let memberId = this.$router.currentRoute.path.split('/')[2]
        if (memberId){
          this.member.memberId = memberId
        }
    },
    components: {
        SharedTitle, FormBox
    },
    data(){
        return {
            member: {
                badge: '',
                memberId: ''
            }
        }
    }
}

</script>

<style lang='stylus' scoped>
@import '../../styles/colours'

</style>
