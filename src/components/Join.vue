<template lang='pug'>

.join
    .row
        .six.columns
            label Choose Alias:
            br
            input#name(type='text', v-model='name', placeholder='choose name', autocapitalize="none", autocomplete="off", autocorrect="off")
            button(@click="createJoinReq") Request Access to Commons
        .six.columns
            br

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
          responseInvoice: false,
          password: '',
          repassword:''
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
@import '../styles/skeleton'

label
    position: block

img
    height: 3em
    float: right

</style>
