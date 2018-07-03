<template lang='pug'>

.join
    .row
        .six.columns
            label Choose Alias:
            br
            input#name(type='text', v-model='name', placeholder='choose name', autocapitalize="none", autocomplete="off", autocorrect="off")
        .six.columns
            label Set Password
            br
            input(type='password', v-model='password')
            input(type='password', v-model='repassword')
            img(v-else, src='../assets/images/warn.svg')
            img(v-if='matched', src='../assets/images/check.svg')
            button(@click="createJoinReq") Request Access to Commons

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
  computed: {
      matched(){
          return this.password === this.repassword
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
