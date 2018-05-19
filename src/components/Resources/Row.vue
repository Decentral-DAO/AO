<template lang='pug'>

.resources
    h3(v-if='r.stock > 0').stock {{ r.stock }}
    h3 {{ r.name }}
    .row
        .six.columns
            label recently used by:
            current(v-for='memberId in currentMembers', :memberId='memberId')
        .six.columns
            button.payreq(v-if='r.charged > 0', @click='createPayRec')
                img.payreqbtn(src='../../assets/images/address.svg')
                img(src='../../assets/images/lightning.svg')
                span {{ sats }} sats (${{ r.charged.toLocaleString() }})
                .invoices(v-if='showInvoices')
                    pay-req(v-if='invoice', :i='invoice')
            router-link(v-if='r.stock >= 0', :to='"/resource_stock/" + r.resourceId')
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
            return this.r.current.slice().map(ev => ev.memberId)
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
@import '../../styles/grid'
@import '../../styles/colours'

img
    height: 1.5em
    z-index: 100

.r
    float: right

.l
    float: left

.resources
    width: 100%
    border-style: dotted
    border-color: accent2
    border-width: 1px
    padding: 1em

.stock
    float: right
    color: accent2

.refill
    color: green
    background: main
    border-color: green
    text-align: left

.payreq
    color: accent2
    background: main
    text-align: left
    border-color: accent2

.payreqbtn
    float: right


</style>
