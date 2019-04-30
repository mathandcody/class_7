<template>
  <div>
    <!-- <InputField v-on:input="onClick" text="Enter name"/>
    <InputField text="Enter email"/>
    <InputField text="Enter password"/>-->
    <input type="text" v-model="name" placeholder="Enter name">
    <input type="text" v-model="email" placeholder="Enter Email">
    <input type="text" v-model="passwd" placeholder="Enter password">

    <button v-on:click="onClick">Submit</button>
  </div>
</template>

<script>
import InputField from "./InputField";
import axios from "axios";
import { log } from "util";
export default {
  data() {
    return {
      name: "",
      email: "",
      passwd: ""
    };
  },
  components: {
    InputField
  },
  methods: {
    onClick() {
      axios
        .post("http://localhost:3000/details", {
          name: this.name,
          email: this.email,
          password: this.passwd
        })
        .then(response => {
          console.log(response);

          if (response.status === 200) {
            console.log("Send Successfully");
          }
        })
        .catch(e => {
          console.log("Server Error");
        });
    }
  }
};
</script>
