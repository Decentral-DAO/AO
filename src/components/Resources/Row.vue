<template lang='pug'>

.resources
    h3 {{ r.name }}
        span(v-if='r.stock && r.stock >= 0').stock ({{ r.stock }} remain)
    .invoices(v-if='showInvoices')
        pay-req(v-if='invoice', :i='invoice')
    .row
        .six.columns.recent
            label recently used by:
            .current
                current(v-for='memberId in currentMembers', :memberId='memberId')
        .six.columns
            button.pay(v-if='r.charged > 0', @click='createPayRec')
                span lightning ({{sats.toLocaleString()}} sat)
            router-link(v-if='trackStock', :to='"/resource_stock/" + r.resourceId')
                button.refill replenish supply

</template>

<script>
import request from 'superagent'
import Current from './Current'
import PayReq from './PayReq'

export default {
    data(){
        return { showInvoices: false}
    },
    props: ['r'],
    components: { Current, PayReq },
    computed: {
        trackStock(){
            return !(this.r.stock == undefined)
        },
        invoice(){
            let invoice
            this.$store.state.invoices.forEach( i => {
                if (i.ownerId === this.r.resourceId) {
                    invoice = i
                }
            })
            console.log('returning invoice', invoice)
            return invoice
        },
        currentMembers(){
            let currentMembers = []
            let now = Date.now()
            this.$store.state.recent.forEach(ev => {
                let msSince = now - ev.timestamp
                if (
                    ev.type == 'resource-used' &&
                    ev.resourceId == this.r.resourceId &&
                    msSince < 1000 * 60 * 60 * 5 && // 5 hours
                    currentMembers.indexOf(ev.memberId) == -1
                ){
                    currentMembers.push(ev.memberId)
                }
            })
            return currentMembers
        },
        sats(){
            let sats = this.r.charged / this.$store.state.cash.spot * 100000000
            return Math.round(sats).toFixed(0)
        },
    },
    methods: {
        createPayRec(){
            this.showInvoices = true
            console.log('creating payment request? ')
            request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    type: 'invoice-created',
                    sats: this.sats,
                    memo: this.r.name,
                    ownerId: this.r.resourceId
                })
                .end((err,res)=>{
                    if (err) return console.log(err);
                    console.log('createPayRec:', res.body)
                })
        }
    }
}

</script>

<style lang="stylus" scoped>

@import '../../styles/button'
@import '../../styles/skeleton'
@import '../../styles/skeleton-button'
@import '../../styles/colours'

img
    height: 1.5em
    z-index: 100

.resources
    color: accent1
    border-color: accent4
    border-bottom-style: solid
    border-width: 3px
    width: 100%
    margin-bottom: 1em
    padding-bottom: 1em

.stock
    color: accent2

.refill
    color: main
    background: green
    border-color: main

.recent
    font-size: .8em

.pay
    background-color: accent2

.current
    background: lightGrey
    color: main
    padding: 0.3em
    border-radius: 0.5em

</style>
