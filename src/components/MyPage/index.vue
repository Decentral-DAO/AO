<template lang='pug'>

#mypage
    shared-title(:title='calcTitle')
    p Welcome {{ $store.getters.member.name }},
    p You have access to cool shared resources, but also responsibility for their care, improvement, maintenance, and replenishment!
    hr
    p Contribute to our node and your account:
    payment
    hr
    p Control Your Account Details:
    changer
    hr
    p Your Current Badges:
    badges(:m='member')
    hr
    p Your Recent Activity:
    div
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
