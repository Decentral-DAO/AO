<template lang='pug'>

div
    p(v-if="$store.state.joiners.length > 0") The following aliases have requested joining. Remember, if you vouch for them you are also responsible for showing them the ropes, welcoming them, and to some degree their actions. Will you vouch for a joiner?
    .row
        template(v-for='j in $store.state.joiners')
            .three.columns.w
                button(@click='vouch(j.joinerId)').a {{ j.name }}
                    img.vouchImg(src='../../assets/images/check.svg')
                img.rejectImg(@click='reject(j.joinerId)', src='../../assets/images/cancel.svg')
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
        reject(joinerId){
            request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    type: 'joiner-rejected',
                    joinerId,
                    memberId:this.$store.getters.member.memberId
                })
                .end((err,r)=>{
                    console.log({err, r})
                })
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
    border-style: solid
    border-color: accent4
    background-color: lightGrey

button.a
    position: inline
    background-color: accent4
    color: accent3
    padding: 1em
    border-radius: 3px

button.b
    float: right
    background: accent2
    color: main

img
    padding: .5em
    height: 2em
.rejectImg
    float: right
.vouchImg
    float: left

</style>
