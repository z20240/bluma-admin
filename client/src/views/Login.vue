<template>
    <CardComponent class="abslote-center" title="Login">
        <b-field label="Name">
            <b-input v-model="dataFrom.name" />
        </b-field>
        <b-field label="Password">
            <b-input type="password" v-model="dataFrom.password" @keypress.enter.native="handleLogin" />
        </b-field>
        <div align="center">
            <b-button type="is-primary" @click="handleLogin">Login</b-button>
        </div>
    </CardComponent>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardComponent from '@/components/CardComponent';

export default {
    name: 'login',
    components: {
        CardComponent
    },
    data() {
        return {
            themeClassList: [
                'has-aside-left',
                'has-aside-mobile-transition',
                'has-navbar-fixed-top'
            ],
            redirect: null,
            dataFrom: {
                name: '',
                password: ''
            }
        };
    },
    computed: {
        ...mapGetters(['CONST'])
    },
    watch: {
        $route: {
            immediate: true,
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            }
        }
    },
    methods: {
        ...mapActions('app', ['userLogin']),
        async handleLogin() {
            try {
                const user = await this.userLogin(this.dataFrom);

                if (!user || user.status !== this.CONST.USER_STATE.ACTIVE) {
                    this.$buefy.snackbar.open({
                        message: 'Cannot Login',
                        type: 'is-danger',
                        queue: false
                    });

                    return;
                }

                this.$router.push({ path: this.redirect || '/admin' });
            } catch (e) {
                console.log('handleLogin -> e', e);
            }
        }
    },
    mounted() {
        console.log(process.env);
        document.documentElement.classList.remove(...this.themeClassList);
    },
    destroyed() {
        document.documentElement.classList.add(...this.themeClassList);
    }
};
</script>

<style lang="scss" scoped>
.abslote-center {
    position: absolute;
    width: 60%;
    height: 40%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
}
</style>