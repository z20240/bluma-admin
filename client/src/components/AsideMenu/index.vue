<template>
    <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
        <div class="image">
            <a>
                <img src="@/assets/jblogo-icon.png" />
            </a>
        </div>
        <div class="menu is-menu-main">
            <aside-menu-list @menu-click="menuClick" :menu="menu" />
        </div>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import AsideMenuList from '@/components/AsideMenu/AsideMenuList';
import menu from './menu';

export default {
    name: 'AsideMenu',
    components: { AsideMenuList },
    computed: {
        ...mapGetters('app', [
            'isAsideVisible'
        ]),
        menu
    },
    methods: {
        menuClick(item) {
            console.log(item);
        }
    }
};
</script>
