<template lang='pug'>

.task
  .row
    .mainColumn.columns.name
        label {{b.name}}
        br
        .instructions(v-if='!editMode') {{ b.instructions }}
        div(v-else)
            p.input-instructions The instructions on how to do the task properly.
            .editBox
                textarea(v-model='newInstructions')
            button(@click='submitChange') update instructions
            div(v-if='!b.oneTime')
                p.input-instructions The monthly rate accumulates over time on the tasks bounty.
                .row
                    div.input-container
                      input#newRate.input-effect(v-model='newRate')
                      label(for='newRate') monthly rate
                      span.focus-border
                    button(@click='submitRate') change monthly rate
                p.input-instructions The payout of the task is capped.
                .row
                    div.input-container
                      input#newCap.input-effect(v-model='newCap')
                      label(for='newCap') payout cap
                      span.focus-border
                    button(@click='submitCap') update cap
            .boost
                p.input-instructions Add a one time boost to the current value
                .row
                    div.input-container
                      input#newBoost.input-effect(v-model='newBoost')
                      label(for='newBoost') boost
                      span.focus-border
                    button(@click='submitBoost') add a boost

                    .remove
                        .row
                            button.purge(@click='submitRemove') Purge Task

    .secondaryColumn.columns
        button.halfsize(@click='history')
            img(src='../../assets/images/calendar-alt-solid.svg')

        button.halfsize(v-if='!editMode', @click='edit')
          img.pencil(src='../../assets/images/pen-solid.svg')
        button.halfsize(v-else,  @click='edit')
          img.pencil.cancel(src='../../assets/images/times-solid.svg')

        button.primary(@click='claim')
         span.claimSpan Claim
         span.satsSpan {{ sats.toLocaleString() }} sats (${{currentValue.toLocaleString()}})
        p(v-if="b.lastClaimedBy") Last done by
            current(:memberId="b.lastClaimedBy")


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
        history(){
          this.$router.push(this.historyLocation)
        },
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
        },
        submitRemove(){
          this.editMode = false
          request
                .post('/events')
                .set('Authorization', this.$store.state.loader.token)
                .send({
                    taskId: this.b.taskId,
                    type: 'task-removed',
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

@import '../../styles/colours';
@import '../../styles/skeleton';
@import '../../styles/button';

.task
    color: accent2
    background-color: accent5
    margin:10px 0
    padding:20px

.name
    content-align: left
    text-align: left

.name>label
        font-size: 1.4em
        text-align: left
        color: accent1

.val
    color: accent2

.instructions
    color: contentColour
    min-height: 4em
    font-size: 1em
    padding-top: 0.8em
    vertical-align: bottom
    margin-top: 1.5em
    text-align: left

.editBox
    label
        color: accent1
        text-align: left
    textarea
        width: calc(100% - 42px)
        height: 8em
        padding: 20px

img.cancel
    width:30%

.row
    //border-color: accent4
    //border-bottom-style: solid
    //padding-bottom: 0.8em
    //margin-bottom: 0.7em
    //border-width: 3px
    width: 100%

    .mainColumn
      width:calc(100% - 150px - 4%)
    .secondaryColumn
      width:150px
      button
        height:75px

.claimSpan
    //font-style: italic
    //font-weight:bold
    //text-transform: uppercase

.satsSpan
    display: block
    font-size:0.8em
    font-style: italic
    font-weight:lighter

.purge
    background-color: warning
    border-color: warning

</style>
