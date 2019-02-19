<template>
  <div id="codemirror"></div>
</template>

<script>
import codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

export default {
  mounted () {
    // let codemirrorInstance = codemirror(document.getElementById('codemirror'), {
    //   value: 'function myScript(){return 100;}\n',
    //   mode: 'javascript'
    // })

    codemirror(function (elt) {
      console.log(elt)
    })
  }
}
</script>

<style scoped>

</style>
