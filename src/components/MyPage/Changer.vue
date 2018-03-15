<template lang='pug'>

.changer
  h6 change your information:
  span(v-if='inputType === "password"')
      img(v-if='matched', src='../../assets/images/check.svg')
      img(v-else, src='../../assets/images/warn.svg')
  form-box(event='member-field-updated', :data='changeReq', btntxt='change your account')
      select(v-model='change.field')
          option(value='secret') password
          option(value='email') e-mail
          option(value='name') hackername
      input(:type='inputType' v-model='change.newfield', :placeholder='"new " + change.field ')
      input(v-if='inputType === "password"', type='password', v-model='change.confirmNewfield', placeholder='repeat secret')
  p(v-if='!secure') Please change your password; extra points for using a password manager or ubikey!

</template>

<script>

import FormBox from '../slotUtils/FormBox'
import cryptoUtils from '../../crypto'

export default {
    components: {
        FormBox
    },
    computed: {
        matched(){
            let x = this.change.newfield
            let y = this.change.confirmNewfield
            return x === y
        },
        changeReq(){

            if (this.change.field === 'secret'){
                  return {
                      field: this.change.field,
                      newfield: cryptoUtils.createHash( this.change.newfield),
                      memberId: this.$store.getters.memberId
                  }
            }
            return {
                field: this.change.field,
                newfield: this.change.newfield,
                memberId: this.$store.getters.memberId
            }
        },
        secure(){
            let secure = false
            if ( this.$store.getters.member.badges ) {
                secure = this.$store.getters.member.badges.some(b => b === 'secure')
            }
            return secure
        },
        inputType(){
            if (this.change.field === 'secret'){
                return 'password'
            } else {
                return 'text'
            }
        }
    },
    data(){
        return {
            change: {
                field: 'secret',
                newfield: '',
                confirmNewfield: ''
            }
        }
    }
}
</script>

<style lang='stylus' scoped>

@import '../../styles/colours'
@import '../../styles/button'

img
    float: left
    height: 5em

.changer
    padding: 1em
    background: accent4
    content-align: right
    color: white

input, select
    z-index:123123
    color: main

</style>
