<template lang='pug'>

.task
  .row
    .four.columns.name
        label {{b.name}}
        br
        button(@click='claim') claim - {{ sats.toLocaleString() }} sats (${{currentValue.toLocaleString()}})
        p(v-if="b.lastClaimedBy") Last done by
            current(:memberId="b.lastClaimedBy")
    .six.columns
        .instructions(v-if='!editMode') {{ b.instructions }}
        div(v-else)
            p The instructions on how to do the task properly.
            .editBox
                textarea(v-model='newInstructions')
            button(@click='submitChange') update instructions
            div(v-if='!b.oneTime')
                p The monthly rate accumulates over time on the tasks bounty.
                .row
                    input.six.columns(v-model='newRate')
                    button.six.columns(@click='submitRate') change monthly rate
                p The payout of the task is capped.
                .row
                    input.six.columns(v-model='newCap')
                    button.six.columns(@click='submitCap') update cap
            .boost
                p Add a one time boost to the current value
                .row
                    input.six.columns(v-model='newBoost')
                    button.six.columns(@click='submitBoost') add a boost
    .two.columns
        router-link(:to='historyLocation')
            img(src='../../assets/images/calendar.svg')
        br
        img.pencil(v-if='!editMode', src='../../assets/images/pencil.svg', @click='edit')
        img.pencil(v-else, @click='edit', src='../../assets/images/cancel.svg')

</template>

<script>

import request from 'superagent'
import {calculateTaskPayout, cadToSats} from '../../calculations'
import Current from '../Resources/Current'

export default {
    props: ['b'],
    data() {
        return {
            currentValue: parseFloat( calculateTaskPayout(this.b).toFixed(2) ),
            editMode: false,
            newInstructions: '',
            newBoost: 0,
            newRate: this.b.monthlyValue,
            newCap: this.b.cap
        }
    },
    components: { Current },
    mounted(){
        setInterval( ()=>{
            this.currentValue = parseFloat( calculateTaskPayout(this.b).toFixed(2) )
            console.log('updated', this.currentValue)
        },3333)
    },
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
        },
        submitRate(){
            this.editMode = false
            request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    taskId: this.b.taskId,
                    type: 'task-rate-updated',
                    amount: this.newRate,
                })
                .end((err,res)=>{
                    if (err) return console.log(err);
                    console.log('createPayRec:', res.body)
                })
        },
        submitCap(){
            this.editMode = false
            request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    taskId: this.b.taskId,
                    type: 'task-cap-updated',
                    amount: this.newCap,
                })
                .end((err,res)=>{
                    if (err) return console.log(err);
                    console.log('createPayRec:', res.body)
                })
        },
        submitBoost(){
          this.editMode = false
          request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    taskId: this.b.taskId,
                    type: 'task-boosted',
                    amount: this.newBoost,
                })
                .end((err,res)=>{
                    if (err) return console.log(err);
                    console.log('createPayRec:', res.body)
                })
        }
    },
    computed: {
        sats(){
            return parseInt( cadToSats(this.currentValue, this.$store.state.cash.spot) )
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
@import '../../styles/button'

.task
    color: accent2
    input
        color: main

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
    break: both

.instructions
    padding: 1.5em
    border-radius: .5em
    background: lightGrey
    color: main
    min-height: 4em
    font-size: 1em
    padding-top: .8em
    vertical-align: bottom
    margin-top: 1.5em
    text-align: left

.editBox
    margin-top: 1.5em
    color: main
    label
        color: accent1
        text-align: left
    button
        width: 100%
        color: accent1
        border-color: accent1
    textarea
        width: 100%
        height: 8em
        padding: 1em

img
    height: 3em

.row
    border-color: accent4
    border-bottom-style: solid
    padding-bottom: .8em
    margin-bottom: .7em
    border-width: 3px
    width: 100%

</style>
