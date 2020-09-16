<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <p>指導單位 | 教育部學生事務及特殊教育司．承辦單位 | 國立中正大學犯罪研究中心．反毒專線 | 0800-770885(請請您，幫幫我)</p>
            <p>Copyright © 2020防制藥物濫用教育中心CCU all rights reserved.</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style  lang="scss" scoped>
footer {
    @media screen and (min-width: 769px) {
        position: fixed;
        bottom: 0;
    }
    width: 100%;
    color: #fff;
    background-color: #302600;

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