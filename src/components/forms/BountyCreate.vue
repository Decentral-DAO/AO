<template lang='pug'>

#createtask
    shared-title(title='Propose Bounty')
    form-box(btntxt="Create New Task" event='task-created' v-bind:data="task")
        label title
        input(v-model='task.name' type='text')
        label description
        input(v-model='task.description' type='text')
        label Value
        input(v-model='task.boost' type='text')

</template>

<script>

import SharedTitle from '../slotUtils/SharedTitle'
import FormBox from '../slotUtils/FormBox'

export default {
    data(){
        return {
            task: {
                name: '',
                description: '',
                monthlyValue: 0,
                cap: 0,
                oneTime: true,
                boost: 0,
                fob: '',
            }
        }
    },
    components: {
        SharedTitle, FormBox
    }
}

</script>

<style lang='stylus' scoped>
@import '../../styles/colours'

.onetime
    display: inline

</style>
