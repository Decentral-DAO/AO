<template lang='pug'>

.resourcesummary
    shared-title(:title='calcTitle')
    calendar

</template>

<script>

import request from 'superagent'
import Calendar from './Calendar'
import SharedTitle from '../slotUtils/SharedTitle'

export default {
    data(){
        return {
            search: '',
            id: ''
        }
    },
    mounted(){
      let taskId = this.$router.currentRoute.path.split('/')[2]
      if (taskId){
          this.$store.dispatch('loadEvents', { taskId })
      }
      this.id = taskId
      // TODO - what happens if no task loaded?
    },
    computed: {
        calcTitle(){
            let name
            this.$store.state.tasks.forEach( t => {
                if (this.id === t.taskId){// XXX:
                    name = t.name
                }
            })
            return name
        },
    },
    components:{
        SharedTitle, Calendar
    },
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'

.padding
    display: inline
    padding: 3em
    height: 200px

p
    font-size:1.3em
    color:white
    font-family: 'Open Sans', light, sans-serif;

a
    color: accent2

img
    display:inline

h3
    text-align: left
    color:accent1
    font-family: 'Open Sans', light, sans-serif;


</style>
