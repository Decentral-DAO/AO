<template lang='pug'>

#home
    shared-title(title='All recent history')
    ev(v-for='a in $store.state.recent', :e='a')


</template>

<script>

import SharedTitle from '../slotUtils/SharedTitle'
import Ev from './Ev'


export default {
    components:{
        SharedTitle, Ev
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'


</style>
