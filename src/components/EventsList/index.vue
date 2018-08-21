<template lang='pug'>

#home
    shared-title(title='Recent History')
    ev(v-for='a in recent', :e='a')

</template>

<script>

import SharedTitle from '../slotUtils/SharedTitle'
import Ev from './Ev'

export default {
    computed: {
        recent(){
            return this.$store.state.recent.slice().reverse()
        }
    },
    components:{
        SharedTitle, Ev
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'


</style>
