<template lang='pug'>

div
    h5 Do you want to vouch for any of these recently requested accounts??
    .row
        template(v-for='j in $store.state.joiners')
            .three.columns.w
                button(@click='vouch(j.joinerId)') {{ j.name }}
                current(v-for='m in j.vouchers', :memberId='m')

</template>

<script>

import request from 'superagent'
import Current from './Current'

export default {
    components: { Current },
    methods: {
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

button
    position: inline
    background: accent1
    color: main
    padding: 1em
    border-radius: 3px

</style>
