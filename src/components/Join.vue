<template lang='pug'>

.join
    .row
        #signup.six.columns
            div(v-if='!response')
                h4 Request Your Alias:
                div.input-container
                  input#name.input-effect(type='text', v-model='name', autocapitalize="none", autocomplete="off", autocorrect="off")
                  label(for='name') choose name
                  span.focus-border
                button(@click="createJoinReq") Request to Join
            div(v-else) Thank you for your interest {{ name }}. Reach out to the current members you know, or come hang out on an open night.

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
          response: false,
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
                  this.response = res.body
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

.input-container
    margin-bottom: 20px;

#signup
  width:100%;
  max-width: 400px;

</style>
