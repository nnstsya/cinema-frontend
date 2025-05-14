<template>
  <div>
    <headerComp/>

    <main>
      <RouterView/>
    </main>

    <footerComp/>
  </div>
</template>

<script>
import footerComp from "@/components/pageComponents/footerComp";
import headerComp from "@/components/pageComponents/headerComp";

export default {
  name: 'App',
  components: {
    headerComp,
    footerComp
  },
  mounted() {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Cal+Sans&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}

</script>

<style>
* {
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
}

main {
  margin-top: 100px;
}

</style>
