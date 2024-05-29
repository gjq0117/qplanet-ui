<template>
  <!-- 联系人面板 -->
  <div class="contact-class">
    <contact-list />
    <contact-info />
  </div>
</template>

<script>
import contactList from "@/im/components/contactList/index.vue";
import contactInfo from "@/im/components/contactInfo/index.vue";
export default {
  components: {
    contactList,
    contactInfo,
  },
};
</script>

<style scoped>
.contact-class {
  display: flex;
  width: 100%;
}
</style>
