<template>

<button class="sendSmsBtn" :class="disabled?'dissendSmsBtn':''" type="button" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>


<script>
export default{
props: {
        second: {
            type: Number,
            default: 60
        }
    },
    data:function () {
     return {
        time: 0,
        disabled:false
     }
    },
    methods: {
        run: function () {
         this.$emit('run');
        },
        start: function(){
         this.time = this.second;
         console.log(this.disabled);
         this.timer();
        },


        setDisabled: function(val){
         this.disabled = val;
        },
        timer: function () {
            if (this.time > 0) {
                this.time--;
                setTimeout(this.timer, 1000);
            }else{
             this.disabled = false;
            }
        }
        
    },
    computed: {
        text: function () {
            return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
        }
    }
}
</script>


<style>
.sendSmsBtn{
position: absolute;
right: 0px;
height: 34px;
    line-height: 34px;
    border-radius: 3px;
    background: #ffb400;
    border: none;
    padding: 0 6px;
    color: #fff;
    display: inline-block;
    width: 90px;
    top: 12px;
}
.sendSmsBtn.dissendSmsBtn{
background-color: #FFE39F;
}
</style>