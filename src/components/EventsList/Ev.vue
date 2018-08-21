<template lang='pug'>

.row
    .three.grid
        img(src='../../assets/images/loggedOut.svg')
        label {{ name }}
    .three.grid
        label {{ e.type }}
    .three.grid
        div &nbsp;
        p Paid: {{ e.paid }}
    .three.grid
        div {{ e.amount }}

</template>


<script>

export default {
    props: ['e'],
    components: {},
    computed:{
        name() {
            let name
            this.$store.state.members.forEach(m => {
                if (this.e.memberId === m.memberId) {
                    name = m.name
                }
            })
            return name
        }
    },
    methods: {

    }
}

</script>

<style lang="stylus" scoped>

@import '../../styles/colours'
@import '../../styles/grid'

img
    height: 4em

label
    font-size: 1.246em
    font-weight: normal;
    margin: 1em

.row
    float: left
    width: 100%
    border-bottom-style: solid
    border-bottom-color: accent4
    border-width: 3px
    padding-bottom: 0.8em
    margin-bottom: 0.8em



</style>
