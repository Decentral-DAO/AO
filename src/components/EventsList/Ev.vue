<template lang='pug'>

.row
    .three.grid
      img(src='../../assets/images/loggedOut.svg')
      div(v-if='e.memberId')
        label {{ name }}
      div(v-if='e.resourceId')
        label {{ resourceName }}
      div(v-if='e.taskId')
        label {{ taskName }}
    .three.grid
        label {{ e.type }}
    .three.grid
      div &nbsp;
      div(v-if='e.name')
        p Name: {{ e.name }}
      div(v-if='e.paid')
        p Paid: {{ e.paid }}
      div(v-if='e.amount')
        p Amount: {{ e.amount }}
      div(v-if='e.monthlyValue')
        p Monthly Value: {{ e.monthlyValue }}
      div(v-if='e.cap')
        p Cap: {{ e.cap }}
      div(v-if='e.boost')
        p Boost: {{ e.boost }}
      div(v-if='e.charged')
        p Charged: {{ e.charged }}
    .three.grid
        div &nbsp;
        div {{ dateStr }}

</template>


<script>

export default {
    props: ['e'],
    components: {},
    computed:{
        name() {
            let name
            this.$store.state.members.forEach(m => {
                if (this.e.memberId === m.memberId) {
                    name = m.name
                }
            })
            return name
        },
        resourceName(){
          let name
          this.$store.state.resources.forEach(r => {
              if (this.e.resourceId === r.resourceId) {
                  name = r.name
              }
          })
          return name
        },
        taskName(){
          let name
          this.$store.state.tasks.forEach(t => {
              if (this.e.taskId === t.taskId) {
                  name = t.name
              }
          })
          return name
        },
        dateStr(){
            let d = new Date(parseInt(this.e.timestamp))
            return d.toUTCString()
        }
    },
    methods: {

    }
}

</script>

<style lang="stylus" scoped>

@import '../../styles/colours'
@import '../../styles/grid'

img
    height: 4em

label
    font-size: 1.246em
    font-weight: normal;
    margin: 1em

.row
    float: left
    width: 100%
    border-bottom-style: solid
    border-bottom-color: accent4
    border-width: 3px
    padding-bottom: 0.8em
    margin-bottom: 0.8em



</style>
