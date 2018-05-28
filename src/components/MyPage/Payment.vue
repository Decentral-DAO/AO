<template lang='pug'>

.payment
    h5 Add to your account on Chain: {{address}}
    div(v-html='imgTag')
    h5 Add to your account with Lightning:
    .invoice(v-if='showInvoice')
        pay-req(v-if='invoice', :i='invoice')
    .row.lncontrols
        .six.columns
            button(@click='createPayRec') Create Payment Request {{sats.toLocaleString()}} sats (${{cadvalue}})
        .six.columns
            label Custom Value:
            input(type='text', v-model='cadvalue')

</template>

<script>

import request from 'superagent'
import FormBox from '../slotUtils/FormBox'
import qrcode from 'qrcode-generator'
import calcs from '../../calculations'
import PayReq from '../Resources/PayReq'
import Addr from '../Members/Addr'

export default {
    components: { PayReq, Addr },
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
        sats(){
            return calcs.cadToSats(this.cadvalue, this.$store.state.cash.spot)
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
            let address = 'x'
            this.$store.state.members.forEach( member => {
                if (member.memberId === this.$store.getters.memberId){
                    address = member.address.slice()
                }
            })
            let data = 'bitcoin:' + address
            qr.addData(data)
            qr.make()
            let cellsize = 3
            let margin = 3
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
                  memo: 'Payment: ' + this.$store.getters.name ,
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

.qr
    float: right
    padding:2em

h5
    padding: 2em

button
  img
    height: 1.5em
    z-index: 100

.createaddr
    float: right


</style>
