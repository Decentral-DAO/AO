<template lang='pug'>

#newmember
	shared-title(title='Create New Member')
	.six.columns
			form-box(btntxt="Welcome New Member"  event='member-created' v-bind:data='memberReq')
					label Chosen Alias:
					input(v-model='member.name' type='text' )
					label Initial Password (you can and should change it later)
					input(v-model='member.pass' type='password')
					label Member Fob! (tap it)
					input(v-model='member.fob' type='text')

</template>

<script>
import request from "superagent"
import cryptoUtils from '../../crypto'
import SharedTitle from '../slotUtils/SharedTitle'
import FormBox from '../slotUtils/FormBox'

export default {
  data() {
    return {
      member: {
        name: '',
        pass: '',
        fob: '',
      }
    }
  },
	mounted(){
			let name = this.$router.currentRoute.path.split('/')[2]
			this.member.name = name
	},
	computed: {
			memberReq(){
					return {
							name: this.member.name,
							secret: cryptoUtils.createHash(this.member.pass),
							fob: this.member.fob,
					}
			}
	},
  components: {
    SharedTitle, FormBox
  }
}
</script>

<style lang='stylus' scoped>

@import '../../styles/colours'
@import '../../styles/skeleton'

#projects
    color:accent1
    font-family: 'Open Sans', light, sans-serif;

li
  color:white
  font-size:18px
  font-family: 'Open Sans', light, sans-serif;

h3
  font-family: 'Open Sans', light, sans-serif;
  font-size:1.6em

</style>
