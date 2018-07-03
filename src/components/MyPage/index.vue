<template lang='pug'>

#mypage
    shared-title(:title='calcTitle')
    p Welcome {{ $store.getters.member.name }},
    p You have access to cool shared resources, but also responsibility for their care, improvement, maintenance, and replenishment!
    p You can settle your account on chain:{{$store.getters.member.address}} - Or with lightning:
    payment
    changer
    p See all the badges you've earned:
    badges(:m='member')
    p See your recent activity:
    calendar

</template>

<script>

import SharedTitle from '../slotUtils/SharedTitle'
import Calendar from '../MemberCalendar'
import Payment from './Payment' // address is an html word so cannot use
import Changer from './Changer' // address is an html word so cannot use
import Badges from '../Members/Badges'

export default {
    components: {
        SharedTitle, Calendar, Payment, Changer, Badges
    },
    computed: {
        member(){
            return this.$store.getters.member
        },
        calcTitle(){
            return this.$store.getters.member.name + '(' + this.$store.getters.member.balance.toFixed() + ')'
        }
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'

p
    font-size: 1.2em

h6
    padding: 2em

select
    margin: 2em
    color: main
    height: 2em

</style>
