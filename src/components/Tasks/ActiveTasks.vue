<template lang='pug'>

tr
    td
        label {{b.name}}
        router-link(:to='claimLocation')
            button claim {{ sats }} sats(${{currentValue}})
    td
        .instructions(v-if='!editMode') {{ b.instructions }}
        .editBox(v-else)
            div
                label Edit Instrctions
                textarea(v-model='newInstructions')
            button(@click='submitChange') submit change
    td
      img.pencil(v-if='!editMode', src='../../assets/images/pencil.svg', @click='edit')
      img.pencil(v-else, @click='edit', src='../../assets/images/pencil.svg')()
      router-link(:to='historyLocation')
          img(src='../../assets/images/calendar.svg')

</template>

<script>

import request from 'superagent'
import {calculateTaskPayout, cadToSats} from '../../calculations'

export default {
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

td
    color: accent2
    font-size: 1.4em

.val
    color: accent2

.pencil
    height: 24px

.instructions
    color: accent3

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

button
    color: accent2
    border-color: accent2

img
    height: 55px

tr
    border-color: accent4
    border-top-style: solid
    border-bottom-style: solid
    border-width: 3px
    vertical-align:middle
    width: 100%

</style>
