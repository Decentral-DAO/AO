<template lang='pug'>

#join.row
  .six.columns
      input#name(type='text', v-model='name', placeholder='choose name', autocapitalize="none", autocomplete="off", autocorrect="off")
      button(@click="createJoinReq") I'd like to join!
  .six.columns dctrl is based on personal trust. You need to meet some current members and get them to vouch for you! glhf

</template>

<script>

import request from 'superagent'
import uuidV1 from 'uuid/v1'
import cryptoUtils from '../crypto'
import PayReq from './Resources/PayReq'

export default {
  name: 'Auth',
  components: { PayReq },
  data(){
      return {
          name: '',
          responseInvoice: false
      }
  },
  methods: {
      createJoinReq(){
          request
              .get('/join/' + this.name)
              .end( (err, res) => {
                  if (err){
                     return console.log(err)
                  }
                  console.log(res.body)
                  this.responseInvoice = res.body
              })

      },
  }
}
</script>

<style lang='stylus' scoped>

@import '../styles/colours'
@import '../styles/button'

#auth
    width: 100%
    content-align: center
    input
        color: main
        width: 100%
.secret
    -webkit-text-fill-color: transparent; /* sets just the text color */

.container
    width: 100%

.red
    color: accent2

</style>
