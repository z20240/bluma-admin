<template>
    <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
        <div class="image">
            <a>
                <img src="@/assets/jblogo-icon.png" />
            </a>
        </div>
        <div class="menu is-menu-main">
            <aside-menu-list @menu-click="menuClick" :menu="asideMenu" />
        </div>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import asideMenu from '@/router/asideMenu';
import AsideMenuList from '@/components/AsideMenu/AsideMenuList';

export default {
    name: 'AsideMenu',
    components: { AsideMenuList },
    computed: {
        ...mapGetters('app', [
            'isAsideVisible'
        ]),
        asideMenu
    },
    methods: {
        menuClick(item) {
            console.log(item);
        }
    }
};
</script>
