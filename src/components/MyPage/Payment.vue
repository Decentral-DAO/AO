<template lang='pug'>

.payment
    .ln
        h4 Lightning
        .row
          .four.columns
              label Set Value($):
              br
              input(type='text', v-model='cadvalue')
              button(@click='createPayRec')
                  label New Invoice
                  br
                  label {{sats.toLocaleString()}} satoshis
          .seven.columns.offset-by-one
              p Bitcoin Lightning Payment Request
              .invoice(v-if='showInvoice')
                  pay-req(v-if='invoice', :i='invoice')
    .onchain
        h4 On Chain
        label -- {{ address }} --
        .qr(v-html='imgTag')
        form-box(btntxt="Get New Address",  event='member-address-updated', v-bind:data='details')


</template>

<script>

import request from 'superagent'
import FormBox from '../slotUtils/FormBox'
import qrcode from 'qrcode-generator'
import calcs from '../../calculations'
import PayReq from '../Resources/PayReq'
import Addr from '../Members/Addr'

export default {
    components: { PayReq, Addr, FormBox },
    mounted(){
        this.createPayRec()
    },
    data( ){
        let cadvalue
        if ( this.$store.getters.member.balance < 0){
            cadvalue = -this.$store.getters.member.balance
        }
        if (!cadvalue){
            cadvalue = 0
        } else {
            cadvalue = cadvalue.toFixed(2)
        }
        return { cadvalue, showInvoice: false }
    },
    computed: {
        details(){
            return {
                memberId: this.$store.getters.member.memberId
            }
        },
        sats(){
            return parseInt( calcs.cadToSats(this.cadvalue, this.$store.state.cash.spot) )
        },
        name(){
            let name = '...loading'
            this.$store.state.members.forEach( member => {
                if (member.memberId === this.$store.getters.memberId){
                    name = member.name.slice()
                }
            })
            return name
        },
        imgTag(){
            console.log('computing imgTag?')
            let typeNumber = 4;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            let data = 'bitcoin:' + this.address
            qr.addData(data)
            qr.make()
            let cellsize = 7
            let margin = 7
            return qr.createImgTag(cellsize, margin)
        },
        address(){
            return this.$store.getters.member.address
        },
        memberId(){
            return this.$store.getters.memberId
        },
        invoice(){
            let invoice
            this.$store.state.invoices.forEach( i => {
                if (i.ownerId === this.memberId) {
                    invoice = i
                }
            })
            console.log('returning invoice', invoice)
            return invoice
        },
    },
    methods: {
        createPayRec(){
          this.showInvoice = true
          console.log('creating payment request? ')
          request
              .post('/events')
              .set('Authorization', this.$store.state.loader.token)
              .send({
                  type: 'invoice-created',
                  sats: this.sats,
                  memo: 'Payment from ' + this.$store.getters.member.name,
                  ownerId: this.$store.getters.memberId
              })
              .end((err,res)=>{
                  if (err) return console.log(err);
                  console.log('createPayRec:', res.body)
              })
        }
    },
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'
@import '../../styles/skeleton'
@import '../../styles/button'

.onchainqr
    float: right
    padding:2em

a
    color: accent2
    :visited
        color: accent2

button
  height: 3em
  img
    height: 1.5em
    z-index: 100

.createaddr
    float: right


.ln
    padding: 1.5em


</style>
