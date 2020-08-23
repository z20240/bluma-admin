<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>指導單位 | 教育部學生事務教育司．承辦單位 | 中正大學犯罪研究中心．反毒專線 | 0800-770885(請請您，幫幫我)</p>
      <hr class="footer-hr" />
      <p>Copyright © 2020防治藥物濫用教育中心NCC all righrs teserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
    name: 'Footer'
};
</script>

<style  lang="scss" scoped>
footer {
  // position: fixed;
  // bottom: 0;
  width: 100%;
  color: #fff;
  background-color: rgb(116, 86, 4);

  .content {
    p {
      margin: 0;
      font-size: 0.75rem;
    }
    .footer-hr {
      margin: 0;
    }
  }
}
</style>