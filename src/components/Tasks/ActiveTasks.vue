<template lang='pug'>

.task
  .row
    .four.columns.name
        label {{b.name}}
        button(@click='claim') claim - {{ sats }} sats (${{currentValue}})
        p(v-if="b.lastClaimedBy") Last done by
            current(:memberId="b.lastClaimedBy")
    .six.columns
        .instructions(v-if='!editMode') {{ b.instructions }}
        .editBox(v-else)
            div
                label Edit Instructions
                textarea(v-model='newInstructions')
            button(@click='submitChange') submit change
    .two.columns
      img.pencil(v-if='!editMode', src='../../assets/images/pencil.svg', @click='edit')
      img.pencil(v-else, @click='edit', src='../../assets/images/pencil.svg')
      router-link(:to='historyLocation')
          img(src='../../assets/images/calendar.svg')

</template>

<script>

import request from 'superagent'
import {calculateTaskPayout, cadToSats} from '../../calculations'
import Current from '../Resources/Current'

export default {
    components: { Current },
    methods: {
        edit(){
            console.log('edit called')
            if (!this.editMode){
                this.editMode = true
                this.newInstructions = this.b.instructions
            } else {
                this.editMode = false
            }
        },
        claim(){
            this.$router.push(this.claimLocation)
        },
        submitChange(){
            console.log('submit change called')
            this.editMode = false
            request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    type: 'task-instructions-updated',
                    newInstructions: this.newInstructions,
                    taskId: this.b.taskId
                })
                .end((err,res)=>{
                    if (err) return console.log(err);
                    console.log('createPayRec:', res.body)
                })
        }
    },
    props: ['b'],
    data() {
        return {
            currentValue: '...calc',
            editMode: false,
            newInstructions: ''
        }
    },
    mounted(){
        this.currentValue = calculateTaskPayout(this.b).toFixed(2)
        setInterval( ()=>{
            this.currentValue = calculateTaskPayout(this.b).toFixed(2)
        },11111)
    },
    computed: {
        sats(){
            return cadToSats(this.currentValue, this.$store.state.cash.spot)
        },
        boostLocation(){
            return '/TASK_BOOST/' + this.b.taskId
        },
        editLocation(){
            return '/TASK_EDIT/' + this.b.taskId
        },
        claimLocation(){
            return '/TASK_CLAIM/' + this.b.taskId
        },
        historyLocation(){
            return '/TASK/' + this.b.taskId
        }
    },
}

</script>

<style lang="stylus" scoped>

@import '../../styles/colours'
@import '../../styles/skeleton'
@import '../../styles/skeleton-button'

.task
    color: accent2

.name
    content-align: left
    text-align: left
    label
        font-size: 1.4em
        text-align: left
        color: accent1
    button
        margin-top: 1.5em
        border-color: main
        color: main
        background-color: accent2
    p
        font-size: 0.777em

.val
    color: accent2

.pencil
    height: 24px

.instructions
    padding: 1.5em
    border-radius: .5em
    background: lightGrey
    color: main
    min-height: 4em
    font-size: .8em
    padding-top: .8em
    vertical-align: bottom
    text-align: left

.editBox
    color: main
    label
        color: accent1
    button
        width: 100%
        color: accent1
        border-color: accent1
    textarea
        width: 100%
        height: 8em

img
    height: 55px

.row
    border-color: accent4
    border-bottom-style: solid
    padding-bottom: .8em
    margin-bottom: .7em
    border-width: 3px
    width: 100%

</style>
