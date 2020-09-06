<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <img class="navbar-item" src="@/assets/images/logo.png" width="230" />
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <span class="navbar-item">『防治藥物濫用中心．關心您!』</span>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header'
};
</script>

<style lang="scss" scoped>
.navbar {
    position: relative;
    background-color: orange;
    padding-right: 0;
    height: 3.25rem;

    .navbar-brand {
        position: relative;
        background-color: white;

        @media screen and (min-width: 769px) {
            // width: 50%;
            &::after {
                position: absolute;
                right: -3.25rem;
                top: 0;
                z-index: -1;
                content: ' ';
                height: 100%;
                width: 0px;
                border-color: transparent orange white transparent;
                border-style: solid solid solid solid;
                border-width: 0px 52px 52px 0px;
            }
        }

        @media screen and (max-width: 768px) {
            display: flex;
            justify-content: center;
            background-color: orange;
        }
    }

    .navbar-menu {
        .navbar-end {
            .navbar-item {
                color: white;
                font-weight: 700;
            }
        }
    }
}
</style>
