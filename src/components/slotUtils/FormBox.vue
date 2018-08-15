<template lang='pug'>

form(v-on:submit.prevent="")
    .response(v-if='response')
        div(v-if='showError')
            .three.columns
                img(src='../../assets/images/clippy.svg')
            .nine.columns
                label ERROR: {{ errTxt }}
        .row(v-if='response.type')
    slot(v-else)
    button(v-if='!response' @click.prevent='post') {{ btntxt }}

</template>

<script>
import request from 'superagent'

export default {
    data(){
      return {
          response: false,
          memberFob: "",
          showError: false,
          errTxt: '...'
       }
    },
    props: ['event', 'data', 'btntxt'],
    components: { },
    methods: {
      post(){

        this.response = true // hides forms
        this.data.type = this.event
        request
            .post('/events')
            .set('Authorization', this.$store.state.loader.token)
            .send(this.data)
            .end((err,res)=>{
                if (err){
                    this.showError = true
                    console.log('err from /events', err )
                    if (res.body) this.errTxt = res.body[0];
                    return setTimeout( () => {
                        this.response = false
                    } , 3456)
                } else {
                    // XXX - the forms should return different places depending, ie member create should hit /members
                    this.$router.push('/')
                }

            })
      },
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours';
@import '../../styles/framework';
@import '../../styles/button';

.response
  color: red

form
  padding: 0em
  max-width:400px
  color: accent1
  //margin: 1em


</style>
