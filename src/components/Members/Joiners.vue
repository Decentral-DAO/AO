<template lang='pug'>

div
    h5 Do you know any of these recent reqs?
    template(v-for='j in $store.state.joiners')
        button(@click='vouch(j.joinerId)') vouch for {{ j.name }}
        current(v-for='m in j.vouchers', :memberId='m')
        br

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

button
    position: inline


</style>
