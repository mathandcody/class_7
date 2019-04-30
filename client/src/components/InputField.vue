<template>
    <div>
        <input type="text" :placeholder="text">
    </div>
</template>
<script>
export default {
    name: "InputField",
    props: ["text"]
}
</script>
