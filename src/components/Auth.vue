<template lang='pug'>

#auth.row
  .six.columns.offset-by-three(v-if='!confirmed')
      h4 Login to access app:
      div.input-container
        input#name.input-effect(type='text', v-model='name', autocapitalize="none", autocomplete="off", autocorrect="off")
        label(for='name') hackername
        span.focus-border
      br
      div.input-container
        input#password.input-effect(type='password', v-model='pass', autocapitalize="none", autocomplete="off", autocorrect="off")
        label(for='password') password
        span.focus-border
      br
      p.red {{ err }}
      button.primary(@click="createSession") login
  .c(v-else)
      h3 you are logged in:
      button(@click="killSession") log out

</template>

<script>

import request from 'superagent'
import uuidV1 from 'uuid/v1'
import cryptoUtils from '../crypto'

export default {
  name: 'Auth',
  data(){
      return {
          name: '',
          pass: '',
          err: ''
      }
  },
  computed: {
      confirmed(){
          return this.$store.getters.isLoggedIn
      },
  },
  methods: {
      createSession(){
          let session = uuidV1()
          let sessionKey = cryptoUtils.createHash(session + cryptoUtils.createHash(this.pass))
          let token = cryptoUtils.hmacHex(session, sessionKey)
          request
              .post('/session')
              .set('Authorization', token)
              .set('Session', session)
              .set('name', this.name)
              .end((err,res)=>{
                  if (err) {
                      console.log(err)
                      this.pass = ''
                      return this.err = err.message
                  }

                  console.log('Authentication creation response', res.body)
                  this.pass = ""
                  this.$store.commit('setAuth', {
                      token,
                      session,
                  })

                  window.localStorage.setItem("token", token)
                  window.localStorage.setItem("session", session)

                  this.$store.dispatch('loadCurrent')
              })
      },
      killSession(){
          //XXX TODO tell server to remove session
          request
              .post('/events')
              .set('Authorization', this.$store.state.loader.token)
              .send({
                  type: "session-killed",
                  session: this.$store.state.loader.session
              })
              .end(console.log)

          window.localStorage.removeItem("token")
          window.localStorage.removeItem("session")
          this.$store.commit('setAuth', {
              token: '', session: ''
          })
      }
  }
}
</script>

<style lang='stylus' scoped>

@import '../styles/colours'
@import '../styles/button'


#auth
    background-color:accent5

main #auth
    margin: 0 0 0 50px
    padding: 0 20px 20px 20px;
    width:calc(100% - 90px)

#mobileheading #auth
  margin: 50px auto 50px auto
  padding: 20px 50px 50px 50px;
  width:300px

.secret
    -webkit-text-fill-color: transparent; /* sets just the text color */

.container
    width: 100%

.red
    color: accent2

</style>
