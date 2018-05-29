<template lang='pug'>

.row
    .three.grid
        img(v-if='isLoggedIn', src='../../assets/images/loggedIn.svg')
        img(v-else, src='../../assets/images/loggedOut.svg')
        label {{ m.name }}
        addr(:a="m.address")
    .three.grid
        dctrl-active(:m='m')
        .c ({{ m.balance.toFixed(2) }})
    .three.grid
        div &nbsp;
        badges(:m='m')
    .three.grid
        router-link(:to='\'/calendar/\' + this.m.memberId')
            img(src='../../assets/images/calendar.svg')

</template>


<script>

import DctrlActive from './DctrlActive'
import Badges from './Badges'
import Addr from './Addr'


export default {
    props: ['m'],
    components: {DctrlActive, Badges, Addr},
    computed:{
        isLoggedIn(){
            let isLoggedIn
            this.$store.state.sessions.forEach( s => {
                if ( s.ownerId === this.m.memberId ){
                    isLoggedIn = true
                }
            })
            return isLoggedIn
        }
    }
}

</script>

<style lang="stylus" scoped>

@import '../../styles/colours'
@import '../../styles/grid'

span
    color: accent1
    font-size: 1.4em
    text-align: center
    margin: 10px
    width:100%
    padding:1em

img
    height: 4em

.c
    content-align: left
    text-align: left

.row
    float: left
    width: 100%
    border-bottom-style: solid
    border-bottom-color: accent4
    border-width: 3px
    padding-bottom: 0.8em
    margin-bottom: 0.8em


</style>
