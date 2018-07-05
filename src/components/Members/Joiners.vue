<template lang='pug'>

div
    p Will you vouch for a joiner??!
    .row
        template(v-for='j in $store.state.joiners')
            .three.columns.w
                button.a(@click='vouch(j.joinerId)') {{ j.name }}
                current(v-for='m in j.vouchers', :memberId='m')
                button.b(v-if='j.vouchers.length > 2' @click='create(j.name)') Create New Member
</template>

<script>

import request from 'superagent'
import Current from './Current'

export default {
    components: { Current },
    methods: {
        create(name){
            this.$router.push("/member_create/" + name)
        },
        vouch(joinerId){
            request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    type: 'joiner-vouched',
                    joinerId,
                    memberId:this.$store.getters.member.memberId
                })
                .end((err,r)=>{
                    console.log({err, r})
                })
        }
    }
}

</script>

<style lang="stylus" scoped>

@import '../../styles/skeleton'
@import '../../styles/colours'

.w
    border-style: dotted
    border-color: accent2

button.a
    position: inline
    background: accent1
    color: main
    padding: 1em
    border-radius: 3px

button.b
    float: right
    background: accent2
    color: main

</style>
